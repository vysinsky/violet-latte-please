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
  tag: string
  data: AppQueryQuery
  articles: any[]
}

export default function TagPage(props: Props): JSX.Element {
  return (
    <AppContextProvider value={props.data}>
      <Layout isHomepage={false}>
        <ArticlesList
          articles={props.articles}
          title={`Články se štítkem ${props.tag} `}
        />
      </Layout>
      <Head>
        <link
          rel="canonical"
          href={`https://${process.env.SITE_DOMAIN}/tag/${props.tag}`}
        />
        <meta
          name="og:url"
          content={`https://${process.env.SITE_DOMAIN}/tag/${props.tag}`}
        />
        <title>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Články se štítkem "{props.tag}" | {props.data.configuration.webTitle}
        </title>
        <meta
          name="description"
          content={`Výpis článků se štítkem ${props.tag} na blogu ${props.data.configuration.webTitle}`}
        />
      </Head>
    </AppContextProvider>
  )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const data = await sdk.AppQuery()

  return {
    paths: data.tags.map(({ label }) => ({
      params: {
        slug: label,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<Props>> {
  const data = await sdk.AppQuery()
  const articles = data.articles.filter(({ tags }) =>
    tags.map(t => t.label).includes(context.params.slug as string),
  )

  return {
    props: {
      tag: context.params.slug as string,
      data,
      articles,
    },
  }
}
