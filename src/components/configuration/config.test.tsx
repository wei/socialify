import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { getOptionalConfig } from '@/common/configHelper'
import type { RepoQueryResponse } from '@/common/github/repoQuery'
import { Font, Pattern, Theme } from '@/common/types/configType'
import type ConfigType from '@/common/types/configType'
import ConfigContext from '@/src/contexts/ConfigContext'
import { useRouteResources } from '@/src/hooks/useRouteResources'
import Config from './config'

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/src/hooks/useRouteResources')
jest.mock('@/common/configHelper')

const mockPush = jest.fn()
const mockUseRouter = require('next/navigation')
  .useRouter as jest.MockedFunction<any>
const mockUseRouteResources = useRouteResources as jest.MockedFunction<
  typeof useRouteResources
>
const mockGetOptionalConfig = getOptionalConfig as jest.MockedFunction<
  typeof getOptionalConfig
>

describe('Config', () => {
  const mockRepository: RepoQueryResponse['repository'] = {
    owner: { login: 'testowner' },
    name: 'testrepo',
    description: 'Test repository description',
    languages: {
      totalCount: 1,
      nodes: [{ name: 'JavaScript', color: '#f1e05a' }],
    },
    stargazerCount: 100,
    forkCount: 25,
    issues: { totalCount: 5 },
    pullRequests: { totalCount: 3 },
    releases: { nodes: [] },
    createdAt: '2023-01-01T00:00:00Z',
  }

  const defaultConfig: ConfigType = {
    theme: Theme.light,
    font: Font.inter,
    pattern: Pattern.plus,
    logo: '',
    name: { value: 'testrepo', state: true },
    owner: { value: 'testowner', state: true },
    language: { value: 'JavaScript', state: true },
    stargazers: { value: 100, state: true },
    forks: { value: 25, state: false },
    issues: { value: 5, state: false },
    pulls: { value: 3, state: false },
    description: { value: 'Test repository description', state: false },
  }

  const mockSetConfig = jest.fn()

  const defaultRouteResources = {
    clientRouter: { push: mockPush } as any,
    repoOwner: 'testowner',
    repoName: 'testrepo',
    currentPath: '/testowner/testrepo',
    searchParamsString: 'theme=Light&language=1&owner=1&name=1&stargazers=1',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    })
    mockUseRouteResources.mockReturnValue(defaultRouteResources)
    mockGetOptionalConfig.mockReturnValue(defaultConfig)
  })

  const renderWithContext = (
    config = defaultConfig,
    repository = mockRepository
  ) => {
    return render(
      <ConfigContext.Provider value={{ config, setConfig: mockSetConfig }}>
        <Config repository={repository} />
      </ConfigContext.Provider>
    )
  }

  describe('Component Rendering', () => {
    it('renders the config component correctly with repository data', () => {
      renderWithContext()

      expect(screen.getByText('Repository')).toBeInTheDocument()
      expect(screen.getByText('Theme')).toBeInTheDocument()
      expect(screen.getByText('Font')).toBeInTheDocument()
      expect(screen.getByText('Background Pattern')).toBeInTheDocument()
      expect(screen.getByText('SVG Logo')).toBeInTheDocument()
    })

    it('renders all checkbox options correctly', () => {
      renderWithContext()

      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Owner')).toBeInTheDocument()
      expect(screen.getByText('Language')).toBeInTheDocument()
      expect(screen.getByText('Stars')).toBeInTheDocument()
      expect(screen.getByText('Forks')).toBeInTheDocument()
      expect(screen.getByText('Issues')).toBeInTheDocument()
      expect(screen.getByText('Pull Requests')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
    })

    it('renders with correct styling consistency (snapshot)', () => {
      const { container } = renderWithContext()

      const card = screen.getByText('Repository').closest('.card')
      const cardBody = card?.querySelector('.card-body')

      // Test card styling snapshot
      expect(card).toMatchSnapshot('config-card-component')

      // Test card body exists and snapshot
      expect(cardBody).toBeInTheDocument()
      expect(cardBody).toMatchSnapshot('config-card-body')

      // Test complete component structure snapshot
      expect(container.firstChild).toMatchSnapshot('config-complete-component')
    })

    it('returns null when repository is null', () => {
      const { container } = render(
        <ConfigContext.Provider
          value={{ config: defaultConfig, setConfig: mockSetConfig }}
        >
          <Config repository={null} />
        </ConfigContext.Provider>
      )
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Context Integration', () => {
    it('uses ConfigContext correctly', () => {
      renderWithContext()

      // The component should render with the provided config
      expect(screen.getByDisplayValue('testowner/testrepo')).toBeInTheDocument()
    })

    it('calls setConfig when configuration changes', () => {
      renderWithContext()

      // Find and click a checkbox to trigger config change
      const ownerCheckbox = screen.getByRole('checkbox', { name: /owner/i })
      fireEvent.click(ownerCheckbox)

      // Should trigger URL update via router push
      expect(mockPush).toHaveBeenCalled()
    })
  })

  describe('Route Handling and URL Synchronization', () => {
    it('handles search params synchronization correctly', () => {
      renderWithContext()

      // Component should process the search params string
      expect(mockGetOptionalConfig).toHaveBeenCalledWith(mockRepository)
    })

    it('handles empty search parameters correctly', () => {
      mockUseRouteResources.mockReturnValue({
        ...defaultRouteResources,
        searchParamsString: '',
      })

      renderWithContext()

      expect(mockGetOptionalConfig).toHaveBeenCalledWith(mockRepository)
    })
  })

  describe('Description Field Conditional Rendering', () => {
    it('shows description textarea when description is enabled', () => {
      const configWithDescription = {
        ...defaultConfig,
        description: { value: 'Test description', state: true },
      }

      renderWithContext(configWithDescription)

      expect(screen.getAllByText('Description')).toHaveLength(2) // Checkbox + textarea label
      expect(screen.getByDisplayValue('Test description')).toBeInTheDocument()
    })

    it('hides description textarea when description is disabled', () => {
      const configWithoutDescription = {
        ...defaultConfig,
        description: { value: 'Test description', state: false },
      }

      renderWithContext(configWithoutDescription)

      expect(screen.getAllByText('Description')).toHaveLength(1) // Only checkbox
      expect(
        screen.queryByDisplayValue('Test description')
      ).not.toBeInTheDocument()
    })
  })

  describe('Repository Validation', () => {
    it('handles repository validation correctly in useEffect', () => {
      renderWithContext()

      // Component should call getOptionalConfig with the repository
      expect(mockGetOptionalConfig).toHaveBeenCalledWith(mockRepository)
    })

    it('handles null repository in useEffect', () => {
      mockGetOptionalConfig.mockReturnValue(null)
      renderWithContext()

      expect(mockGetOptionalConfig).toHaveBeenCalledWith(mockRepository)
    })

    it('processes search parameters correctly in useEffect', () => {
      const mockConfig = { ...defaultConfig }
      mockGetOptionalConfig.mockReturnValue(mockConfig)

      renderWithContext()

      expect(mockSetConfig).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('handles missing repository gracefully', () => {
      const { container } = render(
        <ConfigContext.Provider
          value={{ config: defaultConfig, setConfig: mockSetConfig }}
        >
          <Config repository={null} />
        </ConfigContext.Provider>
      )

      expect(container.firstChild).toBeNull()
    })

    it('handles malformed search parameters gracefully', () => {
      mockUseRouteResources.mockReturnValue({
        ...defaultRouteResources,
        searchParamsString: 'invalid=params&malformed',
      })

      expect(() => renderWithContext()).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      renderWithContext()

      // Check for proper form controls
      expect(screen.getByLabelText('GitHub repository')).toBeInTheDocument()
      expect(
        screen.getByRole('combobox', { name: /theme/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('combobox', { name: /font/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('combobox', { name: /background pattern/i })
      ).toBeInTheDocument()
    })

    it('has proper checkbox accessibility', () => {
      renderWithContext()

      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBeGreaterThan(0)

      // Each checkbox should have an accessible name
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveAccessibleName()
      })
    })
  })

  describe('Integration with RepositoryInput', () => {
    it('renders RepositoryInput component with correct props', () => {
      renderWithContext()

      expect(screen.getByDisplayValue('testowner/testrepo')).toBeInTheDocument()
      expect(screen.getByLabelText('Switch to repository')).toBeInTheDocument()
    })
  })
})
