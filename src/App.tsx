import React, { useState, useEffect } from 'react'

import './App.css'

import RepoType from './types/repoType'
import RepoContext from './contexts/RepoContext'
import Repo from './components/repo/repo'
import MainRenderer from './components/mainRenderer'

const App = () => {
  const [repo, setRepo] = useState<RepoType | undefined>(undefined)
  const setRepoHelper = (repo?: RepoType) => {
    setRepo(repo)
  }

  useEffect(() => {
    // TODO: Check query string and call setRepo if applicable
  }, [])

  return (
    <RepoContext.Provider value={{ repo, setRepo: setRepoHelper }}>
      {!repo ? <Repo /> : <MainRenderer />}
    </RepoContext.Provider>
  )
}

export default App
