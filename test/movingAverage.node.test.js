import { test, describe, before } from "node:test";
import assert from "node:assert/strict";

import init, { movingAverage, MovingAverageType } from "../index.node.js";

before(async () => {
  await init();
});

describe("movingAverage.single (one model)", () => {
  test("movingAverage (Simple)", () => {
    const prices = [100.2, 100.46, 100.53, 100.38, 100.19];
    const out = movingAverage.single.movingAverage(prices, MovingAverageType.Simple);
    assert.strictEqual(out, 100.352);
  });

  test("mcginleyDynamic (no previous)", () => {
    const out = movingAverage.single.mcginleyDynamic(100.19, 0.0, 5);
    assert.strictEqual(out, 100.19);
  });
});

describe("movingAverage.bulk (one model)", () => {
  test("movingAverage (Simple, period 3)", () => {
    const prices = [100.2, 100.46, 100.53, 100.38, 100.19];
    const out = movingAverage.bulk.movingAverage(prices, MovingAverageType.Simple, 3);
    assert.deepEqual(out, [100.39666666666666, 100.456666666666666, 100.36666666666667]);
  });

  test("mcginleyDynamic (period 3, no previous)", () => {
    const prices = [100.2, 100.46, 100.53, 100.38, 100.19];
    const out = movingAverage.bulk.mcginleyDynamic(prices, 0.0, 3);
    assert.deepEqual(out, [100.53, 100.47970046511769, 100.38201189376744]);
  });
});
