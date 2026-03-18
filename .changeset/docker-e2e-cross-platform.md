---
"socialify": patch
---

Add Docker-based e2e test runner for cross-platform snapshot consistency. On non-Linux hosts (macOS, Windows), tests automatically run inside a Linux Docker container so screenshots match CI. On Linux/CI, tests run directly as before.
