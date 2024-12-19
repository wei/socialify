import type ConfigType from '@/common/types/configType'

interface SelectWrapperProps {
  title: string
  alt?: string
  keyName: keyof ConfigType
  map: { key: string; label: any }[]
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
    <div className="form-control w-full">
      <label className="label" htmlFor={selectId}>
        <span className="label-text font-semibold">{title}</span>
        {alt && <span className="label-text-alt font-semibold">{alt}</span>}
      </label>
      <select
        id={selectId}
        className="select select-bordered select-sm font-semibold"
        onChange={(e) => {
          handleChange({ val: e.target.value, required: true }, keyName)
        }}
        name={keyName}
        value={value}
        aria-labelledby={selectId}
      >
        {map.map(({ key, label }) => {
          return (
            <option key={key} value={label}>
              {label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default SelectWrapper
