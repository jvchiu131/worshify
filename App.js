import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/components/screens/LoginScreen';
import DashScreen from './screens/components/screens/DashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ClientReg from './screens/components/ClientReg';
import MusicianReg from './screens/components/MusicianReg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/components/screens/SearchScreen';
import ContactScreen from './screens/components/screens/ContactScreen';
import ProfileScreen from './screens/components/screens/ProfileScreen';
import ChatNav from './screens/components/navigator/ChatNav';


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
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Home' component={DashScreen} />
      <Tab.Screen name='Search' component={SearchScreen} />
      <Tab.Screen name='Contact' component={ContactScreen} />
      <Tab.Screen name='Profile' component={ChatNav} />
    </Tab.Navigator>
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
