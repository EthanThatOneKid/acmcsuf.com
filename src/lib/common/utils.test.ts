import { test, expect } from 'vitest';
import * as utils from './utils';

test('checks correct isStringTruthy output for falsy and truthy values', () => {
  expect(utils.isStringTruthy('FALSE') === false);
  expect(utils.isStringTruthy('') === false);
  expect(utils.isStringTruthy('') === false);
  expect(utils.isStringTruthy(``) === false);
  expect(utils.isStringTruthy(null) === false);
  expect(utils.isStringTruthy(undefined) === false);
  expect(utils.isStringTruthy(String(false)) === false);
  expect(utils.isStringTruthy(String(NaN)) === false);
  expect(utils.isStringTruthy(String(0)) === false);
  expect(utils.isStringTruthy(String(-0)) === false);
  // truthy values
  expect(utils.isStringTruthy('TRUE') === true);
  expect(utils.isStringTruthy(String(true)) === true);
  expect(utils.isStringTruthy(String(1)) === true);
});
