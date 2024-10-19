import { useQuery } from "@apollo/client"
import { SINGLE_REPOSITORY } from "../graphql/queries"

const useSingleRepository = (id) => {
  const { data, loading, error } = useQuery(SINGLE_REPOSITORY, {
    variables: {repositoryId: id},
    fetchPolicy: 'cache-and-network'});

  return {
    repository: data ? data.repository : { reviews: { edges: [] } },
    loading,
    error
  }
};

export default useSingleRepository;