import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native'
import React, { useState } from 'react'
import ClientReg from './ClientReg';
import MusicianReg from './MusicianReg';

const { width: screenWidth } = Dimensions.get('screen');

const RegisterModal = () => {

    const [ClientContent, setClientContent] = useState(false);
    const [MusicianContent, setMusicianContent] = useState(false);
    const ContentValue = useState(new Animated.Value(-600))[0]

    const handleClient = () => {
        Animated.timing(ContentValue, {
            toValue: screenWidth / -2,
            duration: 300,
            useNativeDriver: false,
        }).start()
        setClientContent(true);
    }

    const handleMusician = () => {
        Animated.timing(ContentValue, {
            toValue: screenWidth / -2,
            duration: 300,
            useNativeDriver: false,
        }).start()
        setMusicianContent(true);
    }


    return (
        <View style={styles.root}>
            {ClientContent ? (
                <Animated.View
                    style={{ ...styles.container, right: ContentValue }}>
                    {ClientContent ? (
                        <ClientReg />
                    ) : null}
                </Animated.View>
            ) : MusicianContent ? (
                <Animated.View
                    style={{ ...styles.container, right: ContentValue }}>
                    {MusicianContent ? (
                        <MusicianReg />
                    ) : null}
                </Animated.View>
            ) :
                (

                    <View style={styles.container}>
                        <View style={styles.regContainer}>
                            <Text style={styles.RegTxt}>Register</Text>
                        </View>

                        <View style={styles.typeContainer}>
                            <Text style={styles.typeTxt}>Who are you?</Text>
                        </View>

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
                )}

        </View>


    )
}

export default RegisterModal

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        position: 'absolute',
        width: '100%',
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