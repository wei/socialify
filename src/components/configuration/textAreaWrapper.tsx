import React, { useEffect, useState } from 'react'

import { useDebouncedCallback } from 'use-debounce'

import ConfigType from '../../../common/types/configType'

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
        <label className="label">
          <span className="label-text">{title}</span>
          {alt && <span className="label-text-alt">{alt}</span>}
        </label>
      )}
      <textarea
        className="textarea textarea-bordered h-20"
        value={internalValue}
        onChange={processChange}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  )
}
export default TextAreaWrapper
