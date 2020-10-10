import React from 'react'
import { defaultConfig } from '../../common/defaultConfig'

import Configuration from '../../common/types/configType'

type ConfigContextType = {
  config: Configuration
  setConfig: (config: Configuration) => void
}

const ConfigContext: React.Context<ConfigContextType> = React.createContext({
  config: defaultConfig,
  setConfig: (config: Configuration) => {}
})

export default ConfigContext
