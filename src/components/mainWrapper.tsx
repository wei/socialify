import { useRouter } from 'next/navigation'
import { JSX, useEffect, useState } from 'react'

import { DEFAULT_CONFIG } from '@/common/configHelper'
import type { RepoQueryResponse } from '@/common/github/repoQuery'
import type ConfigType from '@/common/types/configType'
import Config from '@/src/components/configuration/config'
import Preview from '@/src/components/preview/preview'
import toast from '@/src/components/toaster'
import ConfigContext from '@/src/contexts/ConfigContext'

export default function MainWrapper({
  response,
}: Readonly<{ response: RepoQueryResponse }>): JSX.Element | null {
  const clientRouter = useRouter()
  const [config, setConfig] = useState<ConfigType>(DEFAULT_CONFIG)

  const setConfigHelper = (config: ConfigType) => {
    setConfig(config)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: clientRouter not included in dependencies to prevent infinite loop.
  useEffect(() => {
    if (!response || !response.repository) {
      clientRouter.push('/')
      toast.error('Please enter a valid GitHub repository.')
    }
  }, [response])

  if (!response || !response.repository) return null

  const { repository }: RepoQueryResponse = response

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
}
