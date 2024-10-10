import { useQuery } from '@apollo/client';
import { ALL_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error } = useQuery(ALL_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'});

  if (error) {
    console.error("Error fetching repositories:", error);
  }
  
  return {
    repositories: data ? data.repositories : [],
    loading,
    error
  }
};

export default useRepositories;