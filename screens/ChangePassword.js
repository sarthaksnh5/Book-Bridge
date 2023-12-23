import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../components/HeaderComponent';
import {Divider} from 'react-native-paper';
import {changePasswordController} from '../helpers/authController';
import {useDispatch, useSelector} from 'react-redux';
import {userLogout} from '../store/UserStore';
import {useNavigation} from '@react-navigation/native';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';

const ChangePassword = () => {
  const [old_password, setOld_password] = useState('');
  const [new_password, setNew_password] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (old_password.length > 0 && new_password.length > 0) {
      setIsLoading(true);
      try {
        var response = await changePasswordController(
          user['token']['access'],
          old_password,
          new_password,
        );

        if (response['error']) {
          if (response['error'] === 'Unauthorized') {
            Alert.alert('Error', 'Token Expired!');
            dispatch(userLogout());
            navigation.replace('Login');
          } else {
            Alert.alert('Error', response['message']);
          }
        } else {
          Alert.alert('Success', 'Password Changed! Please Login again!');
          dispatch(userLogout());
          navigation.replace('Login');
        }
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    } else {
      Alert.alert('Error', 'Please fill all fields!');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <Divider bold={true} />
      <View style={styles.passwordContainer}>
        <InputComponent
          label={'Old Password'}
          value={old_password}
          setValue={setOld_password}
          isPassword={true}
          leftIcon={'lock'}
        />
        <InputComponent
          label={'New Password'}
          value={new_password}
          setValue={setNew_password}
          isPassword={true}
          leftIcon={'lock'}
        />

        <ButtonComponent
          label={'Submit'}
          isLoading={isLoading}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    // alignItems: 'center',
  },
  passwordContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 8,
  },
});
