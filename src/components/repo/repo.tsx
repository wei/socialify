import Router from 'next/router'
import React, { FormEvent, useState } from 'react'

import { FaArrowCircleRight } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'

import useAutoFocus from '../hooks/use-autofocus'
import toast from '../toaster'

const Repo: React.FC = () => {
  const repoInputRef = useAutoFocus()
  const [repoInput, setRepoInput] = useState('')

  const submitRepo = (repoUrl: string) => {
    const [, , owner, name] =
      repoUrl.match(/^(https?:\/\/github\.com\/)?([^/]+)\/([^/]+).*/) ?? []
    if (owner && name) {
      Router.push(
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
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-secondary to-secondary-focus">
            Start with a <span className="inline-block">GitHub repo</span>
          </h1>
          <div className="card w-full shadow-2xl bg-base-200">
            <div className="card-body p-0">
              <form aria-labelledby="form-title" onSubmit={onSubmit}>
                <div className="form-control">
                  <div className="input-group">
                    <label htmlFor="repo-input" className="sr-only">
                      GitHub Repository
                    </label>
                    <span aria-hidden="true" className="pr-0 bg-base-200">
                      <FiGithub className="w-6 h-6" />
                    </span>
                    <input
                      id="repo-input"
                      name="repo-input"
                      className="input flex-1 pl-3 font-bold bg-base-200 focus:outline-none"
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
                      className="btn btn-square btn-primary"
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

export default Repo
