import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'


const RegisterModal = () => {

    const navigation = useNavigation();

    const handleClient = () => {
        navigation.navigate('Client')
    }

    const handleMusician = () => {
        navigation.navigate('Musician')
    }

    return (
        <View style={styles.container}>
            <View style={styles.regContainer}>
                <Text style={styles.RegTxt}>Register</Text>
            </View>

            <View style={styles.typeContainer}>
                <Text style={styles.typeTxt}>Who are you?</Text>
            </View>

            {/* Registration Fields */}


            <View
                style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleClient}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Client</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleMusician}
                    style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Musician</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default RegisterModal

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: '100%'
    },
    regContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '20%',
    },
    RegTxt: {
        fontSize: 24,
        fontWeight: 'bold'

    },
    typeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '10%',

    },
    typeTxt: {
        fontSize: 20,
        fontWeight: 'normal'

    },
    // inputContainer: {
    //     width: '80%',
    //     marginBottom: '5%',
    // },
    // input: {
    //     backgroundColor: '#F9F9F9',
    //     paddingHorizontal: 15,
    //     paddingVertical: 10,
    //     borderRadius: 25,
    //     marginTop: 5,
    //     borderWidth: 2,
    //     borderColor: '#0EB080',
    //     paddingVertical: 15,
    // },
    // Ftext: {
    //     fontSize: 12,
    //     textAlign: 'right',
    //     color: '#32324D',
    //     marginTop: '3%'
    // },
    buttonContainer: {
        width: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        flexDirection: 'row',
        bottom: '5%',

    },
    button: {
        flex: 2,
        backgroundColor: '#0EB080',
        width: '100%',
        padding: 15,
        alignItems: 'center',
        paddingVertical: '20%',
        borderWidth: 2,
        borderColor: '#0EB080'
    },
    buttonOutline: {
        backgroundColor: '#F9F9F9',
        borderColor: '#0EB080',

    },
    buttonText: {
        color: '#F9F9F9',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#0EB080',
        fontWeight: '700',
        fontSize: 16
    }
})