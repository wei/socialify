import React from 'react'

import RepoType from '../types/repoType'

type RepoContextType = {
  repo?: RepoType
  setRepo: (repo?: RepoType) => void
}

const RepoContext: React.Context<RepoContextType> = React.createContext({
  setRepo: () => {}
})

export default RepoContext
