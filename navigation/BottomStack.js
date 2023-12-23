import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/ProfileScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import BookStack from './BookStack/BookStack';
import ChatStack from './ChatStack/ChatStack';
import ProfileStack from './ProfileStack/ProfileStack';

const BottomStackTab = createMaterialBottomTabNavigator();

const BottomStack = () => {
  return (
    <BottomStackTab.Navigator>
      <BottomStackTab.Screen
        name="Book"
        component={BookStack}
        options={{
          tabBarLabel: 'Book',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <BottomStackTab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color}) => (
            <Entypo name="chat" color={color} size={26} />
          ),
        }}
      />
      <BottomStackTab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </BottomStackTab.Navigator>
  );
};

export default BottomStack;
