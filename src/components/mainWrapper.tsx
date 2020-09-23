import React, { useState } from 'react'

import ConfigType from '../types/configType'
import ConfigContext from '../contexts/ConfigContext'

import Config from './configuration/config'
import Preview from './preview/preview'

import { mainRendererQueryResponse } from './__generated__/mainRendererQuery.graphql'

type MainWrapperProps = {
  response: mainRendererQueryResponse | null
}

const MainWrapper = ({ response }: MainWrapperProps) => {
  const [config, setConfig] = useState<ConfigType | undefined>(undefined)

  const setConfigHelper = (config?: ConfigType) => {
    setConfig(config)
  }

  if (!response) {
    return <div>Error fetching github repository details</div>
  }

  // const { repository } = response

  return (
    <ConfigContext.Provider value={{ config, setConfig: setConfigHelper }}>
      <main>
        <Config></Config>
        <Preview></Preview>
      </main>
    </ConfigContext.Provider>
  )
}
export default MainWrapper
