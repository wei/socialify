'use client'

import { JSX } from 'react'

import Repo from '@/src/components/repo/repo'

export const runtime = 'edge'

export default function HomePage(): JSX.Element {
  return <Repo />
}
