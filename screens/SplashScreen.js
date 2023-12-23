import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Divider, useTheme} from 'react-native-paper';

const SplashScreen = ({navigation}) => {
  const theme = useTheme();
  var user = useSelector(state => {
    // console.log(state)
    return state?.user;
  });

  const checkForUser = () => {
    setTimeout(() => {
      if (user?.isLoggedIn) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    }, 1000);
  };

  useEffect(() => {
    checkForUser();

    return () => {};
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View>
        <Image
          source={require('../assets/logo.png')}
          style={{height: 100, width: 200}}
          resizeMode="contain"
        />
        <Divider theme={theme} bold={true} />
        <ActivityIndicator color={theme.colors.primary} size={'large'} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
