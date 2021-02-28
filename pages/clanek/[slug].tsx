import { AppContextProvider } from 'components/AppContextProvider'
import React from 'react'

import { Layout } from '../../components/Layout'
import { AppQueryQuery, ArticleRecord } from '../../generated/sdk'
import sdk from '../../lib/DatoCmsClient'
import { Article } from '../../components/Article'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'

interface Props {
  data: AppQueryQuery
  currentArticle: any
}

export default function ArticlePage(props: Props): JSX.Element {
  return (
    <AppContextProvider value={props.data}>
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
      data,
      currentArticle: article,
    },
  }
}
