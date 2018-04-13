import { Permissions, Notifications, MailComposer } from 'expo';


const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

export default (async function registerForPushNotificationsAsync() {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  return fetch(PUSH_ENDPOINT, {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
		  "to": token,
		  "sound": "default",
		  "body": "Successfully Signed Up! \nVerificaton Code: \"4444\" ",
		  //"data": "{['DDD']}",
		  "title": "Sign Up Verification code!"
		}),
   });
});
