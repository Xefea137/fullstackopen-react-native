import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "../Text";
import theme from "../../theme";

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

export default ItemHeader;