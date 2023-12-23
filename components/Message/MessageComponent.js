import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SingleMessageComponent from './SingleMessageComponent';
import WriteMessageComponent from './WriteMessageComponent';
import {useSelector} from 'react-redux';
import {messageWS} from '../../constants/url_constants';

const MessageComponent = () => {
  const user = useSelector(state => state.user);
  const chat_id = useSelector(state => state.book.book);
  const [messages, setMessages] = useState([]);

  const socket = useRef();

  const connectWebSocket = () => {
    socket.current = new WebSocket(`${messageWS}/${chat_id}`);

    socket.current.onopen = () => {
      console.log('WS Connected');
    };

    socket.current.onmessage = event => {
      const data = JSON.parse(event.data);

      if (data['event'] === 'all_messages') {
        setMessages(data['message']);
      } else if (data['event'] === 'new_message') {
        setMessages(messages => [...messages, data['message'][0]]);
      }
    };

    socket.current.onclose = event => {
      console.log('Websocket error ', event.reason);

      setTimeout(() => {
        connectWebSocket();
      }, 5000);
    };

    socket.current.onerror = error => {
      console.error('WebSocket error:', error.message);
    };
  };

  const disconnectWebSocket = () => {
    if (socket.current) {
      socket.current.close();
    }
  };

  const sendMessage = async message => {
    socket.current.send(
      JSON.stringify({
        event: 'add_new_message',
        value: {
          chat_id: chat_id,
          user: user['id'],
          message: message.trim(),
        },
      }),
    );
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, []);

  return (
    <View style={styles.container}>
      {messages.length > 0 && (
        <ScrollView
          ref={ref => {
            this.scrollView = ref;
          }}
          onContentSizeChange={() =>
            this.scrollView.scrollToEnd({animated: true})
          }
          contentContainerStyle={{
            width: '100%',
          }}>
          {messages.map((item, index) => {
            return (
              <SingleMessageComponent
                key={index}
                user_message={item?.author?.id === user.id}
                message={item?.text}
                date={item?.date}
              />
            );
          })}
        </ScrollView>
      )}
      <WriteMessageComponent sendMessage={sendMessage} />
    </View>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 8,
    height: '90%',
    justifyContent: 'flex-end',
  },
});
