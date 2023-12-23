import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import TextComponent from './TextComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HeaderComponent = () => {
  const user = useSelector(state => state?.user);
  const theme = useTheme();

  const getDayTime = () => {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
      return 'Good Morning';
    } else if (hours >= 12 && hours < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeftContainer}>
        <TextComponent
          textStyles={{color: theme.colors.primary, fontWeight: 'bold'}}
          variant={'titleSmall'}
          content={getDayTime()}
        />
        <TextComponent variant={'headlineLarge'} content={user.name} />
      </View>
      <View style={styles.headerRightContainer}>
        <FontAwesome5
          name="book-reader"
          size={55}
          color={theme.colors.primary}
        />
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerLeftContainer: {
    width: '80%',
    marginVertical: 8,
    padding: 10,
    height: '100%',
    justifyContent: 'flex-end',
  },
  headerRightContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    marginVertical: 8,
    padding: 10,
  },
});
