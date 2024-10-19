import { StyleSheet, View } from "react-native";
import ItemHeader from "./ItemHeader";
import ItemData from "./ItemData";
import OpenGitHub from "./OpenGitHub";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white
  },
})

const RepositoryItem = ({ item, singleView }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <ItemHeader item={item} />
      <ItemData item={item} />
      {singleView && <OpenGitHub url={item.url} /> }
    </View>
  )
};

export default RepositoryItem;