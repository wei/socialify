import { JSX } from 'react'

import MainRenderer from '@/src/components/mainRenderer'

// Edge runtime disables ISR to prevent unwanted caching (see PR #470)
export const runtime = 'edge'

export default function PreviewConfigPage(): JSX.Element {
  return <MainRenderer />
}
