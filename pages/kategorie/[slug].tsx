import { AppContextProvider } from 'components/AppContextProvider'
import React from 'react'

import { Layout } from '../../components/Layout'
import { AppQueryQuery, ArticleRecord } from '../../generated/sdk'
import sdk from '../../lib/DatoCmsClient'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import { ArticlesList } from 'components/ArticlesList'

interface Props {
  data: AppQueryQuery
  articles: any[]
}

export default function ArticlePage(props: Props): JSX.Element {
  return (
    <AppContextProvider value={props.data}>
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
      data,
      articles,
    },
  }
}
