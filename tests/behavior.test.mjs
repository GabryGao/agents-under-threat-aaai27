import test from 'node:test';
import assert from 'node:assert/strict';

import { nextMenuState, shouldAnimate } from '../app/workshop-behavior.mjs';

test('mobile navigation transitions are deterministic', () => {
  assert.equal(nextMenuState(false, 'toggle'), true);
  assert.equal(nextMenuState(true, 'toggle'), false);
  assert.equal(nextMenuState(true, 'close'), false);
  assert.equal(nextMenuState(false, 'close'), false);
  assert.throws(() => nextMenuState(false, 'open'), /Unknown menu action/);
});

test('reveal effects respect reduced-motion preferences', () => {
  assert.equal(shouldAnimate(false), true);
  assert.equal(shouldAnimate(true), false);
});
