import { FlatList, View, StyleSheet } from 'react-native';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
})

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item}/>}
      keyExtractor={item => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) {
    return <Text>Loading...</Text>
  }
  
  if (error) {
    console.log(error);    
  }

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;