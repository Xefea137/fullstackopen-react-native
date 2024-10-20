import { useQuery } from "@apollo/client"
import { SINGLE_REPOSITORY } from "../graphql/queries"

const useSingleRepository = (id, first, after) => {
  const { data, loading, error, fetchMore, ...result } = useQuery(SINGLE_REPOSITORY, {
    variables: {repositoryId: id, first, after},
    fetchPolicy: 'cache-and-network'});

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        repositoryId: id,
        after: data.repository.reviews.pageInfo.endCursor,
      }
    })
  }

  return {
    repository: data ? data.repository : { reviews: { edges: [] } },
    fetchMore: handleFetchMore,
    loading,
    error
  }
};

export default useSingleRepository;