import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import matter from 'gray-matter';

// 加载 .env.local 文件
function loadEnvFile(): void {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
  }
}

loadEnvFile();

// 腾讯云 TMT API 配置
const TENCENT_SECRET_ID = process.env.TENCENT_SECRET_ID || '';
const TENCENT_SECRET_KEY = process.env.TENCENT_SECRET_KEY || '';
const TMT_ENDPOINT = 'tmt.tencentcloudapi.com';
const TMT_REGION = 'ap-guangzhou';

interface TranslateOptions {
  sourceLocale: string;
  targetLocale: string;
  slug: string;
}

// TC3-HMAC-SHA256 签名
function sign(key: Buffer, msg: string): Buffer {
  return crypto.createHmac('sha256', key).update(msg).digest();
}

function getHash(msg: string): string {
  return crypto.createHash('sha256').update(msg).digest('hex');
}

async function callTencentTMT(
  text: string,
  source: string,
  target: string
): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000);
  const date = new Date(timestamp * 1000).toISOString().split('T')[0];

  const payload = JSON.stringify({
    SourceText: text,
    Source: source,
    Target: target,
    ProjectId: 0,
  });

  const hashedPayload = getHash(payload);
  const httpRequestMethod = 'POST';
  const canonicalUri = '/';
  const canonicalQueryString = '';
  const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${TMT_ENDPOINT}\nx-tc-action:texttranslate\n`;
  const signedHeaders = 'content-type;host;x-tc-action';

  const canonicalRequest = [
    httpRequestMethod,
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    hashedPayload,
  ].join('\n');

  const algorithm = 'TC3-HMAC-SHA256';
  const credentialScope = `${date}/tmt/tc3_request`;
  const hashedCanonicalRequest = getHash(canonicalRequest);
  const stringToSign = [
    algorithm,
    timestamp,
    credentialScope,
    hashedCanonicalRequest,
  ].join('\n');

  const secretDate = sign(Buffer.from('TC3' + TENCENT_SECRET_KEY), date);
  const secretService = sign(secretDate, 'tmt');
  const secretSigning = sign(secretService, 'tc3_request');
  const signature = crypto
    .createHmac('sha256', secretSigning)
    .update(stringToSign)
    .digest('hex');

  const authorization = `${algorithm} Credential=${TENCENT_SECRET_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const response = await fetch(`https://${TMT_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Host: TMT_ENDPOINT,
      'X-TC-Action': 'TextTranslate',
      'X-TC-Version': '2018-03-21',
      'X-TC-Timestamp': timestamp.toString(),
      'X-TC-Region': TMT_REGION,
      Authorization: authorization,
    },
    body: payload,
  });

  const result = await response.json();

  if (result.Response?.Error) {
    throw new Error(
      `TMT API Error: ${result.Response.Error.Code} - ${result.Response.Error.Message}`
    );
  }

  return result.Response?.TargetText || text;
}

// 分割长文本为多个片段（腾讯云 TMT 单次限制 6000 字符，保守使用 3000）
function splitText(text: string, maxLength: number = 3000): string[] {
  const segments: string[] = [];
  const lines = text.split('\n');
  let current = '';

  for (const line of lines) {
    const potentialLength = current
      ? current.length + 1 + line.length
      : line.length;

    if (potentialLength > maxLength && current) {
      segments.push(current);
      current = line;
    } else {
      current = current ? current + '\n' + line : line;
    }
  }

  if (current.trim()) {
    segments.push(current);
  }

  // 如果某个片段仍然太长，进一步按句子分割
  const finalSegments: string[] = [];
  for (const segment of segments) {
    if (segment.length > maxLength) {
      const sentences = segment.split(/(?<=[.!?。！？])\s+/);
      let subCurrent = '';
      for (const sentence of sentences) {
        if ((subCurrent + ' ' + sentence).length > maxLength && subCurrent) {
          finalSegments.push(subCurrent.trim());
          subCurrent = sentence;
        } else {
          subCurrent = subCurrent ? subCurrent + ' ' + sentence : sentence;
        }
      }
      if (subCurrent.trim()) {
        finalSegments.push(subCurrent.trim());
      }
    } else {
      finalSegments.push(segment);
    }
  }

  return finalSegments;
}

// 生成唯一占位符（使用 XML 标签格式，翻译 API 通常会保留）
function createPlaceholder(type: string, index: number): string {
  // 使用类似 XML 标签的格式，翻译 API 通常不会修改这类内容
  // 格式: <ph:TYPE:INDEX /> 这种格式不太可能被翻译或修改
  return `<ph:${type}:${index} />`;
}

// 保护不需要翻译的内容
function protectContent(text: string): {
  protected: string;
  placeholders: Map<string, string>;
} {
  const placeholders = new Map<string, string>();
  let counter = 0;
  let protected_ = text;

  // 保护代码块（必须最先保护，因为代码块可能包含其他标记）
  protected_ = protected_.replace(/```[\s\S]*?```/g, (match) => {
    const placeholder = createPlaceholder('CODE', counter++);
    placeholders.set(placeholder, match);
    return placeholder;
  });

  // 保护行内代码
  protected_ = protected_.replace(/`[^`]+`/g, (match) => {
    const placeholder = createPlaceholder('CODE', counter++);
    placeholders.set(placeholder, match);
    return placeholder;
  });

  // 保护 MDX 组件标签 <ComponentName />（支持多单词组件名）
  protected_ = protected_.replace(
    /<\/?([A-Z][a-zA-Z0-9]*)(?:\s[^>]*)?\/?>/g,
    (match) => {
      // 只匹配自闭合标签 <ComponentName />
      if (match.endsWith('/>')) {
        const placeholder = createPlaceholder('MDX', counter++);
        placeholders.set(placeholder, match);
        return placeholder;
      }
      return match;
    }
  );

  // 保护图片 ![alt](url)
  protected_ = protected_.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match) => {
    const placeholder = createPlaceholder('IMG', counter++);
    placeholders.set(placeholder, match);
    return placeholder;
  });

  // 保护链接中的锚点 [text](#anchor)
  protected_ = protected_.replace(/\[([^\]]+)\]\((#[^)]+)\)/g, (match) => {
    const placeholder = createPlaceholder('LINK', counter++);
    placeholders.set(placeholder, match);
    return placeholder;
  });

  return { protected: protected_, placeholders };
}

