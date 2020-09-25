import React from 'react'

import Configuration, {
  Font,
  Pattern,
  Theme,
  FileType
} from '../types/configType'

type ConfigContextType = {
  config: Configuration
  setConfig: (config: Configuration) => void
}

const defaultConfig: Configuration = {
  name: '',
  font: Font.inter,
  theme: Theme.light,
  pattern: Pattern.circuitBoard,
  fileType: FileType.png
}

const ConfigContext: React.Context<ConfigContextType> = React.createContext({
  config: defaultConfig,
  setConfig: (config: Configuration) => {}
})

export default ConfigContext
