import { RelayEnvironmentProvider } from 'react-relay'
import MainRenderer from '../../src/components/mainRenderer'

import environment from '../../common/relay/environment'

const RepoPage = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <MainRenderer />
    </RelayEnvironmentProvider>
  )
}

export default RepoPage
