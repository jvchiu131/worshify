import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from './ProfileScreen';
import { TouchableOpacity } from 'react-native';




const Stack = createStackNavigator();

const ChatScreen = () => {


    return (
        <View>
            <Text>
                ChatScreen
            </Text>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})