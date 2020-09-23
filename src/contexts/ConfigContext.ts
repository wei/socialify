import React from 'react'

import Configuration from '../types/configType'

type ConfigContextType = {
  config?: Configuration
  setConfig: (config?: Configuration) => void
}

const ConfigContext: React.Context<ConfigContextType> = React.createContext({
  setConfig: () => {}
})

export default ConfigContext
