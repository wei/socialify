import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Input, Button, notification } from 'antd'

import { GithubOutlined } from '@ant-design/icons'

import './repo.css'

const Repo: React.FC = () => {
  const history = useHistory()
  const [repoInput, setRepoInput] = useState('')

  const submitRepo = (repoUrl: string) => {
    const repoMatches = repoUrl.match(
      /^(https?:\/\/github\.com\/)?([^/]+)\/([^/]+).*/
    )
    if (repoMatches) {
      history.push(`/${repoMatches[2]}/${repoMatches[3]}`)
    } else {
      notification.error({
        message: 'Error',
        description: 'Please enter a valid GitHub repository'
      })
    }
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
            autoFocus
            placeholder="Enter GitHub repo"
          />
        </form>
      </div>
    </>
  )
}

export default Repo
