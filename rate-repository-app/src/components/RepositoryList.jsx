import { FlatList, View, StyleSheet, Image, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#e1e4e8',
    flex: 1,
  },
  separator: {
    height: 10,
  },
  itemContainer: {
    display: 'flex',
    backgroundColor: 'white',
  },
})

const headerStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    maxWidth: '80%'
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: 15,
    marginRight: 15
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  fullName : {
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
    flexWrap: 'wrap'
  },
});

const dateStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  column: {
    alignItems: 'center',
  }
})

const ItemSeparator = () => <View style={styles.separator} />;

const setNumber = (number) => {
  return number > 1000 ? (number / 1000).toFixed(1) + 'k' : number
}

const ItemHeader = ({ item }) => (
  <View style={headerStyles.row}>
    <Image
      style={headerStyles.logo}
      source={{ uri: item.ownerAvatarUrl }}
    />
    <View>
      <Text style={headerStyles.fullName} fontWeight="bold">{item.fullName}</Text>
      <Text style={headerStyles.description} color='textSecondary'>{item.description}</Text>
      <Pressable style={headerStyles.button}>
        <Text color='white'>{item.language}</Text>
      </Pressable>
    </View>
  </View>
);

const ItemDetail = ({ value, label }) => (
  <View style={dateStyles.column}>
    <Text fontWeight="bold">{setNumber(value)}</Text>
    <Text color='textSecondary'>{label}</Text>
  </View>
);

const ItemData = ({ item }) => (
  <View style={dateStyles.row}>
    <ItemDetail value={item.stargazersCount} label='Stars' />
    <ItemDetail value={item.forksCount} label='Forks' />
    <ItemDetail value={item.reviewCount} label='Reviews' />
    <ItemDetail value={item.ratingAverage} label='Rating' />
  </View>
)

const Item = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <ItemHeader item={item} />
      <ItemData item={item} />
    </View>
  )
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) {
    return <Text>Loading...</Text>
  }
  
  if (error) {
    console.log(error);    
  }
  
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <Item item={item}/>}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default RepositoryList;