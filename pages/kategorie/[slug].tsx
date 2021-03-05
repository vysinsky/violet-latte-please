import { AppContextProvider } from 'components/AppContextProvider'
import React from 'react'
import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { AppQueryQuery } from '../../generated/sdk'
import sdk from '../../lib/DatoCmsClient'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import { ArticlesList } from 'components/ArticlesList'

interface Props {
  category: string
  data: AppQueryQuery
  articles: any[]
}

export default function CategoryPage(props: Props): JSX.Element {
  return (
    <AppContextProvider value={props.data}>
      <Head>
        <link
          rel="canonical"
          href={`https://${process.env.SITE_DOMAIN}/kategorie/${props.category}`}
        />
      </Head>
      <Layout displayHero={false}>
        <ArticlesList articles={props.articles} />
      </Layout>
    </AppContextProvider>
  )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const data = await sdk.AppQuery()

  return {
    paths: data.categories.map(({ slug }) => ({
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
  const articles = data.articles.filter(
    ({ category }) => category.slug === context.params.slug,
  )

  return {
    props: {
      category: context.params.slug as string,
      data,
      articles,
    },
  }
}
