import Link from 'next/link'

import { version } from '@/common/helpers'

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center p-2 text-base-content font-semibold no-screenshot">
      <nav>
        <p>
          <span>Made with 💖 by </span>
          <Link
            className="link link-accent no-underline"
            href="https://cryogenicplanet.tech"
            target="_blank"
          >
            CryogenicPlanet
          </Link>
          &nbsp;and&nbsp;
          <Link
            className="link link-accent no-underline"
            href="https://github.com/wei/"
            target="_blank"
          >
            Wei
          </Link>
          <span>
            &nbsp;<em>(v{version})</em>
          </span>
        </p>
      </nav>
      <Link
        className="absolute bottom-2 right-2"
        href="https://www.netlify.com"
        target="_blank"
      >
        <img
          alt="Deploys by Netlify"
          src="https://www.netlify.com/v3/img/components/netlify-dark.svg"
          width={75}
          height={33}
        />
      </Link>
    </footer>
  )
}

export default Footer
