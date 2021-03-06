import { FC } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { Header } from './Header'
import { Navigation } from './Navigation'
import { HeroImage } from './HeroImage'
import { useAppContext } from './AppContextProvider'
import { renderMetaTags } from 'react-datocms'
import { Footer } from './Footer'
import { Partners } from './Partners'

const HeaderContainer = styled.div`
  margin: auto;
`

const Wrapper = styled.div`
  display: flex;
  padding: 0 20px;
  margin: 0 auto;
`

const Sidebar = styled.aside`
  transition: all 0.3s ease-in-out;

  @media only screen and (max-width: 700px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 100;
    padding: 20px;
    opacity: 0;
    transform: translateX(-100%);
  }
`

const ContentContainer = styled.main`
  width: 100%;
  padding: 0 20px 0 20px;

  @media only screen and (max-width: 700px) {
    padding: 0;
  }
`

interface Props {
  isHomepage?: boolean
}

export const Layout: FC<Props> = ({ children, isHomepage = true }) => {
  const appContext = useAppContext()

  const metaTags = appContext.configuration.seo.concat(appContext.site.favicon)

  return (
    <>
      <Head>
        {!appContext.configuration.allowIndexing && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        {/* @ts-expect-error title for head is included in `renderMetaTags` */}
        {renderMetaTags(metaTags)}
      </Head>
      <HeaderContainer>
        {isHomepage && <HeroImage />}
        <Header
          isHomepage={isHomepage}
          title={appContext.site.globalSeo.siteName}
        />
      </HeaderContainer>
      <Wrapper>
        <Sidebar>
          <Navigation categories={appContext.categories} />
          <Partners />
        </Sidebar>
        <ContentContainer>
          {children}
          <Footer content={appContext.configuration.footerContent} />
        </ContentContainer>
      </Wrapper>
    </>
  )
}
