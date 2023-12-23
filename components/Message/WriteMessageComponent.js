import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import InputComponent from '../InputComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator, useTheme} from 'react-native-paper';

const WriteMessageComponent = ({sendMessage}) => {
  const [message, setMessage] = useState('');
  const [sendLoading, setSendLoading] = useState(false);

  const theme = useTheme();

  const handleSend = async () => {
    if (message.trim() === '') return;
    setSendLoading(true);
    await sendMessage(message);
    setMessage('');
    setSendLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputComponent
          label={'Write a message...'}
          value={message}
          setValue={setMessage}
          leftIcon={'message'}
          multiline={true}
        />
      </View>
      <View style={styles.submitButtonComponent}>
        <TouchableOpacity
          style={[styles.submitButton, {backgroundColor: theme.colors.primary}]}
          onPress={handleSend}
          disabled={sendLoading}>
          {sendLoading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <MaterialCommunityIcons name="send" size={24} color={'white'} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WriteMessageComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  submitButtonComponent: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});
