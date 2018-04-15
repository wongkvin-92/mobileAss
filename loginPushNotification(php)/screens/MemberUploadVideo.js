import React, { Component } from 'react';

import { StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';

import { StackNavigator } from 'react-navigation';

import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';

var hostAddr = "http://192.168.0.101/";

class VideoUpload extends Component {

    static navigationOptions =
	{
	    title: 'Video Upload',
	};

    constructor(props) {

	super(props)

	this.state = {

	    TextInput_VideoName: '',
	    TextInput_Description: '',
	    TextInput_VideoPath: '',

	}

    }

    _pickImage = async () => {
	let pickerResult = await ImagePicker.launchImageLibraryAsync({
	    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
	    allowsEditing: true,

	    aspect: [4, 3],
	});

	console.log(pickerResult);

	this.setState({ TextInput_VideoPath : pickerResult.uri })

    };

    InsertPokemonRecordsToServer = () =>{
	let formData = new FormData();
	let uri = this.state.TextInput_VideoPath;

	formData.append('name', this.state.TextInput_VideoName);
	formData.append('description', this.state.TextInput_Description);
	//formData.append('pokemonImage', this.state.TextInput_PokemonImage);
	formData.append('path', {
	    uri,
	    name: `${uri}`,
	    type: 'video/mp4',
	});
	
	if(uri.length == 0){
	    Alert.alert("Please select a video");
	    return;
	}
	
	fetch(hostAddr + 'VideoAss/addVideo.php', {
	    method: 'POST',
	    body: formData,
	    headers: {
		'Accept': 'application/json',
		'Content-Type': 'multipart/form-data',
	    },

	}).then((response) => response.json())
          .then((responseJson) => {
              // Showing response message coming from server after inserting records.
              Alert.alert(responseJson);
          }).catch((error) => {
              console.error(error);
          });

    }

    GoTo_Show_PokemonList_Activity_Function = () =>
	{
	    this.props.navigation.navigate('Second');

	}

    render() {
	return (

	    <View style={styles.MainContainer}>


	    <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> </Text>

	    <TextInput

            placeholder="Enter Video Name"

            onChangeText={ TextInputValue => this.setState({ TextInput_VideoName : TextInputValue }) }

            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
	    />

	    <TextInput

            placeholder="Enter Description"

            onChangeText={ TextInputValue => this.setState({ TextInput_Description : TextInputValue }) }

            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
	    />



	    <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this._pickImage} >

            <Text style={styles.TextStyle}> SELECT VIDEOS </Text>

	    </TouchableOpacity>

	    <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.InsertPokemonRecordsToServer} >

            <Text style={styles.TextStyle}> INSERT VIDEOS RECORD TO SERVER </Text>

	    </TouchableOpacity>

	    <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_PokemonList_Activity_Function} >

            <Text style={styles.TextStyle}> VIDEO RECORDS LISTVIEW </Text>

	    </TouchableOpacity>


	    </View>

	);
    }
}

class ShowVideoList extends Component {

    constructor(props) {

	super(props);

	this.state = {

	    isLoading: true

	}
    }

    static navigationOptions =
	{
	    title: 'Show Video List',
	};

