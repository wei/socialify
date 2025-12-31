import type ConfigType from '@/common/types/configType'

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
  handleChange,
}: CheckBoxProps) => {
  return (
    <fieldset className="fieldset">
      <label
        className="label cursor-pointer justify-start gap-2"
        htmlFor={keyName}
      >
        <input
          id={keyName}
          name={keyName}
          className="checkbox checkbox-sm"
          type="checkbox"
          checked={!!checked}
          disabled={disabled}
          onChange={(e) => {
            handleChange({ state: e.target.checked }, keyName)
          }}
          aria-disabled={disabled}
          aria-checked={!!checked}
          aria-labelledby={`${keyName}-title`}
        />
        <span className="font-semibold" id={`${keyName}-title`}>
          {title}
        </span>
      </label>
    </fieldset>
  )
}

export default CheckBoxWrapper
