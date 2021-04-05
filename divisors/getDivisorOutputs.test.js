import { getDivisorOutputs } from './getDivisorOutputs';

test('when no divisors returns no outputs', () => {
  const outputs = getDivisorOutputs(0,100,[]);
  expect(Object.keys(outputs).length).toBe(0);
});

test('when any divisors given returns output for 0', () => {
  const outputs = getDivisorOutputs(0,0,[
    {
      "divisor": 3,
      "output": "Boss"
    },
    {
      "divisor": 5,
      "output": "Hogg"
    },
    {
      "divisor": 9,
      "output": "Rosco P"
    },
    {
      "divisor": 11,
      "output": "Coltrane"
    }
  ]);
  expect(Object.keys(outputs).length).toBe(1);
  expect(outputs[0].length).toBe(4);
});

test('upholds that all numbers are divisible by themselves', () => {
  const outputs = getDivisorOutputs(3,11,[
    {
      "divisor": 3,
      "output": "Boss"
    },
    {
      "divisor": 5,
      "output": "Hogg"
    },
    {
      "divisor": 9,
      "output": "Rosco P"
    },
    {
      "divisor": 11,
      "output": "Coltrane"
    }
  ]);
  expect(outputs[3][0]).toBe('Boss');
  expect(outputs[5][0]).toBe('Hogg');
  expect(outputs[9][1]).toBe('Rosco P');
  expect(outputs[11][0]).toBe('Coltrane');
});

test('returns multiple results when appropriate', () => {
  const outputs = getDivisorOutputs(3,12,[
    {
      "divisor": 3,
      "output": "Cooter"
    },
    {
      "divisor": 4,
      "output": "Davenport"
    },
    {
      "divisor": 6,
      "output": "Rosco P"
    },
    {
      "divisor": 12,
      "output": "Coltrane"
    }
  ]);
  expect(outputs[12].length).toBe(4);
});

