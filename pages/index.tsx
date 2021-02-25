import { AppContextProvider } from 'components/AppContextProvider'
import React from 'react'
import { Layout } from '../components/Layout'
import { AppQueryQuery } from '../generated/sdk'
import sdk from '../lib/DatoCmsClient'

interface Props {
  data: AppQueryQuery
}

export default function IndexPage(props: Props): JSX.Element {
  return (
    <AppContextProvider value={props.data}>
      <Layout />
    </AppContextProvider>
  )
}

export async function getStaticProps(): Promise<{ props: Props }> {
  const data = await sdk.AppQuery()

  return {
    props: {
      data,
    },
  }
}
