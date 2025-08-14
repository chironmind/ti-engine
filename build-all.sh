#!/usr/bin/env bash
set -euo pipefail

# Build for browser, node, and bundlers
wasm-pack build --release --target web --out-dir dist/web
wasm-pack build --release --target nodejs --out-dir dist/node
wasm-pack build --release --target bundler --out-dir dist/bundler

echo "Build complete. Outputs in dist/web, dist/node, dist/bundler"
