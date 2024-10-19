import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import useMyReviews from "../hooks/useMyReviews";
import theme from "../theme";
import { format } from 'date-fns';
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    padding: 13,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    flex: 1
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    padding: 13,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    flex: 1
  },
  c: {
    backgroundColor: theme.colors.white,
  }
})

const ReviewItem = ({ review, refetch }) => {
  const date = format(new Date(review.createdAt), 'dd.MM.yyyy');
  navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const handleDelete = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          console.log('OK Pressed')
          await deleteReview({ id: review.id })
          await refetch()
        }
      },
    ]);
  }

  return (
    <View style={styles.c}>
      <View style={styles.row}>
        <View style={styles.rating}>
          <Text fontWeight='bold' color='primary'>{review.rating}</Text>
        </View>
        <View style={styles.details}>
          <Text fontWeight='bold'>{review.repository.ownerName}/{review.repository.name}</Text>
          <Text color='textSecondary'>{date}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Pressable style={styles.viewButton} onPress={()=> navigate(`/${review.repositoryId}`)}>
          <Text color='white'>View Repository</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text color='white'>Delete Review</Text>
        </Pressable>
      </View>
    </View>
  )
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { me, loading, error, refetch } = useMyReviews();

  /*if (loading) {
    return <Text>Loading...</Text>
  }*/

  const reviews = me
    ? me.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

export default MyReviews;