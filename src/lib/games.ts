import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface SchemaData {
  howToSteps?: Array<{ title: string; desc: string }>;
  faqItems?: Array<{ q: string; a: string }>;
}

export interface GamePost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  author: string;
  featured: boolean;
  content: string;
  schemaData?: SchemaData;
}

export interface GameMetadata {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  locale: string;
}

const postsBaseDirectory = path.join(process.cwd(), 'posts');

/**
 * Get posts directory for a specific locale
 */
function getPostsDirectory(locale: string = 'en'): string {
  return path.join(postsBaseDirectory, locale);
}

/**
 * Get all game posts from the posts directory
 */
export function getAllGamePosts(locale: string = 'en'): GamePost[] {
  const postsDirectory = getPostsDirectory(locale);

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);

      return {
        slug: data.slug || fileName.replace(/\.mdx$/, ''),
        title: data.title,
        category: data.category,
        date: data.date,
        readTime: data.readTime,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        author: data.author,
        featured: data.featured || false,
        content,
        schemaData: data.schemaData,
      } as GamePost;
    });

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Get a single game post by slug using gray-matter
 * Falls back to English if locale version doesn't exist
 */
export function getGamePostBySlug(
  slug: string,
  locale: string = 'en'
): GamePost | null {
  try {
    let postsDirectory = getPostsDirectory(locale);
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);

    // Fallback to English if locale version doesn't exist
    if (!fs.existsSync(fullPath) && locale !== 'en') {
      postsDirectory = getPostsDirectory('en');
      fullPath = path.join(postsDirectory, `${slug}.mdx`);
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(fileContents);

    return {
      slug: data.slug || slug,
      title: data.title,
      category: data.category,
      date: data.date,
      readTime: data.readTime,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      author: data.author,
      featured: data.featured || false,
      content,
      schemaData: data.schemaData,
    } as GamePost;
  } catch (error) {
    console.error(
      `Error loading game post "${slug}" for locale "${locale}":`,
      error
    );
    return null;
  }
}

/**
 * Get all game slugs
 */
export function getGameSlugs(locale: string = 'en'): string[] {
  const postsDirectory = getPostsDirectory(locale);

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''));
}

/**
 * Legacy function - use getGamePostBySlug instead
 */
export function getGameBySlug(slug: string) {
  return getGamePostBySlug(slug);
}

/**
 * Legacy function - use getAllGamePosts instead
 */
export function getAllGames() {
  return getAllGamePosts();
}

/**
 * Extract image paths from MDX content
 */
export function extractImagePaths(content: string): string[] {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const matches = content.matchAll(imageRegex);
  return Array.from(matches).map((match) => match[1]);
}

/**
 * Get featured game posts (sorted by featured flag and date)
 */
export function getFeaturedPosts(
  locale: string = 'en',
  limit: number = 3
): GamePost[] {
  const allPosts = getAllGamePosts(locale);

  // Featured posts first, then by date
  const sorted = allPosts.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.date > b.date ? -1 : 1;
  });

  return sorted.slice(0, limit);
}

/**
 * Get recently updated posts
 */
export function getRecentUpdates(
  locale: string = 'en',
  limit: number = 5
): GamePost[] {
  const allPosts = getAllGamePosts(locale);
  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1)).slice(0, limit);
}
