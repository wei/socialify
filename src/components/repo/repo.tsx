import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { Input, Button, notification } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

const Repo: React.FC = () => {
  const router = useRouter()
  const [repoInput, setRepoInput] = useState('')

  const submitRepo = (repoUrl: string) => {
    const repoMatches = repoUrl.match(
      /^(https?:\/\/github\.com\/)?([^/]+)\/([^/]+).*/
    )
    if (repoMatches) {
      router.push(
        `/${repoMatches[2]}/${repoMatches[3]}?language=1&owner=1&name=1&stargazers=1&theme=Light`
      )
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
    <section>
      <form onSubmit={onSubmit}>
        <Input
          value={repoInput}
          onChange={(e) => {
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

      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          min-height: 80vh;
          justify-content: center;
          align-items: center;
        }

        form {
          width: 40vw;
          min-width: 300px;
        }
      `}</style>
    </section>
  )
}

export default Repo
