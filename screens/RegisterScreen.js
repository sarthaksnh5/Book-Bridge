import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {Divider, } from 'react-native-paper';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';

import {registerUser} from '../helpers/authController';
import ToggleButtonComponent from '../components/ToggleButtonComponent';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFull_name] = useState('');
  const [mobile_number, setMobile_number] = useState('');
  const [user_type, setUser_type] = useState('');

  const user_options = [
    {label: 'Teacher', value:'Teacher', icon: 'human-male-board'},
    {label: 'Student', value: 'Student', icon: 'account'},
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    if (
      email.length > 0 &&
      password.length > 0 &&
      full_name.length > 0 &&
      mobile_number.length > 0 &&
      user_type.length > 0
    ) {
      var data = await registerUser(
        email,
        password,
        full_name,
        mobile_number,
        user_type,
      );
      if (data['error']) {
        Alert.alert('Error', data['message']);
      } else {
        Alert.alert('Success', 'User Successfully Registered');
        navigation.replace('Login');
      }
    } else {
      Alert.alert('Error', 'Please Fill all fields!');
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={{height: 100, width: 200}}
            resizeMode="contain"
          />
          <Divider bold={true} />
        </View>

        <View style={styles.formContainer}>
          <InputComponent
            label={'Full Name'}
            value={full_name}
            setValue={setFull_name}
            leftIcon={'account'}
          />

          <InputComponent
            label={'Mobile Number'}
            value={mobile_number}
            setValue={setMobile_number}
            leftIcon={'phone'}
          />

          <ToggleButtonComponent
            options={user_options}
            value={user_type}
            setValue={setUser_type}
            title={'Select User Type (Teacher or Student)'}
          />

          <InputComponent
            label={'Email'}
            value={email}
            setValue={setEmail}
            leftIcon={'mail'}
          />

          <InputComponent
            rightIcon={showPassword ? 'eye' : 'eye-off'}
            rightIconPress={() => {
              setShowPassword(!showPassword);
            }}
            label={'Password'}
            value={password}
            setValue={setPassword}
            isPassword={!showPassword}
            leftIcon={'lock'}
          />

          <ButtonComponent
            label={'Register'}
            isLoading={isLoading}
            onPress={handleRegister}
          />

          <Divider bold={true} />

          <ButtonComponent
            label={'Login'}
            mode={'elevated'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
});
