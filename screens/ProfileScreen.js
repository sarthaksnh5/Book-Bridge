import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import ListComponent from '../components/ListComponent';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {userLogout} from '../store/UserStore';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View>
      <HeaderComponent />
      <ListComponent title={'Messages'} />
      <ListComponent title={'Legal'} />
      <ListComponent title={'About'} />
      <ListComponent
        title={'Setting'}
        options={[
          {title: 'Change Password', onPress: () => {
            navigation.navigate('ChangePassword')
          }},
          {
            title: 'Logout',
            onPress: () => {
              dispatch(userLogout());
              navigation.replace('Login');
            },
          },
        ]}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
