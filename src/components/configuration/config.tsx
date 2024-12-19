import { JSX, useContext, useEffect } from 'react'

import { getOptionalConfig } from '@/common/configHelper'
import { RepoQueryResponse } from '@/common/github/repoQuery'
import type ConfigType from '@/common/types/configType'
import {
  Font,
  Pattern,
  RequiredConfigsKeys,
  Theme,
} from '@/common/types/configType'
import CheckBoxWrapper from '@/src/components/configuration/checkBoxWrapper'
import { objectifySearchParamsString } from '@/src/components/configuration/configHelpers'
import LogoInput from '@/src/components/configuration/logoInput'
import SelectWrapper from '@/src/components/configuration/selectWrapper'
import TextAreaWrapper from '@/src/components/configuration/textAreaWrapper'
import ConfigContext from '@/src/contexts/ConfigContext'
import {
  type RouteResources,
  useRouteResources,
} from '@/src/hooks/useRouteResources'

interface ConfigProps {
  repository: RepoQueryResponse['repository']
}

interface ConfigChange {
  value: any
  key: keyof ConfigType
}

export default function Config({
  repository,
}: ConfigProps): JSX.Element | null {
  const { config, setConfig } = useContext(ConfigContext)
  const { clientRouter, currentPath, searchParamsString }: RouteResources =
    useRouteResources()

  function handleArrayOfConfigChanges(changeArray: ConfigChange[]): void {
    let newConfig: ConfigType = { ...config }
    const urlParams: Record<string, string> =
      objectifySearchParamsString(searchParamsString)

    changeArray.forEach(({ value, key }) => {
      const currentValue = newConfig[key] ? newConfig[key] : {}
      if (value.required === true) {
        newConfig = { ...newConfig, [key]: value.val }
      } else {
        newConfig = { ...newConfig, [key]: { ...currentValue, ...value } }
      }

      if (value && value.state === true && value.editable) {
        urlParams[key] = '1'
        urlParams[`custom_${key}`] = value.value
      } else if (value && value.state === true) {
        urlParams[key] = '1'
      } else if (value && value.required === true) {
        urlParams[key] = value.val
      } else {
        urlParams[key] = '0'
      }

      if (!urlParams[key] || urlParams[key] === '0') {
        delete urlParams[key]
        if (`custom_${key}` in urlParams) {
          delete urlParams[`custom_${key}`]
        }
      }
    })

    clientRouter.push(
      `${currentPath}?${Object.entries(urlParams)
        .sort()
        .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
        .join('&')}`,
      { scroll: false }
    )
  }

  function handleConfigChange(value: any, key: keyof ConfigType): void {
    handleArrayOfConfigChanges([{ value, key }])
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: only update on searchParamsString change.
  useEffect(() => {
    function handleRouteChange(searchParamsString: string): void {
      if (!repository) return

      const newConfig = getOptionalConfig(repository)

      if (!newConfig) return

      const params = new URLSearchParams(searchParamsString)
      Array.from(params.keys()).forEach((stringKey) => {
        const key = stringKey as keyof ConfigType
        if (key in newConfig) {
          const query = params.get(key)
          const currentConfig = newConfig[key as keyof typeof newConfig]
          const newChange = {
            state: query === '1',
          }
          if (currentConfig?.editable) {
            const editableValue =
              params.get(`custom_${key}`) || params.get(`${key}Editable`)
            if (editableValue != null) {
              Object.assign(newChange, {
                value: editableValue,
              })
            }
          }

          Object.assign(
            newConfig[key as keyof typeof newConfig] ?? {},
            newChange
          )
        } else if (key in RequiredConfigsKeys) {
          const query = params.get(key)
          if (query != null) {
            const newChange = {
              [key]: query,
            }

            Object.assign(newConfig, newChange)
          }
        }
      })
      setConfig({ ...config, ...newConfig })
    }

    handleRouteChange(searchParamsString)
  }, [searchParamsString])

  if (!repository) return null

  return (
    <div className="card w-96 max-w-[90vw] bg-neutral text-primary-content shadow-xl">
      <div className="card-body">
        <SelectWrapper
          title="Theme"
          keyName="theme"
          map={Object.keys(Theme).map((key) => ({
            key,
            label: (Theme as any)[key],
          }))}
          value={config.theme}
          handleChange={handleConfigChange}
        />
        <SelectWrapper
          title="Font"
          keyName="font"
          map={Object.keys(Font).map((key) => ({
            key,
            label: (Font as any)[key],
          }))}
          value={config.font}
          handleChange={handleConfigChange}
        />
        <SelectWrapper
          title="Background Pattern"
          keyName="pattern"
          map={Object.keys(Pattern).map((key) => ({
            key,
            label: (Pattern as any)[key],
          }))}
          value={config.pattern}
          handleChange={handleConfigChange}
        />
        <LogoInput
          title="SVG Logo"
          alt="Image url or data uri"
          keyName="logo"
          placeholder="Optional"
          value={config.logo}
          handleChange={handleConfigChange}
        />

        <div className="columns-2">
          <CheckBoxWrapper
            title="Name"
            keyName="name"
            checked={config.name?.state}
            handleChange={handleConfigChange}
            disabled
          />
          <CheckBoxWrapper
            title="Owner"
            keyName="owner"
            checked={config.owner?.state}
            handleChange={handleConfigChange}
          />
          <CheckBoxWrapper
            title="Language"
            keyName="language"
            checked={config.language?.state}
            handleChange={handleConfigChange}
          />
          <CheckBoxWrapper
            title="Stars"
            keyName="stargazers"
            checked={config.stargazers?.state}
            handleChange={handleConfigChange}
          />
          <CheckBoxWrapper
            title="Forks"
            keyName="forks"
            checked={config.forks?.state}
            handleChange={handleConfigChange}
          />
          <CheckBoxWrapper
            title="Issues"
            keyName="issues"
            checked={config.issues?.state}
            handleChange={handleConfigChange}
          />
          <CheckBoxWrapper
            title="Pull Requests"
            keyName="pulls"
            checked={config.pulls?.state}
            handleChange={handleConfigChange}
          />
          <CheckBoxWrapper
            title="Description"
            keyName="description"
            checked={config.description?.state}
            handleChange={handleConfigChange}
          />
        </div>

        {config.description?.state && (
          <TextAreaWrapper
            title="Description"
            keyName="description"
            value={config.description?.value}
            handleChange={handleConfigChange}
            disabled={!config.description?.state}
          />
        )}
      </div>
    </div>
  )
}
