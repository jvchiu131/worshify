import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const ClientDashboard = () => {
    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <Text>Client Dashboard</Text>
            </View>
        </View>
    )
}

export default ClientDashboard

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        justifyContent: 'flex-start',
        borderWidth: 2,
        borderColor: 'red'
    },
    container: {
        height: '100%',
        borderWidth: 2,
        borderColor: 'white'
    }
})