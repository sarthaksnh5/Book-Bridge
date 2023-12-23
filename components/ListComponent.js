import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {List} from 'react-native-paper';

const ListComponent = ({title, left, options = []}) => {
  return (
    <List.Accordion title={title} left={left}>
      {options.map(item => {
        return (
          <List.Item
            key={item.title}
            title={item.title}
            onPress={item.onPress}
          />
        );
      })}
    </List.Accordion>
  );
};

export default ListComponent;

const styles = StyleSheet.create({});
