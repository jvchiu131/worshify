import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ContactScreen from '../../screens/ContactScreen'
import ChatScreen from '../../screens/ChatScreen'


const Stack = createNativeStackNavigator()

const ContactNav = () => {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Contact' component={ContactScreen} />
                <Stack.Screen name='Chat' component={ChatScreen} />
            </Stack.Navigator>
        </>
    )
}

export default ContactNav

const styles = StyleSheet.create({})