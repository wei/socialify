import React from 'react'

import { DEFAULT_CONFIG } from '../../common/configHelper'
import Configuration from '../../common/types/configType'

type ConfigContextType = {
  config: Configuration
  setConfig: (config: Configuration) => void
}

const ConfigContext: React.Context<ConfigContextType> = React.createContext({
  config: DEFAULT_CONFIG,
  setConfig: (config: Configuration) => {}
})

export default ConfigContext
