import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import TextComponent from '../TextComponent';

const SingleMessageComponent = ({user_message = false, message, date}) => {
  const theme = useTheme();

  const getTime = dateString => {
    return new Date(dateString).toLocaleTimeString();
  };

  return (
    <View
      style={{
        width: '100%',
        alignItems: user_message ? 'flex-end' : 'flex-start',
        marginBottom: 5,        
      }}>
      <View
        style={{
          backgroundColor: user_message
            ? theme.colors.primary
            : theme.colors.secondary,
          padding: 8,
          borderTopLeftRadius: user_message ? 15 : 0,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderTopRightRadius: user_message ? 0 : 15,
          height: 'auto',
          maxWidth: '60%',
        }}>
        <TextComponent
          content={message}
          variant={'labelLarge'}
          textStyles={{color: 'white'}}
        />
        <View style={styles.dateContainer}>
          <TextComponent
            content={getTime(date)}
            variant={'labelSmall'}
            textStyles={{color: 'white'}}
          />
        </View>
      </View>
    </View>
  );
};

export default SingleMessageComponent;

const styles = StyleSheet.create({
  dateContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 4,
  },
});
