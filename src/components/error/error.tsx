import React from 'react'
import Link from 'next/link'

type ErrorProp = {
  code: string
  title: string
  description: string
}

const Error: React.FC<ErrorProp> = ({ code, title, description }) => (
  <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
    <div className="py-16">
      <div className="text-center">
        <p className="text-base font-semibold text-error">{code}</p>
        <h1 className="mt-2 text-5xl leading-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-secondary to-error">
          {title}
        </h1>
        <p className="mt-2 text-base">{description}</p>
        <div className="mt-6">
          <Link href="/" className="btn btn-primary gap-2">
            Go back home
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  </main>
)

export default Error
