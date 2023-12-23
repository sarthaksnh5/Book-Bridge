import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/ProfileScreen';
import ChangePassword from '../../screens/ChangePassword';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="About" component={ProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default ProfileStack