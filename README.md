
[![WASM](https://img.shields.io/badge/Target-WASM-6556C0?logo=webassembly&logoColor=white)](#)
[![Node](https://img.shields.io/badge/Node-%3E%3D20-339933?logo=node.js&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/Types-Included-3178C6?logo=typescript&logoColor=white)](#)
[![Docs](https://img.shields.io/badge/docs-TypeDoc-blue?logo=githubpages)](https://chironmind.github.io/ti-engine/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

# ti-engine

ti-engine is a WebAssembly-powered, JS/TS-idiomatic wrapper around RustTI — a high‑performance, pure‑Rust technical indicators library.

- Production‑grade indicators, ported from battle‑tested Rust code
- First‑class TypeScript types and clean, namespaced API
- Works in Node and modern browsers (bundler + web builds)
- Identical results to RustTI (with parity tests for core functions)

Looking for the Rust crate? See: [ChironMind/RustTI](https://github.com/ChironMind/RustTI)

Looking for the Python version? See: [ChironMind/PyTechnicalIndicators](https://github.com/chironmind/PyTechnicalIndicators)

---

## 🚀 Quick Start

Install from your package manager (example: local/private package)

```bash
# npm
npm install ti-engine

# yarn
yarn add ti-engine

# pnpm
pnpm add ti-engine
```

Initialize and use (Node)

```js
import init, {
  momentumIndicators,
  ConstantModelType,
} from "ti-engine";

// Node: init() is a no-op, but safe to call
await init();

const prices = [100.2, 100.46, 100.53, 100.38, 100.19];

const rsi = momentumIndicators.single.relativeStrengthIndex(
  prices,
  ConstantModelType.SimpleMovingAverage
);

console.log("RSI:", rsi); // 49.2537313432832
```

Browser (bundlers)

```js
import init, { movingAverage, MovingAverageType } from "ti-engine";

await init(); // Required to load the WASM module in browsers

const sma = movingAverage.single.movingAverage(
  [100.2, 100.46, 100.53, 100.38, 100.19],
  MovingAverageType.Simple
);

console.log("SMA:", sma); // 100.352
```

---

## 🧩 What You Get

- Same math and deterministic outputs as RustTI
- Two styles for almost every indicator:
  - single: full-window, scalar output
  - bulk: rolling windows, vector output
- Clean naming and nested namespaces:
  - candleIndicators, chartTrends, correlationIndicators, momentumIndicators, movingAverage, otherIndicators, standardIndicators, strengthIndicators, trendIndicators, volatilityIndicators

Fully typed with ambient declarations — enjoy rich editor hints and autocomplete.

---

## 📚 API Overview

All indicator namespaces expose:
- single: functions that compute a single value from the whole input
- bulk: functions that compute rolling outputs (arrays)

Common enums:
- ConstantModelType: SimpleMovingAverage, SmoothedMovingAverage, ExponentialMovingAverage, SimpleMovingMedian, SimpleMovingMode, PersonalisedMovingAverage
- DeviationModel: StandardDeviation, MeanAbsoluteDeviation, MedianAbsoluteDeviation, ModeAbsoluteDeviation, UlcerIndex
- Position: Long, Short (for SAR-like systems)
- MovingAverageType: Simple, Smoothed, Exponential (for generic moving average helpers)

Top namespaces:
- movingAverage: generic MAs and McGinley Dynamic
- momentumIndicators: RSI, Stochastic, MACD variants, PPO, MFI, OBV, CCI, Williams %R, Chaikin, CMO
- strengthIndicators: Accumulation/Distribution, PVI, NVI, RVI
- trendIndicators: Aroon (Up/Down/Oscillator), Parabolic Time Price System, Directional Movement System (+DI, –DI, ADX/ADXR), VPT, TSI
- volatilityIndicators: Ulcer Index, Wilder’s volatility system
- candleIndicators: Bands/Envelopes, Ichimoku, Donchian, Keltner, Supertrend
- correlationIndicators: Asset correlation
- chartTrends: Peaks/Valleys, trend lines, segmentation
- otherIndicators: ROI, True Range / ATR, Internal Bar Strength, Positivity Indicator

See the full set of function signatures via your editor or the included `index.d.ts`.

---

## 🧪 Usage Examples

Relative Strength Index (RSI)
```js
import init, { momentumIndicators, ConstantModelType } from "ti-engine";
await init();

const prices = [100.2, 100.46, 100.53, 100.38, 100.19, 100.21, 100.32, 100.28];

// Full window (single)
const rsi = momentumIndicators.single.relativeStrengthIndex(
  prices.slice(0, 5),
  ConstantModelType.SimpleMovingAverage
);
// -> 49.2537313432832

// Rolling (bulk), period = 5
const rsiSeries = momentumIndicators.bulk.relativeStrengthIndex(
  prices,
  ConstantModelType.SimpleMovingAverage,
  5
);
// -> [49.2537..., 20.9302..., 27.6595..., 36.1111...]
```

MACD (EMA/EMA)
```js
import { momentumIndicators, ConstantModelType } from "ti-engine";

const macdLine = momentumIndicators.single.macdLine(
  [100.46, 100.53, 100.38, 100.19, 100.21],
  3,
  ConstantModelType.ExponentialMovingAverage,
  ConstantModelType.ExponentialMovingAverage
);
// -> -0.06067027758972188

const signal = momentumIndicators.single.signalLine(
  [-0.06067027758972188, -0.022417061611406552, 0.005788761002008869],
  ConstantModelType.ExponentialMovingAverage
);
// -> -0.011764193829214216
```

Parabolic Time Price System (SAR)
```js
import { trendIndicators, Position, ConstantModelType } from "ti-engine";

// Long SAR track with rolling outputs
const sars = trendIndicators.bulk.parabolicTimePriceSystem(
  [100.64, 102.39, 101.51, 99.48, 96.93], // highs
  [95.92, 96.77, 95.84, 91.22, 89.12],    // lows
  0.02, 0.2, 0.02,                        // AF start, max, step
  Position.Long,                          // starting side
  0.0                                     // previous SAR (seed)
);
// -> [95.92, 95.92, 102.39, 101.9432, 101.17380800000001]
```

Ulcer Index (volatility)
```js
import { volatilityIndicators } from "ti-engine";

const ui = volatilityIndicators.single.ulcerIndex(
  [100.46, 100.53, 100.38, 100.19, 100.21]
);
// -> 0.21816086938686668
```

Moving Average helpers
```js
import { movingAverage, MovingAverageType } from "ti-engine";

const sma = movingAverage.single.movingAverage(
  [100.2, 100.46, 100.53, 100.38, 100.19],
  MovingAverageType.Simple
);
// -> 100.352
```

---

## 🔌 Builds and Initialization

This package includes three targets out of the box:

- Node: `dist/node/ti_engine.js` (CommonJS require via index.node.js)
- Bundler: `dist/bundler/ti_engine.js` (ESM, for Vite/Webpack/Rollup)
- Web: `dist/web/ti_engine.js` (ESM + separate `.wasm`)

Import surfaces:

- Node: `import init, * as api from "ti-engine/index.node.js";` (or default `import` from package root)
- Bundler/Web: `import init, * as api from "ti-engine";`

Initialization:

- Web/Bundlers: You MUST `await init()` before calling indicators (it fetches/instantiates WASM).
- Node: `init()` is a no‑op, safe to call for parity in shared code paths.

---

## 🧠 Tips & Conventions

- Input validation mirrors RustTI: many functions panic for empty arrays or mismatched lengths. In JS, this surfaces as a thrown error.
- Use `Float64Array` or `number[]`. Internally, values are copied into WASM memory; consider chunking for very large series.
- Bulk functions typically return arrays of length `L - N + 1` where `N` is the rolling period (or long period for dual-period indicators).
- All outputs are plain JS arrays for easy consumption; tuples are represented as small arrays (e.g., `[lower, middle, upper]`).

---

## 📈 Performance

- All math is executed in highly optimized Rust and compiled to WebAssembly.
- In Node, performance is near-native for numeric workloads.
- In browsers, expect excellent performance; account for WASM boundary crossings (amortize by passing larger slices).

For raw Rust benchmarks and methodology, see:
- [RustTI Benchmarks](https://github.com/ChironMind/RustTI-benchmarks)

---

## 🧪 Parity Tests

This repo includes value parity tests that assert equality with RustTI for a selection of indicators across modules. Run them in Node:

```bash
npm test
# or
node --test ti-engine/test/*.test.js
```

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!
- Open an issue or discussion
- Submit a PR with tests (value parity preferred)
- Suggestions for new high‑value wrappers and DX improvements are appreciated

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📰 Release Notes

See Git history and [changelog](CHANGELOG.md) for details.
We follow semver where possible for API changes.

---

## 📄 License

MIT License. See [LICENSE](LICENSE-MIT).

