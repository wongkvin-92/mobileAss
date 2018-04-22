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


export default class ListViewDemo extends Component {

  constructor(props) {
    super(props);

	this.state = {

      isLoading: true,
	  contentSearch: 'aaa',

    }
  }

  onPressButton = () => {
	  console.log(this.state.contentSearch);
	  let formData = new FormData();
	   formData.append('videoName', this.state.contentSearch);

	       fetch('http://192.168.0.189/VideoAss/selectSpecificVideo.php', {
          method: 'POST',
          body: formData,
  			  headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json',
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

       return fetch('http://192.168.0.189/VideoAss/ShowAllVideo.php')
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

     GetVideoIDFunction=(videoId, videoName, videoDescription, watchedNum, videoPath)=>{
      this.props.navigation.navigate('ApproveVideo', {
        videoId : videoId,
        videoName : videoName,
        videoDescription : videoDescription,
        watchedNum : watchedNum,
        videoPath : videoPath

      });
}

ListViewItemSeparator = () => {
  return (
    <View
      style={{
        height: .5,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
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
        <ListView
            dataSource={this.state.dataSource}

            renderRow={(rowData) =>

              <Text style={styles.text}
                onPress={this.GetVideoIDFunction.bind(
                  this,rowData.videoId,
                  rowData.videoName,
                  rowData.videoDescription,
                  rowData.watchedNum,
                  rowData.videoPath
                  )}
              >

                  {rowData.videoId}
                  {rowData.videoName}

                </Text>}

                  renderSeparator= {this.ListViewItemSeparator}
                  renderFooter={() => <Footer />}
                  renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
        />
      </View>
    );
  }
}

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
    height: 15,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }
});
