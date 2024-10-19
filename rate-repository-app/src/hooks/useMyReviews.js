import { useQuery } from "@apollo/client";
import { ME_DATA } from "../graphql/queries";

const useMyReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME_DATA, {
    variables: {includeReviews: true},
    fetchPolicy: 'cache-and-network'});

  return {
    me: data ? data.me : { reviews: { edges: [] } },
    loading,
    error,
    refetch
  };
};

export default useMyReviews;