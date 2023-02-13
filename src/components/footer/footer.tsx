import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="footer footer-center p-2 text-base-content">
      <div>
        <p>
          <span>Made with 💖 by </span>
          <Link
            className="link link-accent no-underline"
            href="https://cryogenicplanet.tech"
            target="_blank">
            CryogenicPlanet
          </Link>
          &nbsp;and&nbsp;
          <Link
            className="link link-accent no-underline"
            href="https://github.com/wei/"
            target="_blank">
            Wei
          </Link>
        </p>
      </div>
      <Link
        className="absolute bottom-2 right-2"
        href="https://vercel.com/?utm_source=github-socialify&utm_campaign=oss"
        target="_blank">
        <img
          alt="Powered by Vercel"
          src="https://user-images.githubusercontent.com/5880908/218415645-ac47f9ba-0d60-47eb-950c-ed10bba1e7f6.png"
          width={159}
          height={33}
        />
      </Link>
    </footer>
  )
}

export default Footer
