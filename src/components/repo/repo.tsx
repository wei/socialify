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
          <h1 className="text-5xl font-extrabold text-secondary">
            Start with a <span className="inline-block">GitHub repo</span>
          </h1>
          <div className="card w-full shadow-2xl bg-base-200">
            <div className="card-body p-0">
              <form onSubmit={onSubmit}>
                <div className="form-control">
                  <div className="input-group flex items-center">
                    <span className="pe-0 ms-4 bg-base-200 flex-shrink-0">
                      <FiGithub className="w-6 h-6" />
                    </span>
                    <input
                      className="input flex-1 ps-4 font-bold bg-base-200 outline-none focus:outline-none focus:border-0"
                      ref={repoInputRef}
                      type="text"
                      placeholder="wei/socialify"
                      value={repoInput}
                      onChange={(e) => {
                        setRepoInput(e.target.value)
                      }}
                    />
                    <button className="btn btn-square btn-primary flex-shrink-0">
                      <FaArrowCircleRight className="h-6 w-6 fill-white stroke-current" />
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
