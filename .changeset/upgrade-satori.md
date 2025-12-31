---
"socialify": patch
---

Upgrade satori from 0.15.2 to 0.18.3

- Simplified renderSVG.tsx by removing manual yoga-wasm-web initialization (satori now bundles WASM internally)
- Removed yoga-wasm-web dependency
- Updated postinstall script to no longer copy yoga.wasm
