import React, { Component } from 'react';

import { AppRegistry, StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';

import { StackNavigator } from 'react-navigation';

import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';

import MemberRow from '../components/MemberRow'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import Footer from '../components/Footer'

var hostAddr = "http://192.168.0.101/";

class MainActivity extends Component {

  static navigationOptions =
  {
     title: 'Member Profile',
  };

constructor(props) {

   super(props)

   this.state = {

     TextInput_UserName: '',
     TextInput_PokemonLevel: '',
     TextInput_Password: ''
   }

 }


 InsertPokemonRecordsToServer = () =>{
	//let formData = new FormData();
	//let uri = this.state.TextInput_PokemonImage;

  //formData.append('pokemonName', this.state.TextInput_UserName);
	//formData.append('pokemonLevel', this.state.TextInput_PokemonLevel);
  //formData.append('password', this.state.TextInput_Password);
  //console.log(formData)
console.log(this.state);
      fetch( hostAddr + 'VideoAss/addMember.php', {
      method: 'POST',
  	  body: JSON.stringify({
          'pokemonName' :  this.state.TextInput_UserName,
          'pokemonLevel': this.state.TextInput_PokemonLevel,
          'password' : this.state.TextInput_Password,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      //dataType: 'json',

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

}

 GoTo_Show_PokemonList_Activity_Function = () =>
  {
    this.props.navigation.navigate('Second');

  }

  showMemberList = () => {
    console.log(this.props);
    this.props.navigation.navigate('Fourth');
  }

 render() {
   return (

<View style={styles.MainContainer}>


       <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Pokemon Creation </Text>

       <TextInput

         placeholder="Enter User Name"

         onChangeText={ TextInputValue => this.setState({ TextInput_UserName : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

      <TextInput

         placeholder="Enter Member Name"

         onChangeText={ TextInputValue => this.setState({ TextInput_PokemonLevel : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

       <TextInput

          placeholder="Enter Password"

          onChangeText={ TextInputValue => this.setState({ TextInput_Password : TextInputValue }) }

          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}
        />

      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.InsertPokemonRecordsToServer} >

        <Text style={styles.TextStyle}> ADD MEMBER TO SERVER </Text>

      </TouchableOpacity>

      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_PokemonList_Activity_Function} >

        <Text style={styles.TextStyle}> SHOW ALL MEMBER RECORDS IN LISTVIEW </Text>

      </TouchableOpacity>

      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.showMemberList.bind(this)} >

        <Text style={styles.TextStyle}> SEARCH MEMBER </Text>

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
     title: 'Member List',
  };

  componentDidMount() {

       return fetch(hostAddr + 'VideoAss/showAllMembers.php')
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

     GetStudentIDFunction=(memberId,userName, memberName, password)=>{

          this.props.navigation.navigate('Third', {

            id : memberId,
            name : userName,
            level : memberName,
            image1 : password

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
                        this, rowData.memberId,
                         rowData.userName,
                         rowData.memberName,
                         rowData.password
                         )} >

                      {rowData.userName}

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

            fetch(hostAddr + 'VideoAss/updateMemberRecord.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              memberId : this.state.TextInput_PokemonId,

              memberName : this.state.TextInput_PokemonImage,

              userName : this.state.TextInput_PokemonLevel,

              password : this.state.TextInput_PokemonImage

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

          fetch(hostAddr + 'VideoAss/deteleMember.php', {
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

            <Text style={styles.TextStyle}> UPDATE MEMBER RECORD </Text>

         </TouchableOpacity>

         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeletePokemonRecord} >

            <Text style={styles.TextStyle}> DELETE MEMBER RECORD </Text>

         </TouchableOpacity>


   </View>

      );
    }

}

class SearchMember extends Component {

  static navigationOptions =
  {
     title: 'Search Member List',
  };
  constructor(props) {
  super(props);

this.state = {

    isLoading: true,
  contentSearch: 'aaa',

  }
}

onPressButton = () => {
  console.log(this.state);
  let formData = new FormData();
   formData.append('pokemonName', this.state.contentSearch);

       fetch(hostAddr + 'VideoAss/searchMember.php', {
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
  let formData = new FormData();
    formData.append('memberName', this.state.contentSearch);
     return fetch(hostAddr +'VideoAss/showAllMembers.php',{
       method: 'POST',
       body: formData,
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data',
      }
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
         console.error(error);
       });
   }

render() {
  console.log(this.state.dataSource);
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
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <MemberRow {...data} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        renderFooter={() => <Footer />}
        renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
      />
    </View>
  );
}

}



export default MyNewProject = StackNavigator(

  {

    First: { screen: MainActivity },

    Second: { screen: ShowPokemonListActivity },

    Third: { screen: EditPokemonRecordActivity },

    Fourth: { screen: SearchMember}

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
  },

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
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },

});
