import { StyleSheet } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  tab: {
    marginRight: 10,
  }
});

const AppBarTab = ({ label, to, onPress }) => {
  return (
    <Link to={to} style={styles.tab} onPress={onPress}>
        <Text color='white' fontWeight='bold'>{label}</Text>
    </Link>
  )
};

export default AppBarTab;