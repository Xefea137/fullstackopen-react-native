import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useSignOut from '../hooks/useSignOut';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    padding: 15,
  },
});

const AppBar = () => {
  const { me, loading, error } = useMe();
  const [signOut] = useSignOut();
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" to="/"/>
        {!me ?
        <>
          <AppBarTab label="Sign in" to="/sign-in" />
          <AppBarTab label="Sign up" to="/sign-up" />
        </> :
        <>
          <AppBarTab label="Create a review" to="/create-review" />
          <AppBarTab label="My reviews" to="/my-reviews" />
          <AppBarTab label="Sign out" onPress={signOut} to="/sign-in"/>
        </>
        }
      </ScrollView>
    </View>
  )
};

export default AppBar;