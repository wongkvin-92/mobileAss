import React from 'react';
import { View, Button, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements';
import { Permissions, Notifications, MailComposer } from 'expo';

const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

export default class signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', name: '', genre: '',  error: '', token:'', loading: false };
    }
    componentDidMount(){
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS

    }
    signUpMemberPress() {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();

      var d = {
        "username" : this.state.email,

        "password" : this.state.password,

        "name" : this.state.name,

        "genre" : this.state.genre,

        "token" : this.state.token,

      };
      console.log(JSON.stringify(d));


        this.setState({ error: '', loading: true });

        const { username, password, name,  genre, token} = this.state;

        fetch('http://192.168.0.189/VideoAss/signUp.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(d)

        }).then(
          (response) => {

            var r = JSON.parse(response._bodyText);
            console.log(r);
            alert(r.msg);
            this.props.navigation.navigate('Login');

          //response.json()
            //var r = JSON.parse(response);

            }
        )

            .catch((error) => {
              console.error(error);
              //Alert.alert(error);
            });

            fetch(PUSH_ENDPOINT, {
               method: 'POST',
               headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({
          		  "to": token,
          		  "sound": "default",
          		  "body": "Hello world!",
          		  //"data": "{['DDD']}",
          		  "title": "Just for fun"
          		}),
             });

    }

    renderButtonOrLoading() {
        if (this.state.loading) {
            return <Text> Loading </Text>
        }
        return <View>

            <Button
                onPress={this.signUpMemberPress.bind(this)}
                title='Sign up'/>

        </View>

    }
    render() {
        return (
            <View>
                <FormLabel>Email</FormLabel>
                <FormInput
                 value = {this.state.email}
                 onChangeText={email => this.setState({ email })}
                 placeholder='john@icloud.com'
                 />
                <FormLabel>Password</FormLabel>
                <FormInput
                value = {this.state.password}
                secureTextEntry
                placeholder='*******'
                onChangeText={password => this.setState({ password })}
                />
                <FormLabel>Member Name</FormLabel>
                <FormInput
                value = {this.state.name}
                placeholder='Your Name'
                onChangeText={name => this.setState({ name })}
                />
                <FormLabel>Favorite Video Genre</FormLabel>
                <FormInput
                value = {this.state.genre}
                placeholder='Video Genre'
                onChangeText={genre => this.setState({ genre })}
                />
                <Text>{this.state.error}</Text>
                {this.renderButtonOrLoading()}

            </View>

        )

    }


}
