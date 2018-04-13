import React from 'react';
import { ExpoConfigView } from '@expo/samples';

import { View, Button, Text } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'

export default class SettingsScreen extends React.Component {

	constructor(props) {
        super(props);
        this.state = { name: '', level: ''};
    }

  static navigationOptions = {
    title: 'app.json',
  };

  onLoginPress() {
        this.setState({ error: '', loading: true });

        const { name, level } = this.state;

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

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
		<View>
                <FormLabel>Email</FormLabel>
                <FormInput
                 value = {this.state.name}
                 onChangeText={name => this.setState({ name })}
                 placeholder='john@icloud.com'
                 />
                <FormLabel>Password</FormLabel>
                <FormInput
                value = {this.state.level}
                secureTextEntry
                placeholder='*******'
                onChangeText={level => this.setState({ level })}
                />
                <Button
                onPress={this.onLoginPress.bind(this)}
                title='Send Notification'/>

            </View>
	);
  }
}
