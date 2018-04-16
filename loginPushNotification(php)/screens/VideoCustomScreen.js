import React from 'react';
import { ScrollView, View, TouchableHighlight, Text } from 'react-native';
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

export default class VideoCustomScreen extends VideoBaseScreen {
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

    render() {
	let path = this.props.navigation.state.params.video.videoPath;
  let _data = this.props.navigation.state.params.video;
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
            		uri:  `http://192.168.0.101/VideoAss/selectSpecificVideo.php?videoName=${path}&addview=1`
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
        </ScrollView>
      </View>
    );
  }
}
