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
    config.language && getDevIconClassName(config.language, config.theme)

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

      <p className="card-name-wrapper">
        <span className="card-name-owner">
          {config.owner ? `${config.owner}/` : ''}
        </span>
        <span>{config.name}</span>
      </p>

      {config.description && (
        <p className="card-description-wrapper">{config.description}</p>
      )}

      {(config.stargazers || config.forks || config.issues || config.pulls) && (
        <div className="card-badges-wrapper">
          {config.stargazers && (
            <Badge
              name="stars"
              value={`${config.stargazers}`}
              color="#dfb317"
            />
          )}
          {config.forks && (
            <Badge name="forks" value={`${config.forks}`} color="#97ca00" />
          )}
          {config.issues && (
            <Badge name="issues" value={`${config.issues}`} color="#007ec6" />
          )}
          {config.pulls && (
            <Badge name="pulls" value={`${config.pulls}`} color="#fe7d37" />
          )}
        </div>
      )}
    </figure>
  )
}

export default Card
