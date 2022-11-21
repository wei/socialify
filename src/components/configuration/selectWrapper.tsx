import ConfigType from '../../../common/types/configType'

type SelectWrapperProps = {
  title: string
  alt?: string
  keyName: keyof ConfigType
  map: { key: string; label: any }[]
  defaultValue: string
  value: string
  handleChange: (value: any, key: keyof ConfigType) => void
}

const SelectWrapper = ({
  title,
  alt,
  keyName,
  map,
  defaultValue,
  value,
  handleChange
}: SelectWrapperProps) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{title}</span>
        {alt && <span className="label-text-alt">{alt}</span>}
      </label>
      <select
        className="select select-bordered select-sm"
        onChange={(e) => {
          handleChange({ val: e.target.value, required: true }, keyName)
        }}
        defaultValue={defaultValue}
        value={value}>
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
