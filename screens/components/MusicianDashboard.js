import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'


const { height: screenHeight } = Dimensions.get("screen");
const { width: screenWidth } = Dimensions.get("screen");

const MusicianDashboard = () => {
    return (
        <View style={styles.root}>
            <Text>MusicianDashboard</Text>
        </View>
    )
}

export default MusicianDashboard

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        alignItems: 'center'
    }
})