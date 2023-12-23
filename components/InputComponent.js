import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';

const InputComponent = ({
  mode = 'outlined',
  label,
  value,
  setValue,
  leftIcon,
  isPassword = false,
  rightIcon,
  rightIconPress,
  isError = false,
  numberOfLines = 1,
  multiline,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode={mode}
        placeholder={label}
        label={label}
        value={value}
        onChangeText={setValue}
        style={[
          styles.input,
          {height: numberOfLines === 1 ? 50 : 30 * numberOfLines},
        ]}
        secureTextEntry={isPassword}
        right={
          rightIcon !== '' && (
            <TextInput.Icon icon={rightIcon} onPress={rightIconPress} />
          )
        }
        left={<TextInput.Icon icon={leftIcon} />}
        error={isError}
        numberOfLines={numberOfLines}
        multiline={numberOfLines !== 1}
      />
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    justifyContent: 'flex-start',
  },
});
