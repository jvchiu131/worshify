import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/components/LoginScreen';
import DashScreen from './screens/components/DashScreen';
import ContactScreen from './screens/components/ContactScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/components/SearchScreen';
import ChatNavigator from './screens/components/ChatNavigator';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Home' component={BottomTabNav} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>

  );
}


function BottomTabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={DashScreen} />
      <Tab.Screen name='Search' component={SearchScreen} />
      <Tab.Screen name='Contact' component={ContactScreen} />
      <Tab.Screen name='Profile' component={ChatNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
