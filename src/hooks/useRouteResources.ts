import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'

// biome-ignore format: added alignment for clarity.
export interface RouteResources {
  clientRouter      : ReturnType<typeof useRouter>
  repoOwner         : string
  repoName          : string
  currentPath       : string
  searchParamsString: string
}

export function useRouteResources(): RouteResources {
  const clientRouter = useRouter()
  const { _owner, _name } = useParams()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    // biome-ignore format: added alignment for clarity.
    {
      clientRouter,
      repoOwner         : _owner instanceof Array ? _owner[0]: (_owner ?? ''),
      repoName          : _name instanceof Array ? _name[0]  : (_name ?? ''),
      currentPath       : pathname,
      searchParamsString: searchParams.toString(),
  })
}
