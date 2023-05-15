import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Header from '../components/Header';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const GigSearch = () => {
    return (
        <View style={styles.root}>
            <Header />
        </View>
    )
}

export default GigSearch

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#151414',
        height: screenHeight
    }
})