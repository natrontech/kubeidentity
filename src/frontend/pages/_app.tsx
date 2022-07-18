import '../styles/globals.css'
import '../styles/fonts.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { AuthProvider } from '../contexts/auth'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
