import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from './ProfileScreen';
import ChatScreen from './ChatScreen';


const Stack = createStackNavigator();

const ChatNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Chat' component={ChatScreen} />
        </Stack.Navigator>
    )
}

export default ChatNavigator

const styles = StyleSheet.create({})