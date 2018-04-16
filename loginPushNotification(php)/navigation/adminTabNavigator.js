import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import AdminHomeScreen from '../screens/AdminHomeScreen';
import AdminMemberProfile from '../screens/AdminMemberProfile';
import AdminStack from '../navigation/AdminStack'

const AdminNavigator =  TabNavigator(
  {
      AdminStack:
    {
      screen:  AdminStack
    },
    AdminMemberProfile: {
      screen: AdminMemberProfile,
    },
   /* Notifications: {
      screen: NotificationsScreen,
    },*/
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { adminRouteName } = navigation.state;
        let iconName;
        switch (adminRouteName) {
          case 'AdminStack':
            iconName = Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle';
            break;
          case 'AdminMemberProfile':
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
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

export default class AdminTabNavigator extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(<AdminNavigator screenProps={this.props} />);
  }
}
