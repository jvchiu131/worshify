import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ContactScreen from '../../screens/ContactScreen'
import ChatScreen from '../../screens/ChatScreen'



const Stack = createStackNavigator();

const ContactNav = () => {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Messages' component={ContactScreen} />
                <Stack.Screen name='Chat' component={ChatScreen} />
            </Stack.Navigator>
        </>
    )
}

export default ContactNav

const styles = StyleSheet.create({})