import React from 'react'

type BadgeConfig = {
  name: string
  value: string
  color: string
}

const Badge: React.FC<BadgeConfig> = (config) => {
  return (
    <div
      className="badge-wrapper"
      style={{
        height: 28,
        display: 'flex',
        margin: '0 5px'
      }}>
      <p
        className="badge-label"
        style={{
          backgroundColor: '#555',
          color: '#fff',
          fontFamily: 'Jost',
          fontSize: 11,
          height: 25,
          letterSpacing: 1,
          margin: 0,
          textTransform: 'uppercase',
          padding: '0 8px',
          display: 'flex',
          alignItems: 'center'
        }}>
        {config.name}
      </p>
      <p
        className="badge-value"
        style={{
          backgroundColor: config.color,
          color: '#fff',
          fontFamily: 'Jost',
          fontSize: 11,
          height: 25,
          letterSpacing: 1,
          margin: 0,
          padding: '0 8px',
          display: 'flex',
          alignItems: 'center'
        }}>
        {config.value}
      </p>
    </div>
  )
}

export default Badge
