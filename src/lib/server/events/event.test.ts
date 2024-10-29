import { test, expect, assert } from 'vitest';
import { Temporal } from '@js-temporal/polyfill';
import {
  makeEventId,
  parseDescription,
  makeEventLink,
  wrapText,
  replaceHtmlLinkTargets,
} from './event';

// 이벤트 세부 정보에서 ID를 생성하는 테스트입니다.
// Tests creating an ID from event details.
test('makes id of simple event details', () => {
  const actual = makeEventId(
    'test-event',
    Temporal.ZonedDateTime.from({ timeZone: 'UTC', year: 2000, month: 1, day: 1 })
  );
  const expected = 'test-event-2000-january-1';
  expect(actual).toBe(expected);
});

// 대문자가 포함된 이벤트 세부 정보에서 ID를 생성하는 테스트입니다.
// Tests creating an ID from event details that include capitalized letters.
test('makes id of capitalized event details', () => {
  const actual = makeEventId(
    'Test Event',
    Temporal.ZonedDateTime.from({ timeZone: 'UTC', year: 2000, month: 1, day: 1 })
  );
  const expected = 'test-event-2000-january-1';
  expect(actual).toBe(expected);
});

// 빈 이벤트 설명을 분석하는 테스트입니다.
// Tests parsing an empty event description.
test('parses empty event description', () => {
  const { description, variables } = parseDescription('');
  expect(description).toBe('');
  expect(variables).toEqual(new Map());
});

// 텍스트만 있는 이벤트 설명을 분석하는 테스트입니다.
// Tests parsing an event description that contains only text.
test('parses text-only event description', () => {
  const { description, variables } = parseDescription('Hello, world!');
  expect(description).toBe('Hello, world!');
  expect(variables).toEqual(new Map());
});

// 변수만 포함된 이벤트 설명을 분석하는 테스트입니다.
// Tests parsing an event description that contains only a variable.
test('parses variable-only event description', () => {
  const { description, variables } = parseDescription('ACM_TEST=test');
  expect(description).toBe('');
  expect(variables).toEqual(new Map([['ACM_TEST', 'test']]));
});

// 텍스트와 변수가 모두 포함된 이벤트 설명을 분석하는 테스트입니다.
// Tests parsing an event description that contains both text and variables.
test('parses variables and text in event description', () => {
  const { description, variables } = parseDescription('Hello, world! ACM_TEST=test');
  expect(description).toBe('Hello, world!');
  expect(variables).toEqual(new Map([['ACM_TEST', 'test']]));
});

// 이벤트 슬러그와 기본 URL로 링크를 만드는 테스트입니다.
// Tests creating a link from an event slug and base URL.
test('makes a link out of event slug and base URL', () => {
  const result = makeEventLink('test-event-2000-january-1', 'https://example.com/');
  expect(result).toEqual('https://example.com/#test-event-2000-january-1');
});

// 길이가 긴 텍스트를 100열마다 3번 줄 바꿈하여 감싸는 테스트입니다.
// Tests wrapping long text into lines at every 100 columns, 3 times.
test('wraps long text into lines broken at column 100 3 times', () => {
  const lines = wrapText('*'.repeat(301), 100);
  assert(lines.length === 4, 'wraps text into 3 times, making 4 lines');
  assert(lines.at(-1)?.length === 1, 'where the last line is a single asterisk');
});

// HTML 문자열에서 링크의 target 속성을 "_blank"로 바꾸는 테스트입니다.
// Tests replacing link target attributes with "_blank" in an HTML string.
test('replaces link targets with "_blank" in HTML string', () => {
  const actual =
    replaceHtmlLinkTargets(`<a title="example" target="_self"  href="https://example.com/">Example Link</a>
  <a title="example" target="_self"href="https://example.com/">Example Link</a>
  <a target="_self" title="example" href="https://example.com/">Example Link</a>
  <a title="example" target="_self" target="poggers" target="not poggers"  href="https://example.com/">Example Link</a>
  <a title="example" target="" href="https://example.com/">Example Link</a>
  <a href="https://example.com/example/">https://example.com/example/</a>
  <a title="example">Example Link</a>
  <a href="https://example.com/">
  <a>
  <a title="example" href="https://example.com/">
  <a title="example" target="_self" href="https://example.com/">
  <a title="example" target="_blank" href="https://example.com/">
  <article href="https://example.com/">example</article>
  example`);
  expect(actual)
    .toBe(`<a title="example" href="https://example.com/" target="_blank">Example Link</a>
  <a title="example" href="https://example.com/" target="_blank">Example Link</a>
  <a title="example" href="https://example.com/" target="_blank">Example Link</a>
  <a title="example" href="https://example.com/" target="_blank">Example Link</a>
  <a title="example" href="https://example.com/" target="_blank">Example Link</a>
  <a href="https://example.com/example/" target="_blank">https://example.com/example/</a>
  <a title="example">Example Link</a>
  <a href="https://example.com/" target="_blank">
  <a>
  <a title="example" href="https://example.com/" target="_blank">
  <a title="example" href="https://example.com/" target="_blank">
  <a title="example" href="https://example.com/" target="_blank">
  <article href="https://example.com/">example</article>
  example`);
});
