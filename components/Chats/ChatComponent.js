import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SingleChatComponent from './SingleChatComponent';
import {useSelector} from 'react-redux';
import {chatWS} from '../../constants/url_constants';
import TextComponent from '../TextComponent';

const ChatComponent = () => {
  const user = useSelector(state => state?.user);
  const [chats, setChats] = useState([]);

  const [socket, setSocket] = useState(null);

  const connectWebSocket = () => {
    const newSocket = new WebSocket(`${chatWS}/${user['email']}`);

    newSocket.onopen = () => {
      console.log('WS Connected');
    };

    newSocket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data['event'] === 'all_chats' || data['event'] === 'delete_chat') {
        setChats(data['message']);
      } else if (data['event'] === 'new_chat') {
        
        setChats(chats => [data['message'][0], ...chats]);
      }
    };

    newSocket.onclose = event => {
      console.log('Websocket error ', event.reason);

      setTimeout(() => {
        connectWebSocket();
      }, 5000);
    };

    newSocket.onerror = error => {
      console.error('WebSocket error:', error.message);
    };

    setSocket(newSocket);
  };

  const disconnectWebSocket = () => {
    if (socket) {
      socket.close();
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, []);  

  return (
    <View style={styles.container}>
      <View>
        {chats.length > 0 ? (
          <ScrollView>
            {chats.map((item, index) => {
              return (
                <SingleChatComponent
                  key={`${item['chat_id']}_${index}`}
                  user_id={item['chat_id']}
                  user_name={item['chat_title']}
                  last_date={item['last_message_date']}
                  last_message={item['last_message']}
                />
              );
            })}
          </ScrollView>
        ) : (
          <TextComponent content={'No Chats'} />
        )}
      </View>
    </View>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
    height: '70%',
    alignItems: 'center',
  },
});
