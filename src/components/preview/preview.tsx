import clsx from 'clsx'
import { JSX, useContext } from 'react'
import { MdContentCopy, MdDownload } from 'react-icons/md'

import { checkWebpSupport, getChessBoardPattern } from '@/common/helpers'
import { Pattern } from '@/common/types/configType'
import CardThemeWrapper from '@/src/components/preview/cardThemeWrapper'
import {
  constructImageUrl,
  copyImageTag,
  copyImageUrl,
  copyMarkdown,
  copyOpenGraphTags,
  handleDownload,
} from '@/src/components/preview/previewHelpers'
import ConfigContext from '@/src/contexts/ConfigContext'
import {
  type RouteResources,
  useRouteResources,
} from '@/src/hooks/useRouteResources'

export default function Preview(): JSX.Element {
  const { config } = useContext(ConfigContext)
  const { repoName, currentPath, searchParamsString }: RouteResources =
    useRouteResources()

  return (
    <section className="mb-3">
      <div
        className={clsx(
          'relative cursor-pointer rounded-lg shadow-2xl overflow-hidden',
          'w-[320px] h-[160px]',
          'min-[384px]:w-[384px] min-[384px]:h-[192px]',
          'min-[400px]:w-[400px] min-[400px]:h-[200px]',
          'min-[480px]:w-[480px] min-[480px]:h-[240px]',
          'min-[640px]:w-[640px] min-[640px]:h-[320px]'
        )}
        onClick={() =>
          copyImageUrl(
            constructImageUrl({
              type: 'absolute',
              format: 'image',
              currentPath,
              searchParamsString,
            })
          )
        }
        style={
          config.pattern === Pattern.transparent
            ? getChessBoardPattern(config.theme)
            : undefined
        }
      >
        <div
          className={clsx(
            'origin-top-left',
            'scale-[0.25]',
            'min-[384px]:scale-[0.3]',
            'min-[400px]:scale-[0.3125]',
            'min-[480px]:scale-[0.375]',
            'min-[640px]:scale-[0.5]'
          )}
        >
          <link
            href="https://fonts.googleapis.com/css2?family=Jost:wght@400&display=swap"
            rel="stylesheet"
          />
          <link
            href={`https://fonts.googleapis.com/css2?family=${config.font}:wght@200;400;500&display=swap`}
            rel="stylesheet"
          />
          <CardThemeWrapper {...config} />
        </div>
        <img
          className="absolute top-0 left-0 w-full h-full opacity-0"
          alt="Card"
          src={constructImageUrl({
            type: 'relative',
            format: 'image',
            currentPath,
            searchParamsString,
          })}
        />
      </div>
      <div className="card mt-3 mx-auto w-fit bg-neutral shadow-xl">
        <div className="card-body px-3 py-2">
          <div
            className={clsx(
              'flex justify-center items-center content-center gap-2'
            )}
          >
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-primary btn-sm gap-1 uppercase font-bold"
              >
                <MdDownload className="w-5 h-5" />
                Download
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-compact p-2 shadow bg-neutral rounded-box w-52"
              >
                {(checkWebpSupport()
                  ? ['svg', 'png', 'jpeg', 'webp']
                  : ['svg', 'png', 'jpeg']
                ).map((fileType) => (
                  <li key={fileType}>
                    <a
                      className="font-bold gap-2"
                      onClick={handleDownload({
                        customRelativeImageUrl: constructImageUrl({
                          type: 'relative',
                          format: fileType,
                          currentPath,
                          searchParamsString,
                        }),
                        fallbackRelativeImageUrl: constructImageUrl({
                          type: 'relative',
                          format: 'image',
                          currentPath,
                          searchParamsString,
                        }),
                        fileType,
                        repoName,
                      })}
                    >
                      <MdDownload className="w-5 h-5" />
                      {`${config.name?.value ?? ''}.${fileType}`}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="join">
              <button
                className="join-item btn btn-sm gap-2 uppercase font-bold"
                onClick={() =>
                  copyImageUrl(
                    constructImageUrl({
                      type: 'absolute',
                      format: 'image',
                      currentPath,
                      searchParamsString,
                    })
                  )
                }
                type="button"
              >
                <MdContentCopy className="w-4 h-4" />
                Url
              </button>
              <button
                className="join-item btn btn-sm hidden sm:inline-flex uppercase font-bold"
                onClick={() =>
                  copyMarkdown({
                    absoluteImageUrl: constructImageUrl({
                      type: 'absolute',
                      format: 'image',
                      currentPath,
                      searchParamsString,
                    }),
                    repoName,
                  })
                }
              >
                Markdown
              </button>
              <button
                className="join-item btn btn-sm hidden sm:inline-flex uppercase font-bold"
                onClick={() =>
                  copyImageTag({
                    absoluteImageUrl: constructImageUrl({
                      type: 'absolute',
                      format: 'image',
                      currentPath,
                      searchParamsString,
                    }),
                    repoName,
                  })
                }
              >
                {'<img />'}
              </button>
              <button
                className="join-item btn btn-sm gap-2 hidden sm:inline-flex uppercase font-bold"
                onClick={() =>
                  copyOpenGraphTags(
                    constructImageUrl({
                      type: 'absolute',
                      format: 'image',
                      currentPath,
                      searchParamsString,
                    })
                  )
                }
              >
                Open Graph
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
