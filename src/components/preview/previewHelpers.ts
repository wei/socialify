import { toClipboard } from 'copee'

import toaster from '@/src/components/toaster'

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface ConstructImageUrlProps {
  type              : 'absolute' | 'relative'
  format            : string
  currentPath       : string
  searchParamsString: string
}

export function constructImageUrl({
  type,
  format,
  currentPath,
  searchParamsString,
}: ConstructImageUrlProps): string {
  const relativeImageUrl: string = `${currentPath}/${format}${searchParamsString.length > 0 ? `?${searchParamsString}` : ''}`

  if (type === 'absolute') {
    return `${window.location.protocol}//${window.location.host}${relativeImageUrl}`
  }

  return relativeImageUrl
}

// -----------------------------------------------------------------------------
export function copyImageUrl(absoluteImageUrl: string): void {
  const success = toClipboard(absoluteImageUrl)
  if (success) {
    toaster.success('Copied image url to clipboard')
  } else {
    window.open(absoluteImageUrl, '_blank')
  }
}

// -----------------------------------------------------------------------------
export function copyMarkdown({
  absoluteImageUrl,
  repoName,
}: { absoluteImageUrl: string; repoName: string }): void {
  const ogTag = `![${repoName}](${absoluteImageUrl})`
  const success = toClipboard(ogTag)
  if (success) {
    toaster.success('Copied markdown to clipboard')
  }
}

// -----------------------------------------------------------------------------
export function copyImageTag({
  absoluteImageUrl,
  repoName,
}: { absoluteImageUrl: string; repoName: string }): void {
  const ogTag = `<img src="${absoluteImageUrl}" alt="${repoName}" width="640" height="320" />`
  const success = toClipboard(ogTag)
  if (success) {
    toaster.success('Copied image tag to clipboard')
  }
}

// -----------------------------------------------------------------------------
export function copyOpenGraphTags(absoluteImageUrl: string): void {
  const ogTag = `
<meta property="og:image" content="${absoluteImageUrl}" />
<meta property="og:image:width" content="1280" />
<meta property="og:image:height" content="640" />
  `.trim()
  const success = toClipboard(ogTag)
  if (success) {
    toaster.success('Copied open graph tags to clipboard')
  }
}

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface HandleDownloadProps {
  defaultRelativeImageUrl: string
  customRelativeImageUrl : string
  fileType               : string
  repoName               : string
}

export function handleDownload({
  defaultRelativeImageUrl,
  customRelativeImageUrl,
  fileType,
  repoName,
}: HandleDownloadProps): () => Promise<void> {
  return async function () {
    toaster.info('Downloading...')

    if (['svg', 'png'].includes(fileType)) {
      // If the file type is svg or png, use the browser's download feature.
      const link = document.createElement('a')
      link.download = `${repoName}.${fileType}`
      link.href = customRelativeImageUrl
      link.click()
    } else {
      // Otherwise use canvas to convert default image to desired format.
      try {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = 1280
          canvas.height = 640
          const context = canvas.getContext('2d')
          if (context && img) {
            context.drawImage(img, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL(`image/${fileType}`)
            const link = document.createElement('a')
            link.download = `${repoName}.${fileType}`
            link.href = dataUrl
            link.click()
          }
        }
        img.src = defaultRelativeImageUrl
      } catch (error) {
        toaster.error('Download failed: Please use a modern browser.')
        console.error(error)
      }
    }
  }
}
