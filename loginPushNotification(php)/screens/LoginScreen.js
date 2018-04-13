import React from 'react';
import { View, Button, Text } from 'react-native';
import MainTaNavigator from '../navigation/MainTabNavigator';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements';
import { Permissions, Notifications, MailComposer } from 'expo';

export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: 'Test@test.com', password: '123456', error: '', loading: false };
    }
    componentDidMount() {

      this.listener = Expo.Notifications.addListener(this.handleNotification);

    }
     //before i move to another page
      componentWillUnmount() {
      this.listener && this.listener.remove();
      }

      handleNotification = ({ origin, data }) => {

      };


    onLoginPressAdmin() {

        this.setState({ error: '', loading: true });

        const { email, password } = this.state;

        fetch('http://10.125.192.47/VideoAss/loginAdmin.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify({

          username : this.state.email,

          userPassword : this.state.password

        })

        }).then((response) => response.json())
            .then((responseJson) => {

              // Showing response message coming from server updating records.
              Alert.alert(responseJson);

              this.props.navigation.navigate('Main');

            }).catch((error) => {
              console.error(error);
              Alert.alert(error);
            });

    }

    onLoginPressMember() {

        this.setState({ error: '', loading: true });

        const { email, password } = this.state;

        fetch('http://10.125.192.47/VideoAss/loginMember.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify({

          username : this.state.email,

          userPassword : this.state.password

        })

        }).then((response) => response.json())
            .then((responseJson) => {

              // Showing response message coming from server updating records.
              Alert.alert(responseJson);

              this.props.navigation.navigate('Main');

            }).catch((error) => {
              console.error(error);
              Alert.alert(error);
            });

    }

    onSignUpPress() {
      //  this.setState({ error: '', loading: true });
      //const { email, password } = this.state;
        this.props.navigation.navigate('SignUp');


    }

    renderButtonOrLoading() {
        if (this.state.loading) {
            return <Text> Loading </Text>
        }
        return <View>
            <Button
                onPress={this.onLoginPressAdmin.bind(this)}
                title='Login As Admin'/>
            <Button
                onPress={this.onLoginPressMember.bind(this)}
                title='Login As Member'/>

            <Button
                onPress={this.onSignUpPress.bind(this)}
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
                <Text>{this.state.error}</Text>
                {this.renderButtonOrLoading()}

            </View>

        )

    }


}
