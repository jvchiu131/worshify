import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'






const ClientReg = () => {

    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate('Login')
    }


    return (
        <View>
            <Text>Client Reg</Text>


            <TouchableOpacity onPress={handleBack}>
                <Text>This is button</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ClientReg

const styles = StyleSheet.create({})