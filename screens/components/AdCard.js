import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AdCard = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <View>
                <Text style={styles.textStyle}>
                    Advertisement
                </Text>
            </View>
            <View style={styles.img}>

            </View>
        </TouchableOpacity>
    )
}

export default AdCard

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
        width: '95%',
        backgroundColor: '#3C3C43',
        borderRadius: 10
    },
    img: {
        borderColor: 'red',
        height: '70%',
        width: '40%',
        borderRadius: 10,
        backgroundColor: 'green'
    },
    textStyle: {
        color: 'white'
    }
})