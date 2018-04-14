import { Notifications } from 'expo';
import React from 'react';
import { View, Button, Text } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation';

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import MemberHomeScreen from '../screens/MemberHomeScreen';
import MemberUploadVideo from '../screens/MemberUploadVideo';
import VideoCustomScreen from '../screens/VideoCustomScreen';

const _MemberStackNavigator = StackNavigator(
  {


        //screen: Login
    VideoPlayer:{
      screen: VideoCustomScreen
    },

    /*
    Main: {
      screen: MainTabNavigator,
    },
    Video:{
      screen: VideoScreen,
    },*/
  /*
    AddVideo:{
      screen: MemberCRUDvideo,
    },*/

  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class MemberStackNavigator extends React.Component {
  render() {

    return <_MemberStackNavigator
        screenProps={this.props}
    />;
  }
}
