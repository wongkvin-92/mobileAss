import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {Video} from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});


const Row = (props) => (
  <View style={styles.container}>
   <Video source={{ uri: `http://192.168.0.101/VideoAss/images/${props.videoPath}` }}
	  resizeMode="cover"
	  shouldPlay={false}
	  style={styles.photo}
	/>

    <Text style={styles.text}
    onPress={this.GetVideoIDFunction.bind(
      this,data.videoId,
      data.videoName,
      data.videoDescription,
      data.watchedNum,
      data.videoPath
      )}
  >
      {`${props.videoId} ${props.videoName}`}
    </Text>
  </View>
);

export default Row;
