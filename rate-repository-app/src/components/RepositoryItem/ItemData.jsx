import { StyleSheet, View } from "react-native";
import Text from "../Text";

const styles = StyleSheet.create({
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

const setNumber = (number) => {
  return number > 1000 ? Math.floor(number / 100) / 10 + 'k' : number;
}

const ItemDetail = ({ value, label }) => (
  <View style={styles.column}>
    <Text fontWeight="bold">{setNumber(value)}</Text>
    <Text color='textSecondary'>{label}</Text>
  </View>
);

const ItemData = ({ item }) => (
  <View style={styles.row}>
    <ItemDetail value={item.stargazersCount} label='Stars' />
    <ItemDetail value={item.forksCount} label='Forks' />
    <ItemDetail value={item.reviewCount} label='Reviews' />
    <ItemDetail value={item.ratingAverage} label='Rating' />
  </View>
)

export default ItemData;