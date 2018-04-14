import { Notifications } from 'expo';
import React from 'react';
import { View, Button, Text } from 'react-native'
import { StackNavigator } from 'react-navigation';
import Login from '../screens/LoginScreen';
import SignUp from '../screens/SignUpScreen';
import AdminTabNavigator from './AdminTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const AdminStackNavigator = StackNavigator(
  {
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

export default class AdminNavigator extends React.Component {
  render() {

    return <AdminStackNavigator />;
  }
}
