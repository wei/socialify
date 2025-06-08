import { Theme } from '@/common/types/configType'
import { LANGUAGE_ICON_MAPPING } from './languageMapping'

export const getSimpleIconsImageURI = function (
  language: string,
  theme: Theme
) {
  const icon = LANGUAGE_ICON_MAPPING[language]
  if (!icon) return undefined

  let iconColor = theme === Theme.light ? `#${icon.hex}` : '#ffffff'
  if (theme === Theme.light && iconColor.match(/#f{3,6}/i)) {
    iconColor = '#000000'
  } else if (theme === Theme.dark && iconColor.match(/#0{3,6}/)) {
    iconColor = '#ffffff'
  }
  const iconSvg = icon.svg.replace('<svg ', `<svg fill="${iconColor}" `)

  return `data:image/svg+xml,${encodeURIComponent(iconSvg)}`
}
