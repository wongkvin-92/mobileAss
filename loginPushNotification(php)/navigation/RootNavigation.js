import { Notifications } from 'expo';
import React from 'react';
import { View, Button, Text } from 'react-native'
import { StackNavigator } from 'react-navigation';
import Login from '../screens/LoginScreen';
import SignUp from '../screens/SignUpScreen';
import MainTabNavigator from './MainTabNavigator';
import AdminTabNavigator from './AdminTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Login:{
      screen: Login
    },
    SignUp:{
      screen: SignUp
    },
    Main: {
      screen: MainTabNavigator,
    },
    Admin: {
      screen: AdminTabNavigator
    },

  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  render() {

    return <RootStackNavigator />;
  }
}
