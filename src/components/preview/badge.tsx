import React from 'react'
import styled from 'styled-components'

const BadgeWrapper = styled.div`
  margin: 0;
  height: 28px;
  display: inline-flex;
`

const BadgeText = styled.p`
  background: #555;
  color: #fff;
  font-family: Verdana, Geneva, 'DejaVu Sans', sans-serif;
  line-height: 28px;
  font-size: 10px;
  letter-spacing: 1px;
  padding: 0 8px;
  margin: 0;
`

const BadgeLabel = styled(BadgeText)`
  text-transform: uppercase;
`

type BadgeConfig = {
  name: string
  value: string
  color: string
}

const Badge: React.FC<BadgeConfig> = config => {
  return (
    <BadgeWrapper className="badge-wrapper">
      <BadgeLabel className="badge-label">{config.name}</BadgeLabel>
      <BadgeText
        className="badge-value"
        style={{ backgroundColor: config.color }}>
        {config.value}
      </BadgeText>
    </BadgeWrapper>
  )
}

export default Badge
