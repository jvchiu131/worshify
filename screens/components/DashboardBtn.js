import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DashboardBtn = () => {
    return (
        <View style={styles.root}>
            <TouchableOpacity style={styles.btnContainer}>
                <View style={styles.btn}>
                    <FontAwesome name="handshake-o" size={55} color="black" />
                    <Text>Find a Gig</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.btnContainer}>
                <View style={styles.btn}>
                    <MaterialCommunityIcons name="piano" size={55} color="black" />
                    <Text>Find a Musician</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default DashboardBtn

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '45%',
        position: 'relative'
    },
    btnContainer: {
        borderColor: '#08573f',
        borderWidth: 3,
        height: '100%',
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#10ac7c',
        borderRadius: 10
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center'
    }

})