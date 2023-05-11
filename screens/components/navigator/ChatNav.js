import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../../screens/ProfileScreen';
import ChatScreen from '../../screens/ChatScreen';
import { StatusBar } from 'expo-status-bar';



const Stack = createStackNavigator();

const ChatNav = () => {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Profile' component={ProfileScreen} />
                <Stack.Screen name='Chat' component={ChatScreen} />
            </Stack.Navigator>
            <StatusBar style='light' />
        </>
    )
}

export default ChatNav

const styles = StyleSheet.create({})