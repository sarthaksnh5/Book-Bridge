import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../../screens/ChatScreen';
import SingleChatScreen from '../../screens/SingleChatScreen';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Chats" component={ChatScreen} />
      <Stack.Screen name="SingleChat" component={SingleChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
