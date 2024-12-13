import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

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
import InputWrapper from '@/src/components/configuration/inputWrapper'
import SelectWrapper from '@/src/components/configuration/selectWrapper'
import TextAreaWrapper from '@/src/components/configuration/textAreaWrapper'
import ConfigContext from '@/src/contexts/ConfigContext'

type ConfigProp = {
  repository: RepoQueryResponse['repository']
}

const Config = ({ repository }: ConfigProp) => {
  const router = useRouter()

  const { config, setConfig } = useContext(ConfigContext)

  const [isSvgUriError, setIsSvgUriError] = useState<boolean>(false)

  const handleChanges = (changes: { value: any; key: keyof ConfigType }[]) => {
    let newConfig: ConfigType = { ...config }
    const urlParams = router.query
    // Remove extraneous params from route
    delete urlParams._owner
    delete urlParams._name
    changes.forEach(({ value, key }) => {
      const currentValue = newConfig[key] ? newConfig[key] : {}
      if (value.required === true) {
        newConfig = { ...newConfig, [key]: value.val }
      } else {
        newConfig = { ...newConfig, [key]: { ...currentValue, ...value } }
      }

      if (value && value.state === true && value.editable) {
        urlParams[key] = '1'
        urlParams[`${key}Editable`] = value.value
      } else if (value && value.state === true) {
        urlParams[key] = '1'
      } else if (value && value.required === true) {
        urlParams[key] = value.val
      } else {
        urlParams[key] = '0'
      }

      if (!urlParams[key] || urlParams[key] === '0') {
        delete urlParams[key]
        if (`${key}Editable` in urlParams) {
          delete urlParams[`${key}Editable`]
        }
      }
    })

    router.push(
      `${window.location.pathname}?${Object.entries(urlParams)
        .sort()
        .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
        .join('&')}`,
      undefined,
      { shallow: true }
    )
  }

  const handleChange = (value: any, key: keyof ConfigType) => {
    if (key === 'logo') {
      setIsSvgUriError(!!value?.val && value?.val?.length > 1600)
    }

    handleChanges([{ value, key }])
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run once
  useEffect(() => {
    const handleRouteChange = (asPath: string) => {
      if (repository) {
        const newConfig = getOptionalConfig(repository)
        if (newConfig) {
          const params = new URLSearchParams(asPath.split('?')[1])

          Array.from(params.keys()).forEach((stringKey) => {
            const key = stringKey as keyof ConfigType
            if (key in newConfig) {
              const query = params.get(key)
              const currentConfig = newConfig[key as keyof typeof newConfig]
              const newChange = {
                state: query === '1',
              }
              if (currentConfig?.editable) {
                const editableValue = params.get(`${key}Editable`)
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
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    handleRouteChange(router.asPath)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  if (!repository) {
    return null
  }

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
          handleChange={handleChange}
        />
        <SelectWrapper
          title="Font"
          keyName="font"
          map={Object.keys(Font).map((key) => ({
            key,
            label: (Font as any)[key],
          }))}
          value={config.font}
          handleChange={handleChange}
        />
        <SelectWrapper
          title="Background Pattern"
          keyName="pattern"
          map={Object.keys(Pattern).map((key) => ({
            key,
            label: (Pattern as any)[key],
          }))}
          value={config.pattern}
          handleChange={handleChange}
        />
        <InputWrapper
          title="SVG Logo"
          alt="Image url or data uri"
          keyName="logo"
          placeholder="Optional"
          value={config.logo}
          handleChange={handleChange}
          isError={isSvgUriError}
          errorMessage="URI is too long, please use an SVG image URL instead."
        />

        <div className="columns-2">
          <CheckBoxWrapper
            title="Name"
            keyName="name"
            checked={config.name?.state}
            handleChange={handleChange}
            disabled
          />
          <CheckBoxWrapper
            title="Owner"
            keyName="owner"
            checked={config.owner?.state}
            handleChange={handleChange}
          />
          <CheckBoxWrapper
            title="Language"
            keyName="language"
            checked={config.language?.state}
            handleChange={handleChange}
          />
          <CheckBoxWrapper
            title="Stars"
            keyName="stargazers"
            checked={config.stargazers?.state}
            handleChange={handleChange}
          />
          <CheckBoxWrapper
            title="Forks"
            keyName="forks"
            checked={config.forks?.state}
            handleChange={handleChange}
          />
          <CheckBoxWrapper
            title="Issues"
            keyName="issues"
            checked={config.issues?.state}
            handleChange={handleChange}
          />
          <CheckBoxWrapper
            title="Pull Requests"
            keyName="pulls"
            checked={config.pulls?.state}
            handleChange={handleChange}
          />
          <CheckBoxWrapper
            title="Description"
            keyName="description"
            checked={config.description?.state}
            handleChange={handleChange}
          />
        </div>

        {config.description?.state && (
          <TextAreaWrapper
            title="Description"
            keyName="description"
            value={config.description?.value}
            handleChange={handleChange}
            disabled={!config.description?.state}
          />
        )}
      </div>
    </div>
  )
}

export default Config
