import React from 'react'

import './badge.css'

type BadgeConfig = {
  name: string
  value: string
  color: string
}

const Badge: React.FC<BadgeConfig> = config => {
  return (
    <div className="badge-wrapper">
      <p className="badge-label">{config.name}</p>
      <p className="badge-value" style={{ backgroundColor: config.color }}>
        {config.value}
      </p>
    </div>
  )
}

export default Badge
