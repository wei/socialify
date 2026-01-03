import type { Page } from '@playwright/test'

/**
 * Disables all CSS animations and transitions for consistent screenshots.
 * This helps achieve 100% pixel-perfect screenshot matching.
 *
 * This function injects CSS that:
 * - Disables all animations
 * - Disables all transitions
 * - Sets animation/transition durations to 0
 * - Prevents any delayed visual changes
 */
export async function disableAnimations(page: Page): Promise<void> {
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
      }
    `,
  })
}
