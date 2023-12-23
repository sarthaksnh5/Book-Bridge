import {StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

const TextComponent = ({
  content,
  variant,
  textStyles,
  ellipsizeMode,
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.baseStyle, textStyles]}
      variant={variant}>
      {content}
    </Text>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  baseStyle: {
    fontFamily: 'SpaceGrotesk-Regular',
    color: 'black',
  },
});
