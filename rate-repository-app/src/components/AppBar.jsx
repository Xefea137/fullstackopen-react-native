import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import { ME_DATA } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    padding: 15,
  },
});

const useMe = () => {
  const { data } = useQuery(ME_DATA)

  return data ? data.me : [];
}

const AppBar = () => {
  const me = useMe();
  const [signOut] = useSignOut();
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab label="Repositories" to="/"/>
        {!me ? 
        <AppBarTab label="Sign in" to="/sign-in" /> :
        <AppBarTab label="Sign out" onPress={signOut} />}
      </ScrollView>
    </View>
  )
};

export default AppBar;