import { FlatList, StyleSheet, View } from "react-native";
import useSingleRepository from "../hooks/useSingleRepository";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import Text from "./Text";
import { format } from 'date-fns';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: theme.colors.white,
  },
  rating: {
    width: 50,
    height: 50,
    marginLeft: 5,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
  }
})

const RepositoryInfo = ({ repository }) => {
  return (
  <RepositoryItem item={repository} singleView={true} />
  )
};

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.row}>
      <View style={styles.rating}>
        <Text fontWeight='bold' color='primary'>{review.rating}</Text>
      </View>
      <View style={styles.details}>
        <Text fontWeight='bold'>{review.user.username}</Text>
        <Text color='textSecondary'>{date}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  let { id } = useParams();
  const { repository, loading, error } = useSingleRepository(id);

  /*if (loading) {
    return <Text>Loading...</Text>
  }*/

  const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  if (error) {
    console.log(error);
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => (
          <>
            <RepositoryInfo repository={repository} />
            <ItemSeparator />
          </>
        )}
      />
    </View>
  );
};

export default SingleRepository;