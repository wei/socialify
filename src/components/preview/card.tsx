import React, { useState, useEffect } from 'react'

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
        href={`https://fonts.googleapis.com/css2?family=${config.font}:wght@400;500&display=swap`}
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

      <p className="card-name-wrapper">{`${
        config.owner ? `${config.owner}/` : ''
      }${config.name}`}</p>

      {config.description && (
        <p className="card-description-wrapper">{config.description}</p>
      )}

      {(config.stargazers || config.forks || config.issues || config.pulls) && (
        <div className="card-badges-wrapper">
          {config.stargazers && (
            <img
              alt={`${config.stargazers} stars`}
              src={`https://img.shields.io/badge/stars-${config.stargazers}-yellow?style=for-the-badge`}
            />
          )}
          {config.forks && (
            <img
              alt={`${config.forks} forks`}
              src={`https://img.shields.io/badge/forks-${config.forks}-green?style=for-the-badge`}
            />
          )}
          {config.issues && (
            <img
              alt={`${config.issues} issues`}
              src={`https://img.shields.io/badge/issues-${config.issues}-blue?style=for-the-badge`}
            />
          )}
          {config.pulls && (
            <img
              alt={`${config.pulls} pull requests`}
              src={`https://img.shields.io/badge/pulls-${config.pulls}-orange?style=for-the-badge`}
            />
          )}
        </div>
      )}
    </figure>
  )
}

export default Card
