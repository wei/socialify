import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vite-plus/test'

import toast from '@/src/components/toaster'

import RepositoryInput from './repositoryInput'

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

vi.mock('@/src/components/toaster', () => ({
  default: { warning: vi.fn(), info: vi.fn() },
}))

const mockPush = vi.fn()
const mockUseRouter = useRouter as Mock

describe('RepositoryInput', () => {
  const defaultProps = {
    currentRepository: {
      owner: { login: 'testowner' },
      name: 'testrepo',
    },
    currentSearchParams: 'theme=Light&language=1',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    })
  })

  describe('Component Rendering', () => {
    it('renders the repository input component correctly', () => {
      render(<RepositoryInput {...defaultProps} />)

      expect(screen.getByLabelText('Repository')).toBeInTheDocument()
      expect(screen.getByLabelText('GitHub repository')).toBeInTheDocument()
      expect(screen.getByLabelText('Switch to repository')).toBeInTheDocument()
    })

    it('renders with correct styling consistency (snapshot)', () => {
      const { container } = render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText('GitHub repository')
      const joinContainer = input.closest('.join')
      const submitButton = screen.getByLabelText('Switch to repository')

      // Test input styling snapshot
      expect(input).toMatchSnapshot('repository-input-field')

      // Test container styling for highlight glow and outline snapshot
      expect(joinContainer).toMatchSnapshot('repository-input-container')

      // Test button styling snapshot
      expect(submitButton).toMatchSnapshot('repository-input-submit-button')

      // Test complete component structure snapshot
      expect(container.firstChild).toMatchSnapshot(
        'repository-input-complete-component'
      )
    })

    it('displays GitHub icon correctly (snapshot)', () => {
      render(<RepositoryInput {...defaultProps} />)

      const iconContainer = screen
        .getByLabelText('GitHub repository')
        .closest('.join')
        ?.querySelector('.join-item')
      expect(iconContainer).toBeInTheDocument()
      expect(iconContainer).toMatchSnapshot(
        'repository-input-github-icon-container'
      )
    })
  })

  describe('Input Pre-population', () => {
    it('pre-populates input with current repository value', () => {
      render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText(
        'GitHub repository'
      ) as HTMLInputElement
      expect(input.value).toBe('testowner/testrepo')
    })

    it('handles different repository formats correctly', () => {
      const propsWithDifferentRepo = {
        ...defaultProps,
        currentRepository: {
          owner: { login: 'different-owner' },
          name: 'different-repo-name',
        },
      }

      render(<RepositoryInput {...propsWithDifferentRepo} />)

      const input = screen.getByLabelText(
        'GitHub repository'
      ) as HTMLInputElement
      expect(input.value).toBe('different-owner/different-repo-name')
    })
  })

  describe('Auto-select on Focus', () => {
    it('auto-selects text when input gains focus', () => {
      render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText(
        'GitHub repository'
      ) as HTMLInputElement

      // Mock the select method
      const selectSpy = vi.spyOn(input, 'select')

      fireEvent.focus(input)

      expect(selectSpy).toHaveBeenCalled()
    })
  })

  describe('Input Validation', () => {
    it('accepts valid GitHub repository format (owner/repo)', () => {
      render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText('GitHub repository')
      const submitButton = screen.getByLabelText('Switch to repository')

      fireEvent.change(input, { target: { value: 'validowner/validrepo' } })
      fireEvent.click(submitButton)

      expect(mockPush).toHaveBeenCalledWith(
        '/validowner/validrepo?theme=Light&language=1'
      )
      expect(toast.warning).not.toHaveBeenCalled()
    })

    it('accepts GitHub URLs and extracts owner/repo correctly', () => {
      render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText('GitHub repository')
      const submitButton = screen.getByLabelText('Switch to repository')

      fireEvent.change(input, {
        target: { value: 'https://github.com/facebook/react' },
      })
      fireEvent.click(submitButton)

      expect(mockPush).toHaveBeenCalledWith(
        '/facebook/react?theme=Light&language=1'
      )
      expect(toast.warning).not.toHaveBeenCalled()
    })

    it('shows warning for invalid repository format', () => {
      render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText('GitHub repository')
      const submitButton = screen.getByLabelText('Switch to repository')

      fireEvent.change(input, { target: { value: 'invalid-format' } })
      fireEvent.click(submitButton)

      expect(toast.warning).toHaveBeenCalledWith(
        'Please enter a valid GitHub repository.'
      )
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('does not navigate when input is empty or whitespace only', () => {
      render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText('GitHub repository')
      const submitButton = screen.getByLabelText('Switch to repository')

      fireEvent.change(input, { target: { value: '   ' } }) // whitespace only
      fireEvent.click(submitButton)

      // Should not call navigation or show warning for empty input
      expect(mockPush).not.toHaveBeenCalled()
      expect(toast.warning).not.toHaveBeenCalled()
    })

    it('shows info message when trying to switch to same repository', () => {
      render(<RepositoryInput {...defaultProps} />)

      const submitButton = screen.getByLabelText('Switch to repository')

      // Input is already pre-populated with current repo
      fireEvent.click(submitButton)

      expect(toast.info).toHaveBeenCalledWith(
        'You are already viewing this repository.'
      )
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('handles case-insensitive repository comparison', () => {
      render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText('GitHub repository')
      const submitButton = screen.getByLabelText('Switch to repository')

      fireEvent.change(input, { target: { value: 'TESTOWNER/TESTREPO' } })
      fireEvent.click(submitButton)

      expect(toast.info).toHaveBeenCalledWith(
        'You are already viewing this repository.'
      )
      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('User Interaction Flows', () => {
    it('handles typing in input field correctly', () => {
      render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText(
        'GitHub repository'
      ) as HTMLInputElement

      fireEvent.change(input, { target: { value: 'newowner/newrepo' } })

      expect(input.value).toBe('newowner/newrepo')
    })

    it('handles form submission via Enter key', () => {
      render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText('GitHub repository')
      const form = input.closest('form')!

      fireEvent.change(input, {
        target: { value: 'keyboardowner/keyboardrepo' },
      })
      fireEvent.submit(form)

      expect(mockPush).toHaveBeenCalledWith(
        '/keyboardowner/keyboardrepo?theme=Light&language=1'
      )
    })

    it('preserves search parameters when switching repositories', () => {
      const propsWithParams = {
        ...defaultProps,
        currentSearchParams: 'theme=Dark&font=Inter&language=1&owner=1',
      }

      render(<RepositoryInput {...propsWithParams} />)

      const input = screen.getByLabelText('GitHub repository')
      const submitButton = screen.getByLabelText('Switch to repository')

      fireEvent.change(input, { target: { value: 'newowner/newrepo' } })
      fireEvent.click(submitButton)

      expect(mockPush).toHaveBeenCalledWith(
        '/newowner/newrepo?theme=Dark&font=Inter&language=1&owner=1'
      )
    })

    it('handles empty search parameters correctly', () => {
      const propsWithoutParams = {
        ...defaultProps,
        currentSearchParams: '',
      }

      render(<RepositoryInput {...propsWithoutParams} />)

      const input = screen.getByLabelText('GitHub repository')
      const submitButton = screen.getByLabelText('Switch to repository')

      fireEvent.change(input, { target: { value: 'newowner/newrepo' } })
      fireEvent.click(submitButton)

      expect(mockPush).toHaveBeenCalledWith('/newowner/newrepo')
    })
  })

  describe('Edge Cases', () => {
    it('handles repository names with special characters', () => {
      render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText('GitHub repository')
      const submitButton = screen.getByLabelText('Switch to repository')

      fireEvent.change(input, {
        target: { value: 'owner/repo-with-dashes_and_underscores.dots' },
      })
      fireEvent.click(submitButton)

      expect(mockPush).toHaveBeenCalledWith(
        '/owner/repo-with-dashes_and_underscores.dots?theme=Light&language=1'
      )
    })

    it('trims whitespace from input', () => {
      render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText('GitHub repository')
      const submitButton = screen.getByLabelText('Switch to repository')

      fireEvent.change(input, { target: { value: '  owner/repo  ' } })
      fireEvent.click(submitButton)

      expect(mockPush).toHaveBeenCalledWith(
        '/owner/repo?theme=Light&language=1'
      )
    })

    it('handles GitHub URLs with additional path segments', () => {
      render(<RepositoryInput {...defaultProps} />)

      const input = screen.getByLabelText('GitHub repository')
      const submitButton = screen.getByLabelText('Switch to repository')

      fireEvent.change(input, {
        target: { value: 'https://github.com/owner/repo/issues/123' },
      })
      fireEvent.click(submitButton)

      expect(mockPush).toHaveBeenCalledWith(
        '/owner/repo?theme=Light&language=1'
      )
    })
  })
})
