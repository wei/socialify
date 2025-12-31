import clsx from 'clsx'
import { type ChangeEvent, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import type ConfigType from '@/common/types/configType'

export type InputProps = {
  title: string
  alt?: string
  keyName: keyof ConfigType
  value: string
  placeholder: string
  disabled?: boolean
  handleChange: (value: any, key: keyof ConfigType) => void
  error?: string
  maxlen?: number
  debounceMs?: number
}

const InputWrapper = ({
  title,
  alt,
  keyName,
  value,
  placeholder,
  disabled,
  handleChange,
  error,
  maxlen,
  debounceMs,
}: InputProps) => {
  const [internalValue, setInternalValue] = useState(value)

  // Create debounced callback if debounceMs is provided
  const debouncedHandleChange = useDebouncedCallback((newValue: string) => {
    handleChange({ val: newValue, required: true }, keyName)
  }, debounceMs || 0)

  // Sync internal value when external value changes (e.g., from URL params)
  useEffect(() => {
    setInternalValue(value)
  }, [value])

  const processChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (debounceMs) {
      // Use internal state for immediate visual feedback and debounced external updates
      setInternalValue(newValue)
      debouncedHandleChange(newValue)
    } else {
      // Use direct updates for non-debounced inputs (backward compatibility)
      handleChange({ val: newValue, required: true }, keyName)
    }
  }

  return (
    <div className="form-control w-full" data-input-key={keyName}>
      <label className="label" htmlFor={keyName}>
        <span className="label-text font-semibold" id={`${keyName}-title`}>
          {title}
        </span>
        {alt && (
          <span className="label-text-alt font-semibold" id={`${keyName}-alt`}>
            {alt}
          </span>
        )}
      </label>
      <input
        className={clsx('input input-sm input-bordered font-semibold w-full', {
          'input-error': error,
        })}
        id={keyName}
        name={keyName}
        type="text"
        value={debounceMs ? internalValue || '' : value || ''}
        disabled={!!disabled}
        placeholder={placeholder}
        onChange={processChange}
        maxLength={maxlen}
        aria-labelledby={`${keyName}-title ${alt ? `${keyName}-alt` : ''}`}
        aria-invalid={!!error}
      />
      {error && (
        <div className="label">
          <span className="label-text-alt text-red-400" id={`${keyName}-error`}>
            {error}
          </span>
        </div>
      )}
    </div>
  )
}
export default InputWrapper
