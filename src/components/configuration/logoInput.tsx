import type ConfigType from '@/common/types/configType'
import { useState } from 'react'
import InputWrapper from './inputWrapper'

type LogoInputProps = {
  title: string
  alt?: string
  keyName: keyof ConfigType
  value: string
  placeholder: string
  disabled?: boolean
  handleChange: (value: any, key: keyof ConfigType) => void
  error?: string
  maxlen?: number
}

const LogoInput = ({
  title,
  alt,
  keyName,
  value,
  placeholder,
  disabled,
  handleChange,
  maxlen,
}: LogoInputProps) => {
  const [error, setError] = useState<string | undefined>(undefined)

  const validateLogo = (inputString: string) => {
    setError(undefined)

    if (inputString?.length === 1601) {
      setError('URI is too long, please use an SVG image URL instead.')
    }
  }

  const handleLogoChange = (value: any, key: keyof ConfigType) => {
    validateLogo(value?.val)
    handleChange(value, key)
  }

  return (
    <InputWrapper
      title={title}
      alt={alt}
      keyName={keyName}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      handleChange={handleLogoChange}
      error={error}
      maxlen={maxlen}
    />
  )
}

export default LogoInput
