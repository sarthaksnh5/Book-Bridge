import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

const ButtonComponent = ({mode='contained',label, isLoading = false, onPress}) => {
  return (
    <View style={styles.container}>
      <Button
        style={{width: '100%'}}
        loading={isLoading}
        mode={mode}
        disabled={isLoading}
        onPress={onPress}>
        {label}
      </Button>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
});
