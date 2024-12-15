import { JSX } from 'react'

import { getHeroPattern, getSimpleIconsImageURI } from '@/common/helpers'
import type Configuration from '@/common/types/configType'
import Badge from '@/src/components/preview/badge'

export default function Card(config: Configuration): JSX.Element {
  const backgroundPatternStyles = getHeroPattern(config.pattern, config.theme)

  const languageIconImageURI =
    config.language?.state &&
    getSimpleIconsImageURI(config.language.value, config.theme)

  const displayName = [
    config.owner?.state && config.owner?.value,
    config.name?.state && config.name?.value,
  ]
    .filter((value) => typeof value === 'string')
    .join('/')
  const nameLength = displayName.length
  const nameFontSize =
    nameLength > 55
      ? '17px'
      : nameLength > 45
        ? '20px'
        : nameLength > 35
          ? '24px'
          : nameLength > 25
            ? '30px'
            : '40px'

  return (
    <div
      className={`card-wrapper theme-${config.theme.toLowerCase()}`}
      style={{
        width: 640,
        height: 320,
        padding: '10px 30px',
        fontFamily: config.font,
        fontWeight: 400,
        ...backgroundPatternStyles,
        color: config.theme.match(/dark/i) ? '#fff' : '#000',
        textAlign: 'center',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'scale(2)',
        transformOrigin: 'top left',
      }}
    >
      {/* Logo */}
      <div
        className="card-logo-wrapper"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <img
          src={config.logo || getSimpleIconsImageURI('GitHub', config.theme)}
          alt="Logo"
          width={100}
          height={100}
          style={{
            objectFit: 'contain',
          }}
        />
        {languageIconImageURI && (
          <p
            className="card-logo-divider"
            style={{
              color: '#bbb',
              fontSize: 30,
              margin: '0 20px',
              fontFamily: 'Jost',
            }}
          >
            +
          </p>
        )}
        {languageIconImageURI && (
          <img
            src={languageIconImageURI}
            alt={config?.language?.value}
            width={85}
            height={85}
            style={{
              objectFit: 'contain',
            }}
          />
        )}
      </div>

      {/* Name */}
      <p
        className="card-name-wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 15,
          marginBottom: 0,
          fontWeight: 500,
          fontSize: nameFontSize,
          lineHeight: 1.4,
        }}
      >
        <span
          className="card-name-owner"
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            fontWeight: 200,
          }}
        >
          {config.owner?.state
            ? `${config.owner.value}${config.name?.state ? '/' : ''}`
            : ''}
        </span>
        <span
          className="card-name-name"
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
          }}
        >
          {config.name?.state ? `${config.name.value}` : ''}
        </span>
      </p>

      {/* Description */}
      {config.description?.state && (
        <p
          className="card-description-wrapper"
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: 10,
            marginBottom: 0,
            fontSize: 17,
            lineHeight: 1.4,
            maxHeight: '3em',
            overflow: 'hidden',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          {config.description.value}
        </p>
      )}

      {/* Badges */}
      {(config.stargazers?.state ||
        config.forks?.state ||
        config.issues?.state ||
        config.pulls?.state) && (
        <div
          className="card-badges-wrapper"
          style={{
            marginTop: 25,
            marginBottom: 0,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {config.stargazers?.state && (
            <Badge
              name="stars"
              value={`${config.stargazers.value}`}
              color="#dfb317"
            />
          )}
          {config.forks?.state && (
            <Badge
              name="forks"
              value={`${config.forks.value}`}
              color="#97ca00"
            />
          )}
          {config.issues?.state && (
            <Badge
              name="issues"
              value={`${config.issues.value}`}
              color="#007ec6"
            />
          )}
          {config.pulls?.state && (
            <Badge
              name="pulls"
              value={`${config.pulls.value}`}
              color="#fe7d37"
            />
          )}
        </div>
      )}
    </div>
  )
}
