import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vite-plus/test'

expect.extend(matchers)

// Testing Library only auto-cleans when test globals are enabled.
afterEach(cleanup)
