import React from 'react'

import Configuration from '../../types/configType'
// import ConfigContext from '../../contexts/ConfigContext'

import './card.css'

const Card: React.FC<Configuration> = config => {
  return (
    <figure className="card-wrapper">
      {/* <div className="logo-wrapper">
      <img src="https://raw.githack.com/devicons/devicon/master/icons/github/github-original.svg" />
    </div> */}
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </figure>
  )
}

export default Card
