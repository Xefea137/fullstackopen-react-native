import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import theme from '../theme';
import { useDebounce } from 'use-debounce';
import Text from './Text';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
  inputBox: {
    borderColor: theme.colors.fade,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
})

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { selectedOrder, setSelectedOrder, searchQuery, setSearchQuery } = this.props;

    return (
      <>
        <Searchbar
          placeholder="Search"
          placeholderTextColor={theme.colors.grey}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.inputBox}
          mode='view'
        />
        <Picker
          selectedValue={selectedOrder}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedOrder(itemValue)
          }>
          <Picker.Item label='Select an item...' value="" enabled={false} />
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      </>
    );
  };

  render() {
    const { repositories, onEndReach, navigate } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigate(`/${item.id}`)}>
              <RepositoryItem item={item} />
            </Pressable>
          )}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={item => item.id}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [value] = useDebounce(searchQuery, 500);

  let searchKeyword = value

  let orderBy = 'CREATED_AT';
  let orderDirection = 'DESC';
  if (selectedOrder === 'latest') {
    orderBy = 'CREATED_AT';
    orderDirection = 'DESC';
  } else if (selectedOrder === 'highest') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'DESC';
  } else if (selectedOrder === 'lowest') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'ASC';
  }

  const { repositories, loading, error, fetchMore } = useRepositories(orderBy, orderDirection, searchKeyword, 3);

  if (loading) {
    return <Text>Loading...</Text>
  }
  
  if (error) {
    console.log(error);    
  }

  const onEndReach = () => {
    fetchMore();
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      navigate={navigate}      
    />
  );
};

export default RepositoryList;