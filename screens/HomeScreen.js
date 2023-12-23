import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Divider, Searchbar, useTheme} from 'react-native-paper';
import BooksComponent from '../components/Books/BooksComponent';
import HeaderComponent from '../components/HeaderComponent';

const HomeScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.searchContainer}>
        <Searchbar
          style={{marginBottom: 5}}
          mode="bar"
          placeholder="Search Books"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Divider bold={true} style={{width: '130%', marginLeft: '-15%'}} />
      </View>
      <BooksComponent searchText={searchText} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  searchContainer: {
    width: '80%',
    height: 'auto',
    paddingVertical: 10,
  },
});
