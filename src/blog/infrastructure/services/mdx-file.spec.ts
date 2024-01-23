import { vi, describe, it, expect } from "vitest";

import { fetchMdxFiles, isModuleWithFrontmatter } from "./mdx-file";

describe('mdxFile - service to handle mdx operations', () => {
  describe('fetchMdxFiles', () => {
    it('should correctly fetch and process all valid MDX files', async () => {
      const getModules = vi.fn(() => ({
        'path/to/module1': { frontmatter: {
          title: 'Frontend test smells',
          published: true,
          description: 'How to spot the tests smells in your frontend application',
          tags: 'testing, react, frontend, typescript',
          date: '2022-10-30'
        }, headings: {}},
        'path/to/module2': { frontmatter: { title: 'Title 2', description: 'Description 2', date: '2022-01-02' }, headings: {}},
      }));
  
      const result = await fetchMdxFiles({ getModules });
  
      expect(result).toEqual([
        { path: 'path/to/module1', metadata: { title: 'Frontend test smells', description: 'How to spot the tests smells in your frontend application', date: '2022-10-30' }},
        { path: 'path/to/module2', metadata: { title: 'Title 2', description: 'Description 2', date: '2022-01-02' }},
      ]);
    });
  
    it('should throw an error if any module is invalid', async () => {
      const getModules = vi.fn(() => ({
        'path/to/validModule': { frontmatter: { title: 'Valid Title', description: 'Valid Description', date: '2022-01-01' }},
        'path/to/invalidModule': { wrongProperty: {} },
      }));
  
      await expect(fetchMdxFiles({ getModules })).rejects.toThrow('Fatal Error: incorrect modules have been found in mdx files');
    });
  });

  describe('isModuleWithFrontmatter', () => {
    it('should return true for objects with valid frontmatter', () => {
      const validModule = {
        frontmatter: {
          title: 'Test Title',
          description: 'Test Description',
          date: '2022-01-01'
        }
      };
      expect(isModuleWithFrontmatter(validModule)).toBe(true);
    });
  
    it('should return false for objects without frontmatter', () => {
      const invalidModule = { notFrontmatter: {} };
      expect(isModuleWithFrontmatter(invalidModule)).toBe(false);
    });
  
    it('should return false for objects with incomplete or invalid frontmatter', () => {
      const incompleteModule = {
        frontmatter: {
          title: 'Test Title',
        }
      };
      expect(isModuleWithFrontmatter(incompleteModule)).toBe(false);
    });
  });
})