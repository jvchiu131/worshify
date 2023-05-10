import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'




const ProfileScreen = () => {

    const navigation = useNavigation();


    return (
        <SafeAreaView>
            <View>
                <Text>
                    ProfileScreen
                </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Chat') }}>
                    <Text>
                        button to chat screen
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default ProfileScreen

const styles = StyleSheet.create({})