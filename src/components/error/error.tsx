import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

type ErrorProp = {
  code: string
  title: string
  description: string
}

const ErrorContent: React.FC<ErrorProp> = ({ code, title, description }) => (
  <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
    <div className="py-16">
      <div className="text-center">
        <p className="text-base text-error font-extrabold">{code}</p>
        <h1 className="mt-2 text-5xl leading-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-secondary to-error">
          {title}
        </h1>
        <p className="mt-2 text-base font-semibold">{description}</p>
        <div className="mt-6">
          <Link
            href="/"
            className="btn btn-primary gap-2 uppercase font-extrabold"
          >
            Go back home
            <FaArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  </main>
)

export default ErrorContent
