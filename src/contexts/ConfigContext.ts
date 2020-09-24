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
  font: Font.Inter,
  theme: Theme.Light,
  pattern: Pattern.Circuit_Board,
  fileType: FileType.PNG
}

const ConfigContext: React.Context<ConfigContextType> = React.createContext({
  config: defaultConfig,
  setConfig: (config: Configuration) => {}
})

export default ConfigContext
