import InputWrapper, { type InputProps } from './inputWrapper'

const LogoInput = (props: InputProps) => {
  return (
    <InputWrapper
      {...props}
      maxlen={1601}
      error={
        props.value?.length >= 1601
          ? 'URI is too long, please use an SVG image URL instead.'
          : undefined
      }
    />
  )
}

export default LogoInput
