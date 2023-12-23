import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import InputComponent from '../components/InputComponent';
import {Divider, Text, useTheme} from 'react-native-paper';
import ButtonComponent from '../components/ButtonComponent';
import {getLoginToken} from '../helpers/authController';
import {getUser, setUser} from '../store/UserStore';
import {useDispatch, useSelector} from 'react-redux';
import TextComponent from '../components/TextComponent';

const LoginScreen = ({navigation}) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    if (email.length > 0 && password.length > 0) {
      var data = await getLoginToken(email.toLocaleLowerCase(), password);
      if (data['error']) {
        if (data['message'] == 'Unauthorized') {
          Alert.alert('Error', 'Please fill correct email/password.');
        } else {
          Alert.alert('Error', data['message']);
        }
      } else {
        try {
          dispatch(
            setUser({
              name: data['message']['user']['full_name'],
              token: {
                access: data['message']['access'],
                refresh: data['message']['refresh'],
              },
              id: data['message']['user']['id'],
              isLoggedIn: true,
              email: data['message']['user']['email'],
            }),
          );          
          navigation.replace('Home');
        } catch (e) {
          console.log(e);
        }
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
            label={'Email'}
            value={email}
            setValue={setEmail}
            leftIcon={'account'}
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

          <TouchableOpacity style={{width: '100%'}}>
            <TextComponent
              style={{color: theme.colors.primary}}
              variant="titleMedium">
              Forgot Password?
            </TextComponent>
          </TouchableOpacity>

          <ButtonComponent
            label={'Login'}
            isLoading={isLoading}
            onPress={handleLogin}
          />

          <Divider bold={true} />

          <ButtonComponent
            label={'Register'}
            mode={'elevated'}
            onPress={() => {
              navigation.navigate('Register');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
