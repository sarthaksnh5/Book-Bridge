import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ChatHeaderComponent from '../components/Chats/ChatHeaderComponent';
import MessageComponent from '../components/Message/MessageComponent';

const SingleChatScreen = () => {
  return (
    <View style={styles.container}>
      <ChatHeaderComponent />
      <MessageComponent />
    </View>
  );
};

export default SingleChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',    
  },
});
