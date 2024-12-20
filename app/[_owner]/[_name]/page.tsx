'use client'

import { JSX } from 'react'

import MainRenderer from '@/src/components/mainRenderer'

export const runtime = 'edge'

export default function PreviewConfigPage(): JSX.Element {
  return <MainRenderer />
}
