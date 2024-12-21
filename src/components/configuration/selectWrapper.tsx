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
        <span className="label-text font-semibold" id={`${selectId}-title`}>
          {title}
        </span>
        {alt && (
          <span className="label-text-alt font-semibold" id={`${selectId}-alt`}>
            {alt}
          </span>
        )}
      </label>
      <select
        id={selectId}
        name={keyName}
        className="select select-bordered select-sm font-semibold"
        onChange={(e) => {
          handleChange({ val: e.target.value, required: true }, keyName)
        }}
        value={value}
        aria-labelledby={`${selectId}-title ${alt ? `${selectId}-alt` : ''}`}
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
