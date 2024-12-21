import React, { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import type ConfigType from '@/common/types/configType'

type TextAreaProps = {
  title?: string
  alt?: string
  value: string
  placeholder?: string
  keyName: keyof ConfigType
  handleChange: (value: any, key: keyof ConfigType) => void
  disabled?: boolean
}

const TextAreaWrapper = ({
  title,
  alt,
  keyName,
  value,
  placeholder,
  handleChange,
  disabled,
}: TextAreaProps) => {
  const [internalValue, setInternalValue] = useState(value)

  const debounced = useDebouncedCallback((value) => {
    handleChange({ value, editable: true, state: true }, keyName)
  }, 500)

  const processChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value)
    debounced(e.target.value)
  }

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  return (
    <div className="form-control">
      {title && (
        <label className="label" htmlFor={keyName}>
          <span className="label-text font-semibold" id={`${keyName}-title`}>
            {title}
          </span>
          {alt && (
            <span
              className="label-text-alt font-semibold"
              id={`${keyName}-alt`}
            >
              {alt}
            </span>
          )}
        </label>
      )}
      <textarea
        id={keyName}
        name={keyName}
        className="textarea textarea-bordered h-20 font-semibold"
        value={internalValue}
        onChange={processChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-disabled={disabled}
        aria-labelledby={`${keyName}-title ${alt ? `${keyName}-alt` : ''}`}
      />
    </div>
  )
}
export default TextAreaWrapper
