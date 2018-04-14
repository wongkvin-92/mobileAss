import React, { Component } from 'react';

import { StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';

import { StackNavigator } from 'react-navigation';

import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';

 var hostAddr = "http://192.168.0.101";

class MainActivity extends Component {

  static navigationOptions =
  {
     title: 'MainActivity',
  };

constructor(props) {

   super(props)

   this.state = {

     TextInput_PokemonName: '',
     TextInput_PokemonLevel: '',
     TextInput_PokemonImage: '',

   }

 }

 _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
	  allowsEditing: true,

      aspect: [4, 3],
    });

	console.log(pickerResult);

	this.setState({ TextInput_PokemonImage : pickerResult.uri })

  };

 InsertPokemonRecordsToServer = () =>{
	let formData = new FormData();
	let uri = this.state.TextInput_PokemonImage;

  formData.append('pokemonName', this.state.TextInput_PokemonName);
	formData.append('pokemonLevel', this.state.TextInput_PokemonLevel);
	//formData.append('pokemonImage', this.state.TextInput_PokemonImage);
	formData.append('pokemonImage', {
    uri,
    name: `${uri}`,
    type: 'video/mp4',
  });
	console.log(uri+'SSS');
      fetch( hostAddr + '/ReactNative/InsertPokemonData.php', {
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


       <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Pokemon Creation </Text>

       <TextInput

         placeholder="Enter Pokemon Name"

         onChangeText={ TextInputValue => this.setState({ TextInput_PokemonName : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

      <TextInput

         placeholder="Enter Pokemon Level"

         onChangeText={ TextInputValue => this.setState({ TextInput_PokemonLevel : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />



	   <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this._pickImage} >

        <Text style={styles.TextStyle}> SELECT VIDEOS </Text>

      </TouchableOpacity>

      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.InsertPokemonRecordsToServer} >

        <Text style={styles.TextStyle}> INSERT POKEMON RECORD TO SERVER </Text>

      </TouchableOpacity>

      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_PokemonList_Activity_Function} >

        <Text style={styles.TextStyle}> SHOW ALL INSERTED POKEMON RECORDS IN LISTVIEW </Text>

      </TouchableOpacity>


</View>

   );
 }
}

class ShowPokemonListActivity extends Component {

  constructor(props) {

    super(props);

    this.state = {

      isLoading: true

    }
  }

  static navigationOptions =
  {
     title: 'ShowPokemonListActivity',
  };

  componentDidMount() {

       return fetch( hostAddr + '/ReactNative/ShowAllPokemonList.php')
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

     GetStudentIDFunction=(pokemonId,pokemonName, pokemonLevel,pokemonImage)=>{

          this.props.navigation.navigate('Third', {

            id : pokemonId,
            name : pokemonName,
            level : pokemonLevel,
            image1 : pokemonImage

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
                        this, rowData.pokemonId,
                         rowData.pokemonName,
                         rowData.pokemonLevel,
                         rowData.pokemonImage
                         )} >

                      {rowData.pokemonName}

                      </Text> }

          />

        </View>
      );
    }

}

class EditPokemonRecordActivity extends Component {

  constructor(props) {

       super(props)

       this.state = {

         TextInput_PokemonId: '',
         TextInput_PokemonName: '',
         TextInput_PokemonLevel: '',
         TextInput_PokemonImage: '',

       }

     }

     componentDidMount(){

      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({
        TextInput_PokemonId : this.props.navigation.state.params.id,
        TextInput_PokemonName: this.props.navigation.state.params.name,
        TextInput_PokemonLevel: this.props.navigation.state.params.level,
        TextInput_PokemonImage: this.props.navigation.state.params.image1,
      })

     }

    static navigationOptions =
    {
       title: 'EditPokemonRecordActivity',
    };

    UpdatePokemonRecord = () =>{

            fetch( hostAddr + '/ReactNative/UpdatePokemonRecord.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              pokemonId : this.state.TextInput_PokemonId,

              pokemonName : this.state.TextInput_PokemonName,

              pokemonLevel : this.state.TextInput_PokemonLevel,

              pokemonImage : this.state.TextInput_PokemonImage

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

          fetch( hostAddr + '/ReactNative/DeletePokemonRecord.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            pokemonId : this.state.TextInput_PokemonId

          })

          }).then((response) => response.json())
          .then((responseJson) => {

            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);

          }).catch((error) => {
             console.error(error);
          });

          this.props.navigation.navigate('First');

      }

    render() {

      return (

   <View style={styles.MainContainer}>

          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit Pokemon Record Form </Text>

          <TextInput

            placeholder="Pokemon Name Shows Here"

            value={this.state.TextInput_PokemonName}

            onChangeText={ TextInputValue => this.setState({ TextInput_PokemonName : TextInputValue }) }

            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
          />

         <TextInput

            placeholder="Pokemon Level Shows Here"

            value={this.state.TextInput_PokemonLevel}

            onChangeText={ TextInputValue => this.setState({ TextInput_PokemonLevel : TextInputValue }) }

            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
          />

         <TextInput

            placeholder="Pokemon Image Shows Here"

            value={this.state.TextInput_PokemonImage}

            onChangeText={ TextInputValue => this.setState({ TextInput_PokemonImage : TextInputValue }) }

            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
          />

         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdatePokemonRecord} >

            <Text style={styles.TextStyle}> UPDATE POKEMON RECORD </Text>

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

    First: { screen: MainActivity },

    Second: { screen: ShowPokemonListActivity },

    Third: { screen: EditPokemonRecordActivity }

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
