import { useRouter } from 'next/navigation'
import { FormEvent, JSX, useRef, useState } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'

import toast from '@/src/components/toaster'

interface RepositoryInputProps {
  currentRepository: {
    owner: { login: string }
    name: string
  }
  currentSearchParams: string
}

export default function RepositoryInput({
  currentRepository,
  currentSearchParams,
}: RepositoryInputProps): JSX.Element {
  const clientRouter = useRouter()
  const currentRepoString = `${currentRepository.owner.login}/${currentRepository.name}`
  const [repoInput, setRepoInput] = useState(currentRepoString)
  const inputRef = useRef<HTMLInputElement>(null)

  const switchRepository = async (repoUrl: string) => {
    const { groups: { owner, name } = {} } =
      repoUrl.match(
        /^(https?:\/\/github\.com\/)?(?<owner>[^/]+)\/(?<name>[^/]+).*/
      ) ?? {}

    if (!owner || !name) {
      toast.warning('Please enter a valid GitHub repository.')
      return
    }

    const newRepoString = `${owner}/${name}`

    // Don't switch if it's the same repository
    if (newRepoString.toLowerCase() === currentRepoString.toLowerCase()) {
      toast.info('You are already viewing this repository.')
      return
    }

    const newUrl = `/${owner}/${name}${currentSearchParams ? `?${currentSearchParams}` : ''}`
    clientRouter.push(newUrl)
  }

  const handleFocus = () => {
    // Select all text when input gains focus
    if (inputRef.current) {
      inputRef.current.select()
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (repoInput.trim()) {
      switchRepository(repoInput.trim())
    }
  }

  return (
    <div className="form-control w-full">
      <label className="label" htmlFor="repository-input">
        <span className="label-text font-semibold">Repository</span>
      </label>

      <form onSubmit={onSubmit}>
        <div className="join w-full focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50">
          <div className="join-item flex items-center pl-3 bg-base-100 border border-base-300 focus-within:border-primary">
            <FiGithub className="w-4 h-4" aria-hidden="true" />
          </div>
          <input
            ref={inputRef}
            id="repository-input"
            name="repository-input"
            className="join-item input input-sm input-bordered flex-grow text-sm font-bold focus:outline-none border-0 focus:ring-0"
            type="text"
            value={repoInput}
            onChange={(e) => setRepoInput(e.target.value)}
            onFocus={handleFocus}
            aria-label="GitHub repository"
          />
          <button
            aria-label="Switch to repository"
            className="join-item btn btn-sm px-2 btn-primary flex-shrink-0"
            type="submit"
          >
            <FaArrowCircleRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
