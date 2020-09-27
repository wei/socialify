import React, { useState, useEffect } from 'react'
import Badge from './badge'

import Configuration from '../../types/configType'

import { getDevIconClassName, getHeroPattern } from './preview-helpers'
import './card.css'

const Card: React.FC<Configuration> = config => {
  const [backgroundPattern, setBackgroundPattern] = useState('')

  useEffect(() => {
    setBackgroundPattern(getHeroPattern(config.pattern, config.theme))
  }, [config.pattern, config.theme])

  const languageIcon =
    config.language?.state &&
    getDevIconClassName(config.language.value, config.theme)

  const nameLength = `${config.owner?.state ? `${config.owner.value}/` : ''}${
    config.name
  }`.length
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
    <figure
      className={`card-wrapper theme-${config.theme.toLowerCase()}`}
      style={{ fontFamily: config.font, backgroundImage: backgroundPattern }}>
      <link
        href={`https://fonts.googleapis.com/css2?family=${config.font}:wght@200;400;500&display=swap`}
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.min.css"
      />

      <div className="card-logo-wrapper">
        <i className={getDevIconClassName('GitHub', config.theme)}></i>
        {languageIcon && (
          <>
            <span className="card-logo-divider">+</span>
            <i className={languageIcon}></i>
          </>
        )}
      </div>

      <p className="card-name-wrapper" style={{ fontSize: nameFontSize }}>
        <span className="card-name-owner">
          {config.owner?.state ? `${config.owner.value}/` : ''}
        </span>
        <span>{config.name}</span>
      </p>

      {config.description?.state && (
        <p className="card-description-wrapper">{config.description.value}</p>
      )}

      {(config.stargazers?.state ||
        config.forks?.state ||
        config.issues?.state ||
        config.pulls?.state) && (
        <div className="card-badges-wrapper">
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
    </figure>
  )
}

export default Card
