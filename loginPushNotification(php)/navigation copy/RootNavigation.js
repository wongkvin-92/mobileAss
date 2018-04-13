import { Notifications } from 'expo';
import React from 'react';
import { View, Button, Text } from 'react-native'
import { StackNavigator } from 'react-navigation';
//import Admin from '../screens/LoginAdminScreen';
//import Member from '../screens/LoginMemberScreen';
import SignUp from '../screens/SignUpScreen';
import MemberScreen from '../screens/LoginMemberScreen';
import MainTabNavigator from './MainTabNavigator';
import LoginTabNavigator from './LoginTabNavigator'
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Login:{
      screen: MemberScreen,
    },
    SignUp:{
      screen: SignUp,
    },
    Main: {
      screen: MainTabNavigator,
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
