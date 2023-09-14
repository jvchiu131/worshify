import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import GigSearch from './screens/screens/GigSearch';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import MusicianSearch from './screens/screens/MusicianSearch';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './screens/screens/ProfileScreen';
import NotificationScreen from './screens/screens/NotificationScreen';
import MusicianProfile from './screens/components/MusicianProfile';
import EditGig from './screens/screens/EditGig';
import DashNav from './screens/components/navigator/DashNav';
import ContactNav from './screens/components/navigator/ContactNav';
import ChatScreen from './screens/screens/ChatScreen';
import AppliedProfile from './screens/components/AppliedProfile';
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, StyleSheet, Alert } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import ClientProfile from './screens/components/ClientProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    LogBox.ignoreAllLogs();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });


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
        <Stack.Screen name='ClientProfile' component={ClientProfile} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>

  );
}


function BottomTab() {
  return (

    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: styles.tabBarIconActive.color,
          tabBarInactiveTintColor: styles.tabBarIconInactive.color,

        }}
      >
        <Tab.Screen
          name='Home'
          component={DashNav}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home' size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name='Gigs'
          component={GigSearch}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name='music-circle-outline'
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Musicians'
          component={MusicianSearch}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name='account-music-outline'
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Contacts'
          component={ContactNav}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name='message-square' size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style='light' />
      <Toast
        type='success' />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    height: 55,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  tabBarIconActive: {
    color: '#0EB080',
  },
  tabBarIconInactive: {
    color: '#1E1E1E',
  },
});