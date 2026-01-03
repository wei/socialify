import type { Page } from '@playwright/test'

/**
 * Disables all CSS animations and transitions for consistent screenshots.
 * This helps achieve 100% pixel-perfect screenshot matching.
 *
 * This function uses multiple approaches to ensure all animations are disabled:
 * 1. Emulates 'prefers-reduced-motion: reduce' media query
 * 2. Injects CSS to force animation/transition durations to 0
 *
 * The universal selector approach is intentional for test environments to ensure
 * complete animation suppression across all elements, including third-party components.
 */
export async function disableAnimations(page: Page): Promise<void> {
  // Use Playwright's built-in media emulation for reduced motion
  await page.emulateMedia({ reducedMotion: 'reduce' })

  // Additional CSS injection to force all animations/transitions to 0 duration
  // This catches any animations that don't respect prefers-reduced-motion
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
