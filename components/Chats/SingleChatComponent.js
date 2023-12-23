import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextComponent from '../TextComponent';
import {Divider} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setSingleBook} from '../../store/BookStore';
import { useNavigation } from '@react-navigation/native';

const SingleChatComponent = ({user_id, user_name, last_date, last_message}) => {
  function formatTime(datetimeString) {
    const now = new Date();
    const messageDate = new Date(datetimeString);

    // Calculate the time difference in milliseconds
    const timeDiff = now - messageDate;

    // Convert milliseconds to minutes
    const minutesAgo = Math.floor(timeDiff / (1000 * 60));

    if (minutesAgo < 1) {
      return 'now';
    } else if (minutesAgo < 60) {
      return `${minutesAgo}m ago`;
    } else if (minutesAgo < 60 * 24) {
      return `${Math.floor(minutesAgo / 60)}h ago`;
    } else if (minutesAgo < 60 * 24 * 30) {
      return `${Math.floor(minutesAgo / (60 * 24))}d ago`;
    } else {
      // If it's more than a month, return the formatted date
      const options = {month: 'short', day: 'numeric'};
      return messageDate.toLocaleDateString(undefined, options);
    }
  }

  const dispatch = useDispatch();
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setSingleBook(user_id));
        navigation.navigate('SingleChat');
      }}>
      <View style={styles.chatContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/book_template.png')}
            resizeMode={'contain'}
            style={styles.image}
          />
        </View>

        <View style={styles.textContaier}>
          <View style={styles.usernamedataContainer}>
            <View style={styles.usernameContainer}>
              <TextComponent variant={'titleLarge'} content={user_name} />
            </View>
            <View style={styles.dateContainer}>
              <TextComponent
                variant={'labelSmall'}
                content={formatTime(last_date)}
              />
            </View>
          </View>
          <View style={styles.messageContainer}>
            <TextComponent
              variant={'labelMedium'}
              ellipsizeMode={'tail'}
              numberOfLines={1}
              content={last_message}
            />
          </View>
        </View>
      </View>
      <Divider bold={true} />
    </TouchableOpacity>
  );
};

export default SingleChatComponent;

const styles = StyleSheet.create({
  chatContainer: {
    display: 'flex',
    width: 'auto',
    height: 'auto',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: '15%',
  },
  image: {
    width: 50,
    height: 50,
  },
  textContaier: {
    width: '80%',
  },
  usernamedataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  usernameContainer: {},
  dateContainer: {},
  messageContainer: {},
});
