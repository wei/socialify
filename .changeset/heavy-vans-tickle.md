---
"socialify": patch
---

Limited GITHUB_TOKEN process.env check to CI only, as 'next start` in Playwright auto-loads .env for local devs.
