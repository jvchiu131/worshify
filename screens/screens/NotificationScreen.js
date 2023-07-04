import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen')


const NotificationScreen = () => {
    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <Text style={{ color: 'white' }}>NotificationScreen</Text>
            </View>

        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    root: {
        height: screenHeight,
        width: screenWidth,
        backgroundColor: '#151414',
        borderWidth: 2,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        borderWidth: 2,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
})