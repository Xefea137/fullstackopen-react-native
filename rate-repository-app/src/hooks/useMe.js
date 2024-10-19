import { useQuery } from '@apollo/client';
import { ME_DATA } from '../graphql/queries';

const useMe = () => {
  const { data, loading, error } = useQuery(ME_DATA);

  return {
    me: data ? data.me : [],
    loading,
    error
  };
};

export default useMe;