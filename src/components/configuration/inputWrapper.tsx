import type ConfigType from '@/common/types/configType'
import clsx from 'clsx'

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
}: InputProps) => {
  return (
    <div className="form-control w-full" data-input-key={keyName}>
      <label className="label">
        <span className="label-text font-semibold">{title}</span>
        {alt && <span className="label-text-alt font-semibold">{alt}</span>}
      </label>
      <input
        className={clsx('input input-sm input-bordered font-semibold w-full', {
          'input-error': error,
        })}
        type="text"
        value={value || ''}
        disabled={!!disabled}
        placeholder={placeholder}
        onChange={(e) => {
          handleChange({ val: e.target.value, required: true }, keyName)
        }}
        maxLength={maxlen}
      />
      {error && (
        <div className="label">
          <span className="label-text-alt text-red-400">{error}</span>
        </div>
      )}
    </div>
  )
}
export default InputWrapper
