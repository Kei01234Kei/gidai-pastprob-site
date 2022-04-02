import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    region: 'ap-northeast-1',
    userPoolId: 'ap-northeast-1_l9VF9YzCu',
    userPoolWebClientId: 'ev6skdtd0gl92ajtq9u8g3epa'
  },
  API: {
    endpoints: [
      {
        name: 'prod',
        endpoint: 'https://liwk0erekc.execute-api.ap-northeast-1.amazonaws.com/prod'
      },
      {
        name: 'dev',
        endpoint: 'https://liwk0erekc.execute-api.ap-northeast-1.amazonaws.com/dev'
      }
    ]
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
