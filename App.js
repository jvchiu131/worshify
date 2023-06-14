import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactNav from './screens/components/navigator/ContactNav';
import DashNav from './screens/components/navigator/DashNav';
import GigSearch from './screens/screens/GigSearch';
import MusicianSearch from './screens/screens/MusicianSearch';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name='DashScreen' component={BottomTab} />
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
        {/* <Tab.Screen name='Profile' component={ChatNav} /> */}
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
