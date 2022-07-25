import '../styles/globals.css'
import '../styles/fonts.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { UserContextProvider } from '../contexts/userContext'
import { PersonalServiceAccountContextProvider } from '../contexts/personalServiceAccountContext'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <UserContextProvider>
      <PersonalServiceAccountContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersonalServiceAccountContextProvider>
    </UserContextProvider>
  )
}

export default MyApp
