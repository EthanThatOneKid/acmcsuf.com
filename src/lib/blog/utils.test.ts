import { test, expect } from 'vitest';
import { readingTime } from './utils';
import fs from 'fs';

test('properly times plain text strings', () => {
  const sampleText = fs.readFileSync('src/lib/blog/bee-movie.txt').toString();
  expect(readingTime(sampleText)).toBe(41);
});

test('properly times html strings', () => {
  const sampleText = fs.readFileSync('src/lib/blog/enchanted.html').toString();
  expect(readingTime(sampleText)).toBe(3);
});
