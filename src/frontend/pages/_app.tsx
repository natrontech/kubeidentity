import '../styles/globals.css'
import '../styles/fonts.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { UserContextProvider } from '../contexts/userContext'
import { PersonalServiceAccountContextProvider } from '../contexts/personalServiceAccountContext'
import { ClusterInfoContextProvider } from '../contexts/clusterInfoContext'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <UserContextProvider>
      <ClusterInfoContextProvider>
        <PersonalServiceAccountContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersonalServiceAccountContextProvider>
      </ClusterInfoContextProvider>
    </UserContextProvider>
  )
}

export default MyApp
