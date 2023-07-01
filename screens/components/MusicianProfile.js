import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import ProfileCard from './ProfileCard'
import MusicianDetails from './MusicianDetails';


const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');



const MusicianProfile = ({ userId }) => {


    const props = { userId: userId }


    return (
        <View style={styles.root}>

            <View style={styles.container}>
                <ProfileCard {...props} />
            </View>

            <View>
                <MusicianDetails {...props} />
            </View>

        </View>
    )
}

export default MusicianProfile

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        width: screenWidth,
    },
    container: {
        alignItems: 'center',
        height: '30%',
        padding: 15
    },

})