import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ContactNav from './screens/components/navigator/ContactNav';
import DashNav from './screens/components/navigator/DashNav';
import GigSearch from './screens/screens/GigSearch';
import MusicianSearch from './screens/screens/MusicianSearch';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './screens/screens/ProfileScreen';
import NotificationScreen from './screens/screens/NotificationScreen';
import ChatScreen from './screens/screens/ChatScreen';
import MusicianProfile from './screens/components/MusicianProfile';
import EditGig from './screens/screens/EditGig';
import AppliedProfile from './screens/components/AppliedProfile';
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}





export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>

        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Notification' component={NotificationScreen} />
            <Stack.Screen name='DashScreen' component={BottomTab} />
            <Stack.Screen name='Chat' component={ChatScreen} />
            <Stack.Screen name='MusicianProfile' component={MusicianProfile} />
            <Stack.Screen name='EditGig' component={EditGig} />
            <Stack.Screen name='Applied' component={AppliedProfile} />
          </Stack.Navigator>
          <StatusBar style='auto' />
        </NavigationContainer>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>




    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginScreen} />
    //     <Stack.Screen name='Profile' component={ProfileScreen} />
    //     <Stack.Screen name='Notification' component={NotificationScreen} />
    //     <Stack.Screen name='DashScreen' component={BottomTab} />
    //     <Stack.Screen name='Chat' component={ChatScreen} />
    //     <Stack.Screen name='MusicianProfile' component={MusicianProfile} />
    //     <Stack.Screen name='EditGig' component={EditGig} />
    //     <Stack.Screen name='Applied' component={AppliedProfile} />
    //   </Stack.Navigator>
    //   <StatusBar style='auto' />
    // </NavigationContainer>

  );
}



function BottomTab() {
  return (
    <>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name='Home' component={DashNav} />
        <Tab.Screen name='Gigs' component={GigSearch} />
        <Tab.Screen name='Musicians' component={MusicianSearch} />
        <Tab.Screen options={{ headerShown: false }} name='Contacts' component={ContactNav} />
      </Tab.Navigator>
      <StatusBar style='light' />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
