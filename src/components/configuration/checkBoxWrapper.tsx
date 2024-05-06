import ConfigType from '../../../common/types/configType'

type CheckBoxProps = {
  title: string
  keyName: keyof ConfigType
  checked?: boolean
  disabled?: boolean

  handleChange: (value: any, key: keyof ConfigType) => void
}

const CheckBoxWrapper = ({
  title,
  keyName,
  checked,
  disabled,
  handleChange
}: CheckBoxProps) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-2">
        <input
          className="checkbox checkbox-sm"
          type="checkbox"
          checked={!!checked}
          disabled={disabled}
          onChange={(e) => {
            handleChange({ state: e.target.checked }, keyName)
          }}
        />
        <span className="label-text">{title}</span>
      </label>
    </div>
  )
}

export default CheckBoxWrapper
