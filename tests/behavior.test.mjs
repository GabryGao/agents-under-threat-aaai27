import test from 'node:test';
import assert from 'node:assert/strict';

import * as behavior from '../app/workshop-behavior.mjs';

const { nextMenuState } = behavior;

test('mobile navigation transitions are deterministic', () => {
  assert.equal(nextMenuState(false, 'toggle'), true);
  assert.equal(nextMenuState(true, 'toggle'), false);
  assert.equal(nextMenuState(true, 'close'), false);
  assert.equal(nextMenuState(false, 'close'), false);
  assert.throws(() => nextMenuState(false, 'open'), /Unknown menu action/);
});

test('academic page behavior has no reveal animation dependency', () => {
  assert.deepEqual(Object.keys(behavior), ['nextMenuState']);
});
