import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTheme} from 'react-native-paper';
import TextComponent from '../TextComponent';
import {useNavigation} from '@react-navigation/native';

const ChatHeaderComponent = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <Entypo
          name="chevron-thin-left"
          size={24}
          color={theme.colors.primary}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={styles.titleandOptionContainer}>
        <TextComponent variant={'headlineSmall'} content={'Chat Title'} />
      </View>
    </View>
  );
};

export default ChatHeaderComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    backgroundColor: 'white',
    elevation: 3,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonContainer: {
    marginRight: 10,
  },
});
