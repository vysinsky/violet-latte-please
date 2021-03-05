import { AppContextProvider } from 'components/AppContextProvider'
import React from 'react'
import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { AppQueryQuery } from '../../generated/sdk'
import sdk from '../../lib/DatoCmsClient'
import { Article } from '../../components/Article'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'

interface Props {
  slug: string
  data: AppQueryQuery
  currentArticle: any
}

export default function ArticlePage(props: Props): JSX.Element {
  return (
    <AppContextProvider value={props.data}>
      <Head>
        <link
          rel="canonical"
          href={`https://${process.env.SITE_DOMAIN}/${props.slug}`}
        />
      </Head>
      <Layout displayHero={false}>
        <Article article={props.currentArticle} />
      </Layout>
    </AppContextProvider>
  )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const data = await sdk.AppQuery()

  return {
    paths: data.articles.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<Props>> {
  const data = await sdk.AppQuery()
  const article = data.articles.find(({ slug }) => slug === context.params.slug)

  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      slug: context.params.slug as string,
      data,
      currentArticle: article,
    },
  }
}
