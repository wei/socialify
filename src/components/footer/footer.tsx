import React from 'react'
import { Typography } from 'antd'

const { Text, Link } = Typography

const Footer = () => {
  return (
    <footer>
      <Text style={{ margin: 'unset' }}>
        <span>{`Made with 💖 by `}</span>
        <Link
          href="https://cryogenicplanet.tech"
          target="_blank"
          rel="noopener noreferrer">
          CryogenicPlanet
        </Link>
        &nbsp;and&nbsp;
        <Link
          href="https://github.com/wei/"
          target="_blank"
          rel="noopener noreferrer">
          Wei
        </Link>
      </Text>

      <style jsx>{`
        footer {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </footer>
  )
}

export default Footer
