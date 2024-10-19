import { Linking, Pressable, StyleSheet } from "react-native";
import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 13,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
})

const OpenGitHub = ({ url }) => {
  const openLink = () => {
    Linking.openURL(url)
  };
  
  return (
    <Pressable style={styles.button} onPress={openLink} >
      <Text color='white' fontWeight='bold'>Open in GitHub</Text>
    </Pressable>
  )
};

export default OpenGitHub;