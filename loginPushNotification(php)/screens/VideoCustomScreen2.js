import React from 'react';
import { ScrollView, View, TouchableHighlight, Text, Button, Alert } from 'react-native';
import VideoPlayer from '@expo/videoplayer';
import { Ionicons } from '@expo/vector-icons';
import VideoBaseScreen from './VideoBaseScreen';
import { Video } from 'expo';

var styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

var hostAddr = "http://192.168.0.101/";

export default class VideoCustomScreen2 extends VideoBaseScreen {
  static navigationOptions =
  {
     title: 'Approve Video',
  };
    constructor(props){
    	super(props);
    	this.state = {
    	    currentURL: null,
    	    onLoad: null
    	};
  }

    onLoad(){
	     console.log("onLoad: I was called!");
    }

    onApproved(id){
      let formData = new FormData();
  	   formData.append('videoId', id);

      fetch(hostAddr +'VideoAss/approveVideo.php', {
       method: 'POST',
       body: formData,
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data',
        }
      }).then( (r) => r.json() )
      .then(r => {
        console.log(r);
        Alert.alert(r.msg);
      }).catch((r)=> {console.log(r) });

   }

   onDeleteVideo(id){
     fetch(hostAddr + 'VideoAss/adminDeleteVideo.php', {
     method: 'POST',
     headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     },
     body: JSON.stringify({

       videoId: id

     })

     }).then((response) => {
       console.log(response);
       return response.json();
        }
     )
     .then((responseJson) => {

       // Showing response message coming from server after inserting records.
       Alert.alert(responseJson.msg);
       this.props.navigation.navigate("Admin");

     }).catch((error) => {
        console.error(error);
     });

   }
  render() {
      	let path = this.props.navigation.state.params.video;
        let _data = this.props.navigation.state.params.data;

          const COLOR = '#92DCE5';
          const icon = (name, size = 36) => () =>
            <Ionicons
              name={name}
              size={size}
              color={COLOR}
              style={{ textAlign: 'center' }}
            />;
          return (
            <View style={styles.container}>
              <ScrollView style={styles.container}>
              <VideoPlayer

      	videoProps={{
                    shouldPlay: false,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                  source: {
                		uri:  `http://192.168.0.101/VideoAss/selectSpecificVideo.php?videoName=${path}`
                		//uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                      //uri: 'http://www.streambox.fr/playlists/test_001/stream.m3u8',
                  },
                  isMuted: false,
              }}
                  playIcon={icon('ios-play-outline')}
                  pauseIcon={icon('ios-pause-outline')}
                  fullscreenEnterIcon={icon('ios-expand-outline', 28)}
                  fullscreenExitIcon={icon('ios-contract-outline', 28)}
                  trackImage={require('../assets/track.png')}
                  thumbImage={require('../assets/thumb.png')}
                  textStyle={{
                    color: COLOR,
                    fontSize: 12,
                  }}
                  isPortrait={this.state.isPortrait}
                  switchToLandscape={this.switchToLandscape.bind(this)}
                  switchToPortrait={this.switchToPortrait.bind(this)}
                  playFromPositionMillis={0}
                />
                <Text>VIDEO NAME : {_data.videoName}</Text>
                <Text>DESCRIPTION : {_data.videoDescription}</Text>
                <Text>NO. OF WATCHED :{_data.watchedNum}</Text>
                <Text>DATE UPLOADED : {_data.dateUploaded}</Text>
                <Button onPress={ this.onApproved.bind(this, _data.videoId) }
                  title="Approve"
                  color="#00BCD4"
                 />
                 <Button onPress={ this.onDeleteVideo.bind(this, _data.videoId) }
                   title="Delete"
                   color="#00BCD4"
                  />
              </ScrollView>
            </View>
          );
        }
      }
