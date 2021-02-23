import { Layout } from '../components/Layout'
import { categoriesListQuery, configurationQuery } from '../generated/sdk'
import sdk from '../lib/DatoCmsClient'

interface Props {
  configuration: configurationQuery
  categories: categoriesListQuery
}

export default function IndexPage(props: Props): JSX.Element {
  return (
    <Layout configuration={props.configuration} categories={props.categories} />
  )
}

export async function getStaticProps(): Promise<{ props: Props }> {
  const configuration = await sdk.configuration()
  const categories = await sdk.categoriesList()
  return {
    props: {
      categories,
      configuration,
    },
  }
}
