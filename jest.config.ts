import { readFileSync } from 'node:fs'
import type { Config } from '@jest/types'
// Next.js 15 requires explicit file extension for the Jest helper
// See: https://github.com/vercel/next.js/pull/58249
import nextJest from 'next/jest.js'
import { pathsToModuleNameMapper } from 'ts-jest'

// tsconfig.json is imported for path aliases; we read it via fs to
// avoid JSON import assertions issues in newer Node versions.
const { compilerOptions } = JSON.parse(
  readFileSync(new URL('./tsconfig.json', import.meta.url), 'utf-8')
)

const createJestConfig = nextJest({
  dir: './',
})

// Add any custom config to be passed to Jest.
const customJestConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/.vercel/',
    '/.playwright/',
  ],
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load
// the Next.js config which is async.
export default createJestConfig(customJestConfig)
