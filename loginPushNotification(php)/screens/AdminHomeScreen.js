/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  Button,
  ActivityIndicator,
  TextInput,
  Alert,
  View
} from 'react-native';

import Row from '../components/Row'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import Footer from '../components/Footer'

var hostAddr = "http://192.168.0.101/";

export default class AdminHomeScreen extends Component {

  static navigationOptions =
  {
     title: 'Home Screen',
  };

  constructor(props) {
    super(props);

	this.state = {

      isLoading: true,
	  contentSearch: 'aaa',

    }
  }

  componentDidMount() {

    this.listener = Expo.Notifications.addListener(this.handleNotification);

  }
   //before i move to another page
    componentWillUnmount() {
    this.listener && this.listener.remove();
    }

    handleNotification = ({ origin, data }) => {

    };

  onPressButton = () => {
	  console.log(this.state.contentSearch);
	  let formData = new FormData();
	   formData.append('videoName', this.state.contentSearch);

	       fetch(hostAddr +'VideoAss/searchVideo.php', {
          method: 'POST',
          body: formData,
  			  headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'multipart/form-data',
			     },
			  })
         .then((response) => response.json())
         .then((responseJson) => {
           let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           this.setState({
			   isLoading: false,
             dataSource: ds.cloneWithRows(responseJson),
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {

         });
  }

  componentDidMount() {

    this.listener = Expo.Notifications.addListener(this.handleNotification);

       return fetch(hostAddr +'VideoAss/showAllVideo.php')
         .then((response) => response.json())
         .then((responseJson) => {
           let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           this.setState({
	       isLoading: false,
               dataSource: ds.cloneWithRows(responseJson),
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
  }

  componentWillUnmount() {
  this.listener && this.listener.remove();
  }

  handleNotification = ({ origin, data }) => {

  };

    showVideo(video){
      console.log(this.props);
      //this.props.navigations.navigate("AdminHomeScreen", {},
    //      NavigationActions.navigate({"VideoPlayer"})
    //);
       this.props.navigation.navigate("VideoPlayer", {'video': video.videoPath, 'data': video});
    }

  render() {

	  if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }

    return (
      <View style={styles.container}>
    		<TextInput
    		  style={styles.input}
    		  placeholder="Search Text..."
    		  onChangeText={(text) => this.setState({ contentSearch : text })}
    		/>
    		<Button
    		  onPress={this.onPressButton}
    		  title="Search"
    		  color="#841584"
    		  accessibilityLabel="Learn more about this purple button"
    		/>
        <Button
    		  onPress={this.props.screenProps.onLogoutPress}
    		  title="Logout"
    		  color="#841584"
    		/>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
	         renderRow={ (d) => <Row onClick={this.showVideo.bind(this, d) } {...d} />}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderFooter={() => <Footer />}
          renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
        />
      </View>
    );
  }
  }

    //renderRow={(data) => <Row {...data} />}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#8E8E8E',
    },
    input: {
      height: 60,

      paddingHorizontal: 8,
      fontSize: 15,
      backgroundColor: '#FFFFFF',
      borderRadius: 2,
    },
});
