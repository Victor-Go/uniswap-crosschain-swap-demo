import {
  AnyVariables,
  cacheExchange,
  createClient,
  fetchExchange,
  gql,
  TypedDocumentNode,
} from 'urql'

const createGraphQLClient = (url: string) => {
  const apiKey = process.env.NEXT_PUBLIC_THE_GRAPH_KEY
  const client = createClient({
    url,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
    exchanges: [cacheExchange, fetchExchange],
  })
  return client
}

const theGraphRequest = async <T>(
  subGraph: string,
  query: TypedDocumentNode<any, AnyVariables>,
) => {
  const res = await createGraphQLClient(
    `https://gateway.thegraph.com/api/subgraphs/id/${subGraph}`,
  )
    .query(query, {})
    .toPromise()

  return res.data as T
}

export default theGraphRequest
