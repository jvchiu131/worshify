import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CardJob = () => {
    return (

        <TouchableOpacity style={styles.container}>
            <View style={styles.imageContainer}>
                <Text>Image</Text>
            </View>
            <View style={styles.textContainer}>
                <Text>TextContainer</Text>
                <Text>Job detail</Text>
                <Text>Job Location</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardJob

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '50%',
        width: '95%',
        borderRadius: 10
    },
    imageContainer: {
        borderWidth: 2,
        borderColor: 'green',
        height: '60%',
        width: '100%',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    textContainer: {
        backgroundColor: '#3C3C43',
        width: '100%',
        height: '40%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
})