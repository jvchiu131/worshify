import { KeyboardAvoidingView, StyleSheet, Text, View, Dimensions, Animated, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'
import LoginModal from '../components/LoginModal'
import RegisterModal from '../components/RegisterModal'
import { TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Logo from '../components/assets/Logo'
import { auth } from '../../firebase'
import { signInAnonymously } from 'firebase/auth';


const { height: screenHeight } = Dimensions.get('window');


const LoginScreen = () => {


    const navigation = useNavigation();
    const animValue = useState(new Animated.Value(-600))[0]
    const regValue = useState(new Animated.Value(-600))[0]

    const [showModal, setShowModal] = useState(false);
    const [showRegModal, setShowRegModal] = useState(false);



    const moveLoginModal = () => {
        setShowModal(true)
        moveRegBack()
        Animated.timing(animValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start()

    }

    const handleCasualUser = () => {
        signInAnonymously(auth)
            .then(() => {
                // Signed in..
                navigation.navigate('DashScreen');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
                console.log(errorCode)
                alert(errorMessage);
            });
    }

    const moveRegModal = () => {
        moveBack()
        Animated.timing(regValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
        setShowRegModal(true)
    }

    const moveBack = () => {
        Animated.timing(animValue, {
            toValue: -600,
            duration: 300,
            useNativeDriver: false
        }).start()

        setTimeout(() => {
            setShowModal(false)
        }, 300)
    }

    const moveRegBack = () => {
        Animated.timing(regValue, {
            toValue: -600,
            duration: 300,
            useNativeDriver: false
        }).start()
        setTimeout(() => {
            setShowRegModal(false)
        }, 300)
    }

    return (


        <KeyboardAvoidingView style={styles.root} >

            <View style={styles.textLogo}>
                <Logo />
                <Text style={styles.worshify}>WORSHIFY</Text>
            </View>
            <TouchableWithoutFeedback onPressOut={moveBack}>
                <Animated.View
                    style={{ ...styles.container, bottom: animValue }}
                    behavior='padding'>
                    {showModal ? (
                        <View style={styles.containerField}>
                            <LoginModal moveRegModal={moveRegModal} />
                        </View>
                    ) : (<></>
                    )}
                </Animated.View>
            </TouchableWithoutFeedback >

            <TouchableWithoutFeedback onPressOut={moveRegBack}>
                <Animated.View
                    style={{ ...styles.container, bottom: regValue }
                    }
                    behavior='padding' >
                    {showRegModal ? (
                        <View>
                            <RegisterModal moveLoginModal={moveLoginModal} />
                        </View>
                    ) : (<></>
                    )}
                </Animated.View >
            </TouchableWithoutFeedback >


            <View
                style={styles.rootbtnContainer}>
                <TouchableOpacity
                    onPress={moveLoginModal}
                    style={styles.rootbtn}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={moveRegModal}
                    style={[styles.rootbtn, styles.rootbtnOutline]}>
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCasualUser}>
                    <Text style={{ textDecorationLine: 'underline', color: '#0EB080', textAlign: 'center', paddingTop: 25 }}>
                        Continue as Casual User
                    </Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='light' />
        </KeyboardAvoidingView >


    )

}

export default LoginScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#151414',
    },
    rootbtn: {
        backgroundColor: '#0EB080',
        width: '100%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: '4%',
    },
    rootbtnOutline: {
        backgroundColor: '#F9F9F9',
        marginTop: 5,
        borderColor: '#0EB080',
        borderWidth: 2
    },
    rootbtnContainer: {
        width: "80%",
        top: '28%'
    },
    worshify: {
        color: '#F9F9F9',
        fontSize: 35,
        marginTop: '5%'
    },
    textLogo: {
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        alignItems: 'center',
        top: screenHeight / 5.5,
    },
    container: {
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: '65%',
        position: 'absolute',
        backgroundColor: '#F9F9F9',
        zIndex: 1
    },

    containerField: {
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#F9F9F9',
        zIndex: 1
    },

})