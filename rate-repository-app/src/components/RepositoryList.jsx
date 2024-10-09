import { FlatList, View, StyleSheet, Image, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';

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
    maxWidth: '85%'
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

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

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
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <Item item={item}/>}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default RepositoryList;