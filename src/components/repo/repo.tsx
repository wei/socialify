import React, { FormEvent, useState } from 'react'

import { Input, Button, Alert } from 'antd'

import { GithubOutlined } from '@ant-design/icons'

import './repo.css'

const Repo: React.FC = () => {
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
    window.location.pathname = `/${repoMatches[2]}/${repoMatches[3]}`
  }

  const onSubmit = (e?: FormEvent) => {
    // eslint-disable-next-line no-unused-expressions
    e?.preventDefault()

    submitRepo(repoInput)
  }

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
