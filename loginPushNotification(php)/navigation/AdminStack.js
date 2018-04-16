import { Notifications } from 'expo';
import React from 'react';
import { View, Button, Text } from 'react-native'
import { StackNavigator } from 'react-navigation';
import Login from '../screens/LoginScreen';
import SignUp from '../screens/SignUpScreen';
import AdminTabNavigator from './AdminTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import VideoCustomScreen2 from '../screens/VideoCustomScreen2';
import AdminHomeScreen from '../screens/AdminHomeScreen';

const AdminStackNavigator = StackNavigator(
  {
    Admin: {
      screen: AdminHomeScreen
    },
    VideoPlayer:{
    	screen: VideoCustomScreen2,
    	navigationOptions: {
    	    tabBarVisible: true,
    	    title: 'Video Player',
    	    headerStyle: { backgroundColor: '#2196f3' },
    	    headerTintColor: '#fff'
	       }
       }
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

    return <AdminStackNavigator screenProps={this.props.screenProps}/>;
  }
}
