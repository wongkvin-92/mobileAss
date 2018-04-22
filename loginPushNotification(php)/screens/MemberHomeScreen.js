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
  View,
  Picker
} from 'react-native';

import Row from '../components/Row'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import Footer from '../components/Footer'

import { Permissions, Notifications, MailComposer } from 'expo';
const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

var hostAddr = "http://192.168.0.101/";

export default class ListViewDemo extends Component {

  static navigationOptions =
  {
     title: 'Member Home Screen',
  };

  constructor(props) {
    super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.state = {

      isLoading: true,
	    contentSearch: 'aaa',
      sortAttr: 'name',
      sortOrder: 'asc',
      arrData: [],
      dataSource:ds.cloneWithRows([])

    }
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
         .then((response) =>  { console.log(response);return response.json();})
         .then((responseJson) => {
           //console.log(responseJson);
           //this.setState({arrData: responseJson});
           //updateList();
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
         .then((response) =>  { console.log(response);return response.json();})
         .then((responseJson) => {
           //console.log(responseJson);
           var arr = [];
           if(responseJson.result == true){

             arr = responseJson;

           }
           alert(responseJson.msg);
           this.setState({arrData: arr});
            this.updateList();

           /*let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

           this.setState({
	       isLoading: false,
               dataSource: ds.cloneWithRows(responseJson),
           }, function() {
             // In this block you can do something with new state.
           });*/
         })
         .catch((error) => {
           console.error(error);
         });
  }

    showVideo(video){
      this.setState({ contentSearch : "" });
       this.props.navigation.navigate("VideoPlayer", {'video': video});
    }

    sortArray(){
      let arr = this.state.arrData;
      var attr = this.state.sortAttr;
      var order = this.state.sortOrder;
      var d = arr._dataBlob;

      console.log("sorting the list "+attr+" by "+order+" order.");

      var out = arr.sort(
          (a,b) =>{
            if(a.attr = "name"){
              if(order == "asc")
               return a.videoName > b.videoName;
              else
               return a.videoName < b.videoName;
            }else{
              if(order == "asc")
               return a.watchedNum > a.watchedNum;
              else
                return a.watchedNum < a.watchedNum;
            }
          }
      );
      out = out.reverse();

      console.log(arr);
      console.log(out);
      return out;
    }

    updateList(){
      console.log("Updating the list");
      let arr = this.sortArray();

      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(arr),
      }, function() {
        // In this block you can do something with new state.
      });

    }

    /*componentDidUpdate(){

    }*/

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
        <Picker
          selectedValue={this.state.sortAttr}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => {
              this.setState({sortAttr: itemValue });
              this.updateList();
          }

          }
            >
          <Picker.Item label="By Name" value="name" />
          <Picker.Item label="By Views" value="views" />
        </Picker>
        <Picker
          selectedValue={this.state.sortOrder}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({sortOrder: itemValue});
              this.updateList();
            }
          }>
          <Picker.Item label="Asc" value="asc" />
          <Picker.Item label="Desc" value="desc" />
        </Picker>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
	renderRow={ (d) => <Row onClick={this.showVideo.bind(this, d)} {...d} />}
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
