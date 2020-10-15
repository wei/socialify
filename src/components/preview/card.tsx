import React, { useState, useEffect } from 'react'

import Badge from './badge'

import Configuration, { FileType } from '../../../common/types/configType'

import { getDevIconClassName, getHeroPattern } from '../../../common/helpers'

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
    <svg
      className="card-svg-wrapper"
      viewBox="0 0 640 320"
      xmlns="http://www.w3.org/2000/svg">
      <foreignObject x="0" y="0" width="640" height="320">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          className={`card-wrapper theme-${config.theme.toLowerCase()}`}
          style={{
            fontFamily: config.font,
            backgroundImage: backgroundPattern
          }}>
          <div className="card-logo-wrapper">
            {config.logo !== '' && config.fileType !== FileType.svg ? (
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
          </div>

          <p className="card-name-wrapper" style={{ fontSize: nameFontSize }}>
            <span className="card-name-owner">
              {config.owner?.state ? `${config.owner.value}/` : ''}
            </span>
            <span className="card-name-name">{config.name}</span>
          </p>

          {config.description?.state && (
            <p className="card-description-wrapper">
              {config.description.value}
            </p>
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

          <style jsx>{`
            :global(.card-svg-wrapper) {
              width: 640px;
              height: 320px;
              margin: 0;
            }

            .card-wrapper {
              width: 640px;
              height: 320px;
              margin: 0;
              padding: 10px 30px;
              box-sizing: border-box;
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
            }

            .card-wrapper {
              margin: 0 auto;
            }

            .card-wrapper * {
              box-sizing: border-box;
              pointer-events: none;
            }

            .card-wrapper.theme-dark {
              color: #fff;
              background: #000;
            }

            .card-logo-wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 10px 0 0;
            }

            .card-logo-wrapper > img {
              height: 100px;
            }

            .card-logo-wrapper > i {
              font-size: 90px;
            }

            .card-logo-wrapper > i:first-child {
              font-size: 100px;
            }

            .card-logo-divider {
              color: #bbb;
              font-size: 30px;
              margin: 0 20px;
              font-family: 'Times New Roman', Verdana;
            }

            .card-name-wrapper {
              display: inline-flex;
              align-items: center;
              margin: 10px 0 0;
              font-size: 40px;
              font-weight: 500;
            }

            .card-name-wrapper > span {
              display: inline-block;
              white-space: nowrap;
            }

            .card-name-wrapper .card-name-owner {
              font-weight: 200;
            }

            .card-description-wrapper {
              margin: 10px 0 0;
              font-size: 17px;
              font-weight: 400;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .card-badges-wrapper {
              margin: 25px 0 0;
            }

            .card-badges-wrapper > :global(*) {
              margin: 0 5px;
            }
          `}</style>
        </div>
      </foreignObject>
    </svg>
  )
}

export default Card
