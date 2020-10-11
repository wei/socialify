import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Badge from './badge'

import Configuration from '../../../common/types/configType'

import { getDevIconClassName, getHeroPattern } from '../../../common/helpers'

const CardWrapper = styled.figure`
  width: 640px;
  height: 320px;
  margin: 0 auto;
  padding: 10px 30px;
  font-display: block;
  color: #000;
  text-align: center;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.5;

  * {
    box-sizing: border-box;
    pointer-events: none;
  }

  &.theme-dark {
    color: #fff;
    background: #000;
  }
`

const CardLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  > img {
    height: 100px;
  }

  > i {
    font-size: 90px;

    &:first-child {
      font-size: 100px;
    }
  }

  .card-logo-divider {
    color: #bbb;
    font-size: 30px;
    margin: 0 20px;
    font-family: 'Times New Roman', Verdana;
  }
`

const CardNameWrapper = styled.p`
  display: inline-flex;
  align-items: center;
  margin: 0;
  margin-top: 10px;
  font-size: 40px;
  font-weight: 500;

  > span {
    display: inline-block;
    white-space: nowrap;
  }

  .card-name-owner {
    font-weight: 200;
  }
`

const CardDescriptionWrapper = styled.p`
  margin: 0;
  margin-top: 10px;
  font-size: 17px;
  font-weight: 400;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CardBadgesWrapper = styled.div`
  margin-top: 25px;

  > * {
    margin: 0 5px;
  }
`

const Card: React.FC<Configuration> = config => {
  const [backgroundPattern, setBackgroundPattern] = useState(
    getHeroPattern(config.pattern, config.theme)
  )

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
    <CardWrapper
      className={`card-wrapper theme-${config.theme.toLowerCase()}`}
      style={{ fontFamily: config.font, backgroundImage: backgroundPattern }}>
      <CardLogoWrapper className="card-logo-wrapper">
        {config.logo !== '' ? (
          <img src={config.logo} alt="Custom logo"></img>
        ) : (
          <i className={getDevIconClassName('GitHub', config.theme)}></i>
        )}
        {languageIcon && (
          <>
            <span className="card-logo-divider">+</span>
            <i className={languageIcon}></i>
          </>
        )}
      </CardLogoWrapper>

      <CardNameWrapper
        className="card-name-wrapper"
        style={{ fontSize: nameFontSize }}>
        <span className="card-name-owner">
          {config.owner?.state ? `${config.owner.value}/` : ''}
        </span>
        <span className="card-name-name">{config.name}</span>
      </CardNameWrapper>

      {config.description?.state && (
        <CardDescriptionWrapper className="card-description-wrapper">
          {config.description.value}
        </CardDescriptionWrapper>
      )}

      {(config.stargazers?.state ||
        config.forks?.state ||
        config.issues?.state ||
        config.pulls?.state) && (
        <CardBadgesWrapper className="card-badges-wrapper">
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
        </CardBadgesWrapper>
      )}
    </CardWrapper>
  )
}

export default Card
