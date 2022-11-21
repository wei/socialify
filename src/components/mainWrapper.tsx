import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import ConfigType from '../../common/types/configType'
import { RepoQueryResponse } from '../../common/github/repoQuery'
import ConfigContext from '../contexts/ConfigContext'
import { DEFAULT_CONFIG } from '../../common/configHelper'

import Config from './configuration/config'
import Preview from './preview/preview'
import toast from './toaster'

type MainWrapperProps = {
  response: RepoQueryResponse
}

const MainWrapper = ({ response }: MainWrapperProps) => {
  const router = useRouter()
  const [config, setConfig] = useState<ConfigType>(DEFAULT_CONFIG)

  const setConfigHelper = (config: ConfigType) => {
    setConfig(config)
  }

  useEffect(() => {
    if (!response || !response.repository) {
      router.push('/')
      toast.error('Please enter a valid GitHub repository.')
    }
  }, [response, router])

  if (response && response.repository) {
    const { repository } = response

    return (
      <ConfigContext.Provider value={{ config, setConfig: setConfigHelper }}>
        <div className="flex flex-col lg:flex-row w-full justify-center items-center lg:justify-evenly">
          <div className="hero w-fit">
            <Preview />
          </div>
          <div className="hero w-fit">
            <Config repository={repository} />
          </div>
        </div>
      </ConfigContext.Provider>
    )
  } else {
    return null
  }
}
export default MainWrapper
