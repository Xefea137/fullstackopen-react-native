import { useQuery } from '@apollo/client';
import { ALL_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword, first, after) => {
  const { data, loading, error, fetchMore, ...result } = useQuery(ALL_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword, first, after },
    fetchPolicy: 'cache-and-network'});

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        orderBy,
        orderDirection,
        searchKeyword,
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  return {
    repositories: data ? data.repositories : { edges: [] },
    fetchMore: handleFetchMore,
    loading,
    error,
    ...result,
  };
};

export default useRepositories;