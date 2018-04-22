import { Notifications } from 'expo';
import React from 'react';
import { View, Button, Text } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation';
import AdminLogin from '../screens/AdminLoginScreen';
import MemberLogin from '../screens/MemberLoginScreen';
import Login from '../screens/LoginScreen';
import SignUp from '../screens/SignUpScreen';
import AdminTabNavigator from './AdminTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

 const tabNav = TabNavigator({
 AdminLogin: {
     screen: AdminLogin
 },
 MemberLogin: {
   screen: MemberLogin
 },
},
{
  tabBarPosition: 'bottom',

});

const RootStackNavigator = StackNavigator(
  {

    Login: {
      screen: tabNav
    },
        //screen: Login
    SignUp:{
      screen: SignUp
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

    return <RootStackNavigator
              screenProps={this.props}
           />;
  }
}
