import {StyleSheet, View} from 'react-native';
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import {Divider, Searchbar} from 'react-native-paper';
import ChatComponent from '../components/Chats/ChatComponent';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.searchContainer}>
        <Searchbar
          style={{marginBottom: 5}}
          mode="bar"
          placeholder="Search Chats"
        />
        <Divider bold={true} style={{width: '130%', marginLeft: '-15%'}} />
      </View>
      <ChatComponent />
    </View>
  );
};

export default ChatScreen;

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
