import { getSubtextIndexes } from './getSubtextResults';

const testText1 = "Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!";
const testText2 = "Some other random text just to try to flush out any other issues that might catch us unawares.... or while we are having a zzz. More to come if and when other arcane edge cases are hit ";

test('no results when search text is empty', () => {
  const results = getSubtextIndexes('','peter');
  expect(results.length).toBe(0);
});

test('no results when sub-text is empty', () => {
  const results = getSubtextIndexes('Peter','');
  expect(results.length).toBe(0);
});

test('correct result when only one word in search text', () => {
  const results = getSubtextIndexes('peter','Peter');
  expect(results.length).toBe(1);
  expect(results[0]).toBe(0);
});

test('correct result for sub-text Peter in testText1', () => {
  const results = getSubtextIndexes(testText1,'Peter');
  expect(results.length).toBe(3);
  expect(results[0]).toBe(0);
  expect(results[1]).toBe(42);
  expect(results[2]).toBe(97);
});

test('correct result for sub-text peter in testText1', () => {
  const results = getSubtextIndexes(testText1,'peter');
  expect(results.length).toBe(3);
  expect(results[0]).toBe(0);
  expect(results[1]).toBe(42);
  expect(results[2]).toBe(97);
});

test('correct result for sub-text pick in testText1', () => {
  const results = getSubtextIndexes(testText1,'pick');
  expect(results.length).toBe(2);
  expect(results[0]).toBe(52);
  expect(results[1]).toBe(80);
});

test('correct result for sub-text pi in testText1', () => {
  const results = getSubtextIndexes(testText1,'pi');
  expect(results.length).toBe(5);
  expect(results[0]).toBe(52);
  expect(results[1]).toBe(59);
  expect(results[2]).toBe(65);
  expect(results[3]).toBe(73);
  expect(results[4]).toBe(80);
});

test('correct result for sub-text Z in testText1', () => {
  const results = getSubtextIndexes(testText1,'Z');
  expect(results.length).toBe(0);
});

test('correct result for sub-text Z in testText2', () => {
  const results = getSubtextIndexes(testText2,'Z');
  expect(results.length).toBe(3);
});