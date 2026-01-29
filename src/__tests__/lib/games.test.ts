import {
  getAllGamePosts,
  getGamePostBySlug,
  getGameSlugs,
  getAllGames,
  getGameBySlug,
  extractImagePaths,
  GamePost,
} from '@/lib/games';
import fs from 'fs';
import path from 'path';

// Mock fs and path modules
jest.mock('fs');
jest.mock('path');
jest.mock('gray-matter', () => ({
  __esModule: true,
  default: jest.fn((content: string) => ({
    data: {
      title: 'Test Game',
      category: 'Horror',
      date: '2026-01-01',
      readTime: '5 min',
      excerpt: 'A test game',
      coverImage: '/cover.jpg',
      author: 'Test Author',
    },
    content: 'Test content',
  })),
}));

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedPath = path as jest.Mocked<typeof path>;
const mockMatter = require('gray-matter').default;

describe('Games Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllGamePosts', () => {
    it('should read files from posts directory', () => {
      mockedPath.join.mockReturnValue('/mocked/posts/path');
      mockedFs.readdirSync.mockReturnValue(['game1.mdx', 'game2.mdx'] as any);

      mockMatter.matter = jest.fn((content: string) => ({
        data: {
          title: 'Test Game',
          category: 'Horror',
          date: '2026-01-01',
          readTime: '5 min',
          excerpt: 'A test game',
          coverImage: '/cover.jpg',
          author: 'Test Author',
        },
        content: 'Test content',
      }));

      mockedFs.readFileSync.mockReturnValue('frontmatter: value\n\nContent' as any);

      const posts = getAllGamePosts();

      expect(mockedFs.readdirSync).toHaveBeenCalledWith('/mocked/posts/path');
    });

    it('should filter only .mdx files', () => {
      mockedPath.join.mockReturnValue('/mocked/posts/path');
      mockedFs.readdirSync.mockReturnValue([
        'game1.mdx',
        'game2.txt',
        'game3.mdx',
        'readme.md',
      ] as any);

      mockMatter.matter = jest.fn().mockReturnValue({
        data: {
          title: 'Test',
          category: 'Test',
          date: '2026-01-01',
          readTime: '5 min',
          excerpt: 'Test',
          coverImage: '/cover.jpg',
          author: 'Test',
        },
        content: 'Content',
      });

      mockedFs.readFileSync.mockReturnValue('content' as any);

      const posts = getAllGamePosts();

      expect(posts).toHaveLength(2);
    });

    it('should sort posts by date descending', () => {
      mockedPath.join.mockReturnValue('/mocked/posts/path');
      mockedFs.readdirSync.mockReturnValue(['game1.mdx', 'game2.mdx'] as any);

      mockMatter.matter = jest.fn()
        .mockReturnValueOnce({
          data: {
            title: 'Game 1',
            category: 'Test',
            date: '2026-01-01',
            readTime: '5 min',
            excerpt: 'Test',
            coverImage: '/cover.jpg',
            author: 'Test',
          },
          content: 'Content 1',
        })
        .mockReturnValueOnce({
          data: {
            title: 'Game 2',
            category: 'Test',
            date: '2026-01-15',
            readTime: '3 min',
            excerpt: 'Test',
            coverImage: '/cover.jpg',
            author: 'Test',
          },
          content: 'Content 2',
        });

      mockedFs.readFileSync.mockReturnValue('content' as any);

      const posts = getAllGamePosts();

      expect(posts[0].date).toBe('2026-01-15');
      expect(posts[1].date).toBe('2026-01-01');
    });
  });

  describe('getGamePostBySlug', () => {
    it('should return null if file does not exist', () => {
      mockedPath.join.mockReturnValue('/mocked/posts/game.mdx');
      mockedFs.existsSync.mockReturnValue(false);

      const result = getGamePostBySlug('game');

      expect(result).toBeNull();
    });

    it('should return game post if file exists', () => {
      mockedPath.join.mockReturnValue('/mocked/posts/game.mdx');
      mockedFs.existsSync.mockReturnValue(true);

      mockMatter.matter = jest.fn().mockReturnValue({
        data: {
          slug: 'game',
          title: 'Game Title',
          category: 'Horror',
          date: '2026-01-01',
          readTime: '5 min',
          excerpt: 'Excerpt',
          coverImage: '/cover.jpg',
          author: 'Author',
        },
        content: 'Content',
      });

      mockedFs.readFileSync.mockReturnValue('content' as any);

      const result = getGamePostBySlug('game');

      expect(result).not.toBeNull();
      expect(result?.title).toBe('Game Title');
    });

    it('should use slug from frontmatter if available', () => {
      mockedPath.join.mockReturnValue('/mocked/posts/custom-slug.mdx');
      mockedFs.existsSync.mockReturnValue(true);

      mockMatter.matter = jest.fn().mockReturnValue({
        data: {
          slug: 'custom-slug',
          title: 'Game',
          category: 'Test',
          date: '2026-01-01',
          readTime: '5 min',
          excerpt: 'Test',
          coverImage: '/cover.jpg',
          author: 'Test',
        },
        content: 'Content',
      });

      mockedFs.readFileSync.mockReturnValue('content' as any);

      const result = getGamePostBySlug('file-name');

      expect(result?.slug).toBe('custom-slug');
    });
  });

  describe('getGameSlugs', () => {
    it('should return array of slugs without .mdx extension', () => {
      mockedPath.join.mockReturnValue('/mocked/posts/path');
      mockedFs.readdirSync.mockReturnValue([
        'game1.mdx',
        'game2.mdx',
        'game3.mdx',
      ] as any);

      const slugs = getGameSlugs();

      expect(slugs).toEqual(['game1', 'game2', 'game3']);
    });
  });

  describe('legacy functions', () => {
    it('getAllGames should call getAllGamePosts', () => {
      mockedPath.join.mockReturnValue('/mocked/posts/path');
      mockedFs.readdirSync.mockReturnValue([] as any);

      getAllGames();

      expect(mockedFs.readdirSync).toHaveBeenCalled();
    });

    it('getGameBySlug should call getGamePostBySlug', () => {
      mockedPath.join.mockReturnValue('/mocked/posts/test.mdx');
      mockedFs.existsSync.mockReturnValue(false);

      getGameBySlug('test');

      expect(mockedFs.existsSync).toHaveBeenCalled();
    });
  });

  describe('extractImagePaths', () => {
    it('should extract image paths from markdown', () => {
      const content = '![Image 1](/path/to/image1.png)\nSome text\n![Image 2](/path/to/image2.jpg)';

      const paths = extractImagePaths(content);

      expect(paths).toEqual(['/path/to/image1.png', '/path/to/image2.jpg']);
    });

    it('should return empty array if no images found', () => {
      const content = 'Just some text without images';

      const paths = extractImagePaths(content);

      expect(paths).toEqual([]);
    });

    it('should handle images with alt text containing special characters', () => {
      const content = '![Image with [brackets] and (parentheses)](/path/to/image.png)';

      const paths = extractImagePaths(content);

      expect(paths).toEqual(['/path/to/image.png']);
    });
  });
});
