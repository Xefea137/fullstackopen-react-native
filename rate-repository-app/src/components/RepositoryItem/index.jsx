import { StyleSheet, View } from "react-native";
import ItemHeader from "./ItemHeader";
import ItemData from "./ItemData";

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    backgroundColor: 'white',
  },
})

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.itemContainer}>
      <ItemHeader item={item} />
      <ItemData item={item} />
    </View>
  )
};

export default RepositoryItem;