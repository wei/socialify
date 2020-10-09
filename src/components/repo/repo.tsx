import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { Input, Button, notification } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

import styles from './repo.module.css'

const Repo: React.FC = () => {
  const router = useRouter()
  const [repoInput, setRepoInput] = useState('')

  const submitRepo = (repoUrl: string) => {
    const repoMatches = repoUrl.match(
      /^(https?:\/\/github\.com\/)?([^/]+)\/([^/]+).*/
    )
    if (repoMatches) {
      router.push(`/${repoMatches[2]}/${repoMatches[3]}`)
    } else {
      notification.error({
        message: 'Error',
        description: 'Please enter a valid GitHub repository'
      })
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    submitRepo(repoInput)
  }

  return (
    <div className={styles.repoWrapper}>
      <form className={styles.repoInputContainer} onSubmit={onSubmit}>
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
  )
}

export default Repo
