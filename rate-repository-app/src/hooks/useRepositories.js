import { useQuery } from '@apollo/client';
import { ALL_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const { data, loading, error } = useQuery(ALL_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: 'cache-and-network'});

  return {
    repositories: data ? data.repositories : { edges: [] },
    loading,
    error
  }
};

export default useRepositories;