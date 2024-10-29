import ErrorContent from '../src/components/error/error'

const HomePage = () => {
  return (
    <ErrorContent
      code="404"
      title="Page not found."
      description="Sorry, we couldn't find the page you're looking for."
    />
  )
}

export const metadata = {
  title: '404 - Page Not Found',
  description:
    'This page could not be found. Please check the URL or return to the homepage.',
}

export default HomePage