    componentDidMount() {

	return fetch(hostAddr + '/VideoAss/ShowAllVideo.php')
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

    GetStudentIDFunction=(videoId, videoName, videoDescription, videoPath)=>{

        this.props.navigation.navigate('Third', {

            id : videoId,
            name : videoName,
            level : videoDescription,
            image1 : videoPath

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

            <View style={styles.MainContainer_For_Show_PokemonList_Activity}>

            <ListView

            dataSource={this.state.dataSource}

            renderSeparator= {this.ListViewItemSeparator}

            renderRow={ (rowData) => <Text style={styles.rowViewContainer}

                onPress={this.GetStudentIDFunction.bind(
                    this, rowData.videoId,
                    rowData.videoName,
                    rowData.videoDescription,
                    rowData.videoPath
                )} >

                {rowData.videoName}

                </Text> }

            />

            </View>
	);
    }

}

class EditVideoRecord extends Component {

    constructor(props) {

	super(props)

	this.state = {

            TextInput_VideoId: '',
            TextInput_VideoName: '',
            TextInput_Description: '',
            TextInput_VideoPath: '',

	}

    }

    componentDidMount(){

	// Received Student Details Sent From Previous Activity and Set Into State.
	this.setState({
            TextInput_VideoId : this.props.navigation.state.params.id,
            TextInput_VideoName: this.props.navigation.state.params.name,
            TextInput_Description: this.props.navigation.state.params.level,
            TextInput_VideoPath: this.props.navigation.state.params.image1,
	})

    }

    static navigationOptions =
	{
	    title: 'Edit Video Record',
	};

    UpdatePokemonRecord = () =>{

        fetch(hostAddr + '/VideoAss/updateVideoMember.php', {
            method: 'POST',
            headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
            },
            body: JSON.stringify({

		videoId : this.state.TextInput_VideoId,

		videoName : this.state.TextInput_VideoName,

		videoDescription : this.state.TextInput_Description,

		videoPath : this.state.TextInput_VideoPath

            })

        }).then((response) => response.json())
          .then((responseJson) => {

              // Showing response message coming from server updating records.
              Alert.alert(responseJson);

          }).catch((error) => {
              console.error(error);
          });

    }


    DeletePokemonRecord = () =>{

        fetch(hostAddr + '/VideoAss/deleteVideoMember.php', {
            method: 'POST',
	    /*
            headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
            },*/
	    dataType: 'json',
            body: JSON.stringify({

		videoId : this.state.TextInput_VideoId

            })

        }).then((response) => {
	    console.log(response);
	    return response.json();
	})
          .then((responseJson) => {

              // Showing response message coming from server after inserting records.
              Alert.alert(responseJson.msg);
          }).catch((error) => {
              console.error(error);
          });

        this.props.navigation.navigate('First');

    }

    render() {

	return (

	    <View style={styles.MainContainer}>

            <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> </Text>

            <TextInput

            placeholder="Video Name "

            value={this.state.TextInput_VideoName}

            onChangeText={ TextInputValue => this.setState({ TextInput_VideoName : TextInputValue }) }

            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
            />

            <TextInput

            placeholder="Description"

            value={this.state.TextInput_Description}

            onChangeText={ TextInputValue => this.setState({ TextInput_Description : TextInputValue }) }

            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
            />

            <TextInput

            placeholder="Video"

            value={this.state.TextInput_VideoPath}

            onChangeText={ TextInputValue => this.setState({ TextInput_VideoPath : TextInputValue }) }

            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
            />

            <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdatePokemonRecord} >

            <Text style={styles.TextStyle}> UPDATE VIDEO RECORD </Text>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeletePokemonRecord} >

            <Text style={styles.TextStyle}> DELETE CURRENT RECORD </Text>

            </TouchableOpacity>


	    </View>

	);
    }

}

export default MyNewProject = StackNavigator(

    {

	First: { screen: VideoUpload },

	Second: { screen: ShowVideoList },

	Third: { screen: EditVideoRecord }

    });

const styles = StyleSheet.create({

    MainContainer :{

	alignItems: 'center',
	flex:1,
	paddingTop: 30,
	backgroundColor: '#fff'

    },

    MainContainer_For_Show_StudentList_Activity :{

	flex:1,
	paddingTop: (Platform.OS == 'ios') ? 20 : 0,
	marginLeft: 5,
	marginRight: 5

    },

    TextInputStyleClass: {

	textAlign: 'center',
	width: '90%',
	marginBottom: 7,
	height: 40,
	borderWidth: 1,
	borderColor: '#FF5722',
	borderRadius: 5 ,

    },

    TouchableOpacityStyle: {

	paddingTop:10,
	paddingBottom:10,
	borderRadius:5,
	marginBottom:7,
	width: '90%',
	backgroundColor: '#00BCD4'

    },

    TextStyle:{
	color:'#fff',
	textAlign:'center',
    },

    rowViewContainer: {
	fontSize: 20,
	paddingRight: 10,
	paddingTop: 10,
	paddingBottom: 10,
    }

});
