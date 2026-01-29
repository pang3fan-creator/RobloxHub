import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
}

export interface GameMetadata {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  locale: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * Get all game posts from the posts directory
 */
export function getAllGamePosts(): GamePost[] {
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
      } as GamePost;
    });

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Get a single game post by slug using gray-matter
 */
export function getGamePostBySlug(slug: string): GamePost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

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
    } as GamePost;
  } catch (error) {
    console.error(`Error loading game post "${slug}":`, error);
    return null;
  }
}

/**
 * Get all game slugs
 */
export function getGameSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((name) => name.replace(/\.mdx$/, ''));
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
