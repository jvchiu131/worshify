import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatScreen from './ChatScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Stack = createStackNavigator();

const ProfileScreen = () => {
    const navigation = useNavigation();


    return (
        <View>
            <Text>
                Profile Screen
            </Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Chat') }}>
                <Text>
                    To chat screen button
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})