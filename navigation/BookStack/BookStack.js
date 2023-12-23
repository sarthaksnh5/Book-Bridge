import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import SingleBookScreen from '../../screens/SingleBookScreen';

const Stack = createNativeStackNavigator();

const BookStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name="Books" component={HomeScreen} />
      <Stack.Screen name="SingleBook" component={SingleBookScreen} />
    </Stack.Navigator>
  );
};

export default BookStack;