// 还原保护的内容
function restoreContent(
  text: string,
  placeholders: Map<string, string>
): string {
  let restored = text;

  // 按占位符长度降序排序，避免部分匹配问题
  const sortedPlaceholders = Array.from(placeholders.entries()).sort(
    (a, b) => b[0].length - a[0].length
  );

  for (const [placeholder, original] of sortedPlaceholders) {
    // XML 标签格式的占位符通常不会被翻译 API 修改
    // 但为了安全，我们直接替换，不使用正则表达式
    restored = restored.split(placeholder).join(original);
  }

  return restored;
}

// 翻译单段文本
async function translateSegment(
  text: string,
  source: string,
  target: string
): Promise<string> {
  const { protected: protectedText, placeholders } = protectContent(text);

  // 如果文本太短或只有占位符，直接返回
  if (protectedText.trim().length < 10) {
    return restoreContent(protectedText, placeholders);
  }

  try {
    const translated = await callTencentTMT(protectedText, source, target);
    return restoreContent(translated, placeholders);
  } catch (error) {
    console.error(`Translation error for segment: ${error}`);
    return restoreContent(protectedText, placeholders);
  }
}

// 主翻译函数
async function translatePost(options: TranslateOptions): Promise<void> {
  const { sourceLocale, targetLocale, slug } = options;

  const postsDir = path.join(process.cwd(), 'posts');
  const sourceDir = path.join(postsDir, sourceLocale);
  const targetDir = path.join(postsDir, targetLocale);
  const sourceFile = path.join(sourceDir, `${slug}.mdx`);
  const targetFile = path.join(targetDir, `${slug}.mdx`);

  // 检查源文件是否存在
  if (!fs.existsSync(sourceFile)) {
    console.error(`Source file not found: ${sourceFile}`);
    process.exit(1);
  }

  // 创建目标目录
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`Translating ${slug} from ${sourceLocale} to ${targetLocale}...`);

  // 读取源文件
  const fileContents = fs.readFileSync(sourceFile, 'utf-8');
  const { data: frontmatter, content } = matter(fileContents);

  // 翻译 frontmatter 中的字段
  console.log('Translating frontmatter...');
  const translatedFrontmatter = { ...frontmatter };

  if (frontmatter.title) {
    translatedFrontmatter.title = await translateSegment(
      frontmatter.title,
      sourceLocale,
      targetLocale
    );
    console.log(`  title: ${translatedFrontmatter.title.substring(0, 50)}...`);
  }

  if (frontmatter.excerpt) {
    translatedFrontmatter.excerpt = await translateSegment(
      frontmatter.excerpt,
      sourceLocale,
      targetLocale
    );
  }

  if (frontmatter.category) {
    translatedFrontmatter.category = await translateSegment(
      frontmatter.category,
      sourceLocale,
      targetLocale
    );
  }

  // 翻译正文内容
  console.log('Translating content...');
  const segments = splitText(content);
  const translatedSegments: string[] = [];

  for (let i = 0; i < segments.length; i++) {
    console.log(`  Segment ${i + 1}/${segments.length}...`);
    const translated = await translateSegment(
      segments[i],
      sourceLocale,
      targetLocale
    );
    translatedSegments.push(translated);

    // 避免 API 频率限制
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  const translatedContent = translatedSegments.join('\n\n');

  // 生成翻译后的 MDX 文件
  const output = matter.stringify(translatedContent, translatedFrontmatter);
  fs.writeFileSync(targetFile, output, 'utf-8');

  console.log(`Translation complete: ${targetFile}`);
}

// CLI 入口
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log(
      'Usage: npx ts-node scripts/translate-post.ts <slug> <sourceLocale> <targetLocale>'
    );
    console.log(
      'Example: npx ts-node scripts/translate-post.ts scary-shawarma-kiosk en zh'
    );
    process.exit(1);
  }

  const [slug, sourceLocale, targetLocale] = args;

  if (!TENCENT_SECRET_ID || !TENCENT_SECRET_KEY) {
    console.error(
      'Error: TENCENT_SECRET_ID and TENCENT_SECRET_KEY must be set in environment variables'
    );
    process.exit(1);
  }

  await translatePost({ slug, sourceLocale, targetLocale });
}

main().catch(console.error);
