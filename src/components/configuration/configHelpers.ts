export function objectifySearchParamsString(
  searchParamsString: string
): Record<string, string> {
  const params = new URLSearchParams(searchParamsString)
  const obj: Record<string, string> = {}
  for (const [key, value] of params.entries()) {
    obj[key] = value
  }
  return obj
}
