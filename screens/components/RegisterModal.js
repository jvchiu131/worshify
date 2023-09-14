import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native'
import React, { useState } from 'react'
import ClientReg from './ClientReg';
import MusicianReg from './MusicianReg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('screen');

const RegisterModal = ({ moveLoginModal }) => {

    const [ClientContent, setClientContent] = useState(false);
    const [MusicianContent, setMusicianContent] = useState(false);
    const ContentValue = useState(new Animated.Value(-600))[0]

    const handleClient = () => {
        Animated.timing(ContentValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
        setClientContent(true);
    }

    const handleMusician = () => {
        Animated.timing(ContentValue, {
            toValue: 0,
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
                            <Text style={styles.typeTxt}>Select Your Role!</Text>
                        </View>

                        <View
                            style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={handleClient}
                                style={styles.button}>
                                <FontAwesome5 name="user-tie" size={60} color="white" />
                                <Text style={styles.buttonText}>Client</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={handleMusician}
                                style={[styles.button, styles.buttonOutline]}>
                                <MaterialCommunityIcons name="account-music-outline" size={70} color="#0EB080" />
                                <Text style={styles.buttonOutlineText}>
                                    Musician
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <Text>Do you already have an account?</Text>
                            <TouchableOpacity onPress={() => moveLoginModal()}>
                                <Text style={{ color: "#0EB080", marginTop: 10, fontWeight: 'bold' }}>Sign in</Text>
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
        width: '100%',
        height: '100%',

    },
    regContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '15%',
    },
    RegTxt: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    typeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '7%',

    },
    typeTxt: {
        fontSize: 15,
        fontWeight: 'normal'
    },
    buttonContainer: {
        width: "100%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 40,
        flexDirection: 'row',
        bottom: '5%',

    },
    button: {
        backgroundColor: '#0EB080',
        width: '50%',
        alignItems: 'center',
        paddingVertical: '15%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0EB080'
    },
    buttonOutline: {
        backgroundColor: '#F9F9F9',
        borderColor: '#0EB080',
        borderWidth: 2,

    },
    buttonText: {
        color: '#F9F9F9',
        fontWeight: '700',
        fontSize: 16,
        marginTop: "5%",

    },
    buttonOutlineText: {
        color: '#0EB080',
        fontWeight: '700',
        fontSize: 16,
    }
})