import React, { FormEvent, useContext, useState, useEffect } from 'react'

import RepoContext from '../../contexts/RepoContext'

import { Input, Button, Alert } from 'antd'

import { GithubOutlined } from '@ant-design/icons'

import './repo.css'

const Repo: React.FC = () => {
  const { setRepo } = useContext(RepoContext)
  const [error, setError] = useState('')
  const [repoInput, setRepoInput] = useState('')

  const submitRepo = (repoUrl: string) => {
    const repoMatches = repoUrl.match(
      /^(https?:\/\/github\.com\/)?([^/]+)\/([^/]+).*/
    )
    if (!repoMatches) {
      setError('Invalid GitHub Url')
      return
    }

    setRepo({ owner: repoMatches[2], name: repoMatches[3] })
  }

  const onSubmit = (e?: FormEvent) => {
    // eslint-disable-next-line no-unused-expressions
    e?.preventDefault()

    submitRepo(repoInput)
  }

  useEffect(() => {
    const repoUrl = new URLSearchParams(window.location.search).get('repo')
    if (repoUrl) {
      submitRepo(repoUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="repo-wrapper">
        <form className="repo-input-container" onSubmit={onSubmit}>
          <Input
            value={repoInput}
            onChange={e => {
              setRepoInput(e.target.value)
            }}
            prefix={<GithubOutlined />}
            suffix={
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            }
            placeholder="Enter GitHub Repo Link Here!"
          />
        </form>
        {error !== '' ? <Alert message={error} type="error" /> : null}
      </div>
    </>
  )
}

export default Repo
