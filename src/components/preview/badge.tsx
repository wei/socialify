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
        height: 25,
        backgroundColor: '#555',
        display: 'flex',
        margin: '0 7px'
      }}>
      <p
        className="badge-label"
        style={{
          color: '#fff',
          fontFamily: 'Jost',
          fontSize: 11,
          height: '100%',
          letterSpacing: 1,
          margin: 0,
          textTransform: 'uppercase',
          padding: '0 12px 0 10px',
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
          height: '100%',
          letterSpacing: 1,
          margin: 0,
          padding: '0 8px',
          display: 'flex',
          alignItems: 'center',
          marginLeft: -4,
          marginRight: -4
        }}>
        {config.value}
      </p>
    </div>
  )
}

export default Badge
