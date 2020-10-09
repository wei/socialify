import React from 'react'

import styles from './badge.module.css'

type BadgeConfig = {
  name: string
  value: string
  color: string
}

const Badge: React.FC<BadgeConfig> = config => {
  return (
    <div className={styles['badge-wrapper']}>
      <p className={styles['badge-label']}>{config.name}</p>
      <p
        className={styles['badge-value']}
        style={{ backgroundColor: config.color }}>
        {config.value}
      </p>
    </div>
  )
}

export default Badge
