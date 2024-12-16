import { useRouter } from 'next/navigation'
import { FormEvent, JSX, useState } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'

import toast from '@/src/components/toaster'
import useAutoFocus from '@/src/hooks/useAutofocus'

export default function Repo(): JSX.Element {
  const repoInputRef = useAutoFocus()
  const clientRouter = useRouter()
  const [repoInput, setRepoInput] = useState('')

  const submitRepo = (repoUrl: string) => {
    const [, , owner, name] =
      repoUrl.match(/^(https?:\/\/github\.com\/)?([^/]+)\/([^/]+).*/) ?? []
    if (owner && name) {
      clientRouter.push(
        `/${owner}/${name}?language=1&owner=1&name=1&stargazers=1&theme=Light`
      )
    } else {
      toast.warning('Please enter a valid GitHub repository.')
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    submitRepo(repoInput)
  }

  return (
    <main className="hero">
      <div className="hero-content">
        <div className="flex flex-col gap-6 max-w-xxl">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-secondary to-error">
            Start with a <span className="inline-block">GitHub repo</span>
          </h1>
          <div className="card w-full shadow-2xl bg-neutral rounded-lg">
            <div className="card-body p-0">
              <form aria-labelledby="form-title" onSubmit={onSubmit}>
                <div className="form-control">
                  <div className="join flex items-center">
                    <span
                      aria-hidden="true"
                      className="join-item ps-4 flex-shrink-0"
                    >
                      <FiGithub className="w-6 h-6" />
                    </span>
                    <input
                      id="repo-input"
                      name="repo-input"
                      className="join-item input input-ghost flex-grow font-bold focus:outline-none focus:border-none focus:bg-transparent"
                      ref={repoInputRef}
                      type="text"
                      value={repoInput}
                      onChange={(e) => {
                        setRepoInput(e.target.value)
                      }}
                      aria-required="true"
                      aria-label="GitHub repository"
                      required
                    />
                    <button
                      aria-label="Submit GitHub repo input"
                      className="join-item btn btn-square btn-primary flex-shrink-0"
                      type="submit"
                    >
                      <FaArrowCircleRight className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
