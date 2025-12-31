'use client'

import { JSX } from 'react'

import Repo from '@/src/components/repo/repo'

// Edge runtime disables ISR to prevent unwanted caching (see PR #470)
export const runtime = 'edge'

export default function HomePage(): JSX.Element {
  return <Repo />
}
