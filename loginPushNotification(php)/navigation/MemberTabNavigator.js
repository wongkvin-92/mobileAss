import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import MemberHomeScreen from '../screens/MemberHomeScreen';
import MemberUploadVideo from '../screens/MemberUploadVideo';

const MemberNavigator =  TabNavigator(
  {
    MemberHomeScreen: {
      screen: MemberHomeScreen,
    },
    MemberUploadVideo: {
      screen: MemberUploadVideo,
    },
   /* Notifications: {
      screen: NotificationsScreen,
    },*/
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { memberRouteName } = navigation.state;
        let iconName;
        switch (memberRouteName) {
          case 'MemberHomeScreen':
            iconName = Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle';
            break;
          case 'MemberUploadVideo':
            iconName = Platform.OS === 'ios'
            ? `ios-link${focused ? '' : '-outline'}`
            : 'md-link';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

export default class MemberTabNavigator extends React.Component {
  render(){
    return(<MemberNavigator screenProps={this.props} />);
  }
}
