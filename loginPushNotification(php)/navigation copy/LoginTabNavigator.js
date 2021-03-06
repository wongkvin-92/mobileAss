import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import Colors from '../constants/Colors';
import LoginTabNavigator from './LoginTabNavigator';
import AdminScreen from '../screens/LoginAdminScreen';
import RootNavigation from '../navigation/RootNavigation';

export default TabNavigator(
  {
    Admin: {
      screen: AdminScreen,
    },
    Member: {
      screen: RootNavigation,
    },

  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeNameLogin } = navigation.state;
        let iconName;
        switch (routeNameLogin) {
          case 'Admin':
            iconName = Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle';
            break;
          case 'Member':
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
