import { type Context, createContext } from 'react'

import { DEFAULT_CONFIG } from '@/common/configHelper'
import type Configuration from '@/common/types/configType'

type ConfigContextType = {
  config: Configuration
  setConfig: (config: Configuration) => void
}

const ConfigContext: Context<ConfigContextType> = createContext({
  config: DEFAULT_CONFIG,
  setConfig: (_config: Configuration) => {
    // Placeholder
  },
})

export default ConfigContext
