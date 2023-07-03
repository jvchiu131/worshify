import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='Notification' component={NotificationScreen} />
        <Stack.Screen name='DashScreen' component={BottomTab} />
        <Stack.Screen name='Chat' component={ChatScreen} />
        <Stack.Screen name='MusicianProfile' component={MusicianProfile} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>

  );
}



function BottomTab() {
  return (
    <>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name='Home' component={DashNav} />
        <Tab.Screen name='Gigs' component={GigSearch} />
        <Tab.Screen name='Musicians' component={MusicianSearch} />
        <Tab.Screen options={{ headerShown: false }} name='Messages' component={ContactNav} />
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
