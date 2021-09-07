import React from 'react'

type BadgeConfig = {
  name: string
  value: string
  color: string
}

const Badge: React.FC<BadgeConfig> = (config) => {
  return (
    <div className="badge-wrapper">
      <p className="badge-label">{config.name}</p>
      <p className="badge-value" style={{ backgroundColor: config.color }}>
        {config.value}
      </p>

      <style jsx>{`
        .badge-wrapper {
          height: 28px;
          display: inline-flex;
        }

        .badge-wrapper > p {
          background: #555;
          color: #fff;
          font-family: Verdana, Geneva, 'DejaVu Sans', sans-serif;
          line-height: 28px;
          font-size: 10px;
          letter-spacing: 1px;
          padding: 0 8px;
          margin: 0;
        }

        .badge-wrapper .badge-label {
          text-transform: uppercase;
        }
      `}</style>
    </div>
  )
}

export default Badge
