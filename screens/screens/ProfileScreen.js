import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ProfileCard from '../components/ProfileCard';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');



const ProfileScreen = () => {

    const navigation = useNavigation();


    return (

        <View style={styles.root}>
            <View style={styles.cardContainer}>
                <ProfileCard />
            </View>

        </View>


    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    root: {
        height: screenHeight,
        width: screenWidth,
        backgroundColor: '#151414'
    },
    cardContainer: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'red',
        justifyContent: 'center'
    }

})