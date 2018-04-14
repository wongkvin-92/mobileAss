import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator , TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import MemberStackNavigator from '../navigation/MemberStackNavigator';
import MemberUploadVideo from '../screens/MemberUploadVideo';
const MemberNavigator =  TabNavigator(
  {

    MemberHomeScreen: {
      screen: MemberStackNavigator,
    },

    MemberUploadVideo: {
      screen: MemberUploadVideo,
    },
  
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
