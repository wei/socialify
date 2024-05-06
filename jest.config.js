// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  modulePathIgnorePatterns: ['<rootDir>/.vercel/'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/$1',
    '^@common/(.*)$': '<rootDir>/common/$1',
    '^@github/(.*)$': '<rootDir>/common/github/$1',
    '^@types/(.*)$': '<rootDir>/common/types/$1',
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@[_owner]/(.*)$': '<rootDir>/pages/[_owner]/$1',
    '^@api/(.*)$': '<rootDir>/pages/api/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    '^@assets/(.*)$': '<rootDir>/public/assets/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@configuration/(.*)$': '<rootDir>/src/components/configuration/$1',
    '^@error/(.*)$': '<rootDir>/src/components/error/$1',
    '^@footer/(.*)$': '<rootDir>/src/components/footer/$1',
    '^@header/(.*)$': '<rootDir>/src/components/header/$1',
    '^@hooks/(.*)$': '<rootDir>/src/components/hooks/$1',
    '^@preview/(.*)$': '<rootDir>/src/components/preview/$1',
    '^@repo/(.*)$': '<rootDir>/src/components/repo/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@typings/(.*)$': '<rootDir>/src/typings/$1',
    '^@styles/(.*)$': '<rootDir>/styles/$1'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ]
  // "transform": {
  //   "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  //   "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
  //   "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  // },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
