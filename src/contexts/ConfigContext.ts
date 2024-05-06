// NextJS essential imports.
import React from 'react'

// Local imports.
import { DEFAULT_CONFIG } from '../../common/configHelper'
import type Configuration from '../../common/types/configType'

type ConfigContextType = {
  config: Configuration
  setConfig: (config: Configuration) => void
}

const ConfigContext: React.Context<ConfigContextType> = React.createContext({
  config: DEFAULT_CONFIG,
  setConfig: (_config: Configuration) => {}
})

export default ConfigContext
