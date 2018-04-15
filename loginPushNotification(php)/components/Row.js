import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
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
    <TouchableOpacity style={styles.container}
    onPress={
	props.onClick
    }

    >
    <Video source={{ uri: `http://192.168.0.101/VideoAss/images/${props.videoPath}` }}
    resizeMode="cover"
    shouldPlay={false}
    style={styles.photo}
    />

    <Text style={styles.text}
    >
    {`${props.videoId} ${props.videoName}`}
    </Text>
    </TouchableOpacity>
);

export default Row;
