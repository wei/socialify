import Error from '../src/components/error/error'

const HomePage = () => {
  return (
    <Error
      code="404"
      title="Page not found."
      description="Sorry, we couldn't find the page you're looking for."
    />
  )
}

export default HomePage
