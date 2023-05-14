import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/screens/LoginScreen';
import DashScreen from './screens/screens/DashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ClientReg from './screens/components/ClientReg';
import MusicianReg from './screens/components/MusicianReg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/screens/SearchScreen';
import ContactScreen from './screens/screens/ContactScreen';
import ProfileScreen from './screens/screens/ProfileScreen';
import ChatNav from './screens/components/navigator/ChatNav';
import ContactNav from './screens/components/navigator/ContactNav';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (


    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name='Home' component={BottomTab} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>

  );
}

function BottomTab() {
  return (
    <>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name='Home' component={DashScreen} />
        <Tab.Screen options={{ headerShown: false }} name='Messages' component={ContactNav} />
        <Tab.Screen name='Profile' component={ChatNav} />
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
