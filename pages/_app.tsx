import { Component, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import { initGA, logPageView } from '../lib/GoogleAnalytics'
import { initLogRocket } from '../lib/LogRocket'
import { Router } from 'next/router'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0 auto;
    padding: 0;
    font-family: Roboto, sans-serif;
    overflow-x: hidden;
    min-width: 300px;
    max-width: 1100px;
    background: #fff;
}
`

class MyApp extends Component<AppProps> {
  componentDidMount(): void {
    if (process.env.NODE_ENV === 'production') {
      initGA()
      initLogRocket()
      logPageView()
      Router.events.on('routeChangeComplete', logPageView)
    }
  }

  render(): ReactNode {
    const { Component, pageProps } = this.props
    return (
      <>
        <GlobalStyles />
        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
