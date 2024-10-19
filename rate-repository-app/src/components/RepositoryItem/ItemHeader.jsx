import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 15,
    borderRadius: 5,
  },
  details: {
    flex: 1,
  },
  fullName : {
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
    flexWrap: 'wrap'
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
});

const ItemHeader = ({ item }) => (
  <View style={styles.row}>
    <Image
      style={styles.logo}
      source={{ uri: item.ownerAvatarUrl }}
    />
    <View style={styles.details}>
      <Text style={styles.fullName} fontWeight="bold">{item.fullName}</Text>
      <Text style={styles.description} color='textSecondary'>{item.description}</Text>
      <Text style={styles.button} color='white'>{item.language}</Text>
    </View>
  </View>
);

export default ItemHeader;