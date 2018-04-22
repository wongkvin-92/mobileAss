import { Notifications } from 'expo';
import React from 'react';
import { View, Button, Text } from 'react-native'
import { StackNavigator, TabNavigator} from 'react-navigation';

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import VideoCustomScreen from '../screens/VideoCustomScreen';

import MemberHomeScreen from '../screens/MemberHomeScreen';
//import MemberUploadVideo from '../screens/MemberUploadVideo';
const _MemberStackNavigator = StackNavigator(
  {
    MemberHomeScreen: {
      screen: MemberHomeScreen
    },

        //screen: Login

    VideoPlayer:{
    	screen: VideoCustomScreen,
    	navigationOptions: {
    	    tabBarVisible: true,
    	    title: 'Video Player',
    	    headerStyle: { backgroundColor: '#2196f3' },
    	    headerTintColor: '#fff'
	    }

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

export default class MemberStackNavigator extends React.Component {
    constructor(props){
	super(props)
	this.state = {
	    videoClicked: null
	};
    }

    render() {

    return <_MemberStackNavigator
        screenProps={this.props.screenProps}
    />;
  }
}
