import { JSX } from 'react'

import { autoThemeCss } from '@/common/helpers'
import type Configuration from '@/common/types/configType'
import { Theme } from '@/common/types/configType'
import Card from '@/src/components/preview/card'

export default function CardThemeWrapper(config: Configuration): JSX.Element {
  if (config.theme === Theme.auto) {
    return (
      <>
        <style>{autoThemeCss}</style>
        <div className="card-light">
          <Card {...config} theme={Theme.light} />
        </div>
        <div className="card-dark">
          <Card {...config} theme={Theme.dark} />
        </div>
      </>
    )
  }
  return <Card {...config} />
}
