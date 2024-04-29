import ErrorPage from '../src/components/error/_error'

const HomePage = () => {
  return (
    <ErrorPage
      code="404"
      title="Page not found."
      description="Sorry, we couldn't find the page you're looking for."
    />
  )
}

export default HomePage
