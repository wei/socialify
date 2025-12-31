import type ConfigType from '@/common/types/configType'

interface SelectWrapperProps {
  title: string
  alt?: string
  keyName: keyof ConfigType
  map: { key: string; label: string; disabled?: boolean }[]
  value: string
  handleChange: (value: any, key: keyof ConfigType) => void
}

const SelectWrapper = ({
  title,
  alt,
  keyName,
  map,
  value,
  handleChange,
}: SelectWrapperProps) => {
  const selectId = `${keyName}-select`

  return (
    <fieldset className="fieldset w-full">
      <label
        className="label flex justify-between font-semibold"
        htmlFor={selectId}
      >
        <span id={`${selectId}-title`}>{title}</span>
        {alt && <span id={`${selectId}-alt`}>{alt}</span>}
      </label>
      <select
        id={selectId}
        name={keyName}
        className="select select-sm w-full font-semibold"
        onChange={(e) => {
          handleChange({ val: e.target.value, required: true }, keyName)
        }}
        value={value}
        aria-labelledby={`${selectId}-title ${alt ? `${selectId}-alt` : ''}`}
      >
        {map.map(({ key, label, disabled }) => {
          return (
            <option
              key={key}
              value={label}
              disabled={disabled}
              style={disabled ? { color: '#999', fontStyle: 'italic' } : {}}
            >
              {label}
            </option>
          )
        })}
      </select>
    </fieldset>
  )
}

export default SelectWrapper
