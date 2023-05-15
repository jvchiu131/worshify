import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MusicianSearch from '../../screens/MusicianSearch'
import GigSearch from '../../screens/GigSearch'
import DashScreen from '../../screens/DashScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const DashNav = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={DashScreen} />
            <Stack.Screen name='Find a Musician' component={MusicianSearch} />
            <Stack.Screen name='Find a Gig' component={GigSearch} />
        </Stack.Navigator>
    )
}

export default DashNav

const styles = StyleSheet.create({})