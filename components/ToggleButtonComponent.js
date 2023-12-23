import {View, StyleSheet} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {SegmentedButtons} from 'react-native-paper';

const ToggleButtonComponent = ({options, value, setValue, title}) => {
  return (
    <View style={styles.container}>
      <TextComponent variant="titleMedium" content={title} />
      {options !== null && options.length > 0 && (
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={options}
        />
      )}
    </View>
  );
};

export default ToggleButtonComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
});
