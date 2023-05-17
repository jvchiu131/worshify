import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');


const ProfileCard = () => {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.container}>
                <View style={styles.imgStyle}>

                </View>
                <View style={styles.textContainer}>
                    <View>
                        <Text style={styles.textName}>
                            David Donguines
                        </Text>

                    </View>
                    <View></View>
                    <View></View>
                </View>
            </View>
        </View>
    )
}

export default ProfileCard

const styles = StyleSheet.create({
    rootContainer: {
        borderWidth: 2,
        borderColor: 'green',
        height: '70%',
        width: '90%',
        borderRadius: 10,
        top: screenHeight / 15,
        backgroundColor: '#0FAC7DCC',
        justifyContent: 'flex-end'
    },
    imgStyle: {
        height: '80%',
        width: '25%',
        backgroundColor: 'white',
        borderRadius: 150
    },
    container: {
        height: '50%',
        width: '100%',
        borderWidth: 2,
        borderColor: 'red',
        marginBottom: '10%',
        flexDirection: 'row',
        alignItems: 'center'

    },
    textContainer: {
        borderWidth: 2,
        borderColor: 'blue',
        height: '100%',
        width: '75%'
    },
    textName: {
        color: 'white',
        fontSize: '20%',
        fontWeight: 'bold'
    }
})