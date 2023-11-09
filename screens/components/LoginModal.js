import { StyleSheet, Text, View, Animated } from 'react-native'
import { Stack, TextInput, IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'


const LoginModal = ({ moveRegModal }) => {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const navigation = useNavigation();




    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {


                // Signed in 
                const user = userCredential.user;
                if (user.emailVerified) {
                    navigation.navigate('DashScreen');
                } else {
                    alert('Please verify your email!')
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    const handleFocus = () => {
        setIsFocused(true); // Change the color to a different value upon selection
    };

    const handleBlur = () => {
        setIsFocused(false)
        //setIconColor('#606060'); // Reset the color to the original value upon deselection
    };

    return (
        <View style={styles.container}>
            <View style={styles.LogContainer}>
                <Text style={styles.LogTxt}>Login</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    label="Username"
                    variant="outlined"
                    value={email}
                    onChangeText={text => setEmail(text.replace(/\s+/g, ''))}
                    onKeyPress={e => {
                        if (e.nativeEvent.key === ' ') {
                            e.preventDefault();
                        }
                    }}
                    color={isFocused || email ? '#0EB080' : '#606060'}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    trailing={props =>
                        <Icon name="account"
                            style={{ color: isFocused || email ? '#0EB080' : '#606060' }}
                            {...props} />}
                />
                <TextInput
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChangeText={text => setPassword(text.replace(/\s+/g, ''))}
                    onKeyPress={e => {
                        if (e.nativeEvent.key === ' ') {
                            e.preventDefault();
                        }
                    }}
                    color={isFocused || password ? '#0EB080' : '#606060'}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={true}
                    trailing={props =>
                        <Icon name="lock"
                            style={{ color: isFocused || password ? '#0EB080' : '#606060' }}
                            {...props} />} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ ...styles.Ftext, textAlign: 'left', marginRight: 15 }}>
                        Don't have an account yet?
                    </Text>

                    {/* <TouchableOpacity style={{ marginTop: 5 }}>
                        <Text style={styles.Ftext}>Forgot your password?</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => moveRegModal()}>
                        <Text style={{
                            color: "#0EB080", fontWeight: 'bold', width: '100%'
                        }}>Sign up</Text>
                    </TouchableOpacity>
                </View>

                {/* <TouchableOpacity onPress={() => moveRegModal()}>
                    <Text style={{ color: "#0EB080", fontWeight: 'bold', width: '20%' }}>Sign up</Text>
                </TouchableOpacity> */}

            </View>


            <View
                style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default LoginModal

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: '100%'
    },
    LogContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '7%',
    },
    LogTxt: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    inputContainer: {
        width: '80%',
        marginBottom: '5%',
    },
    Ftext: {
        fontSize: 12,
        textAlign: 'right',
        color: '#32324D',
        marginTop: '3%'
    },
    buttonContainer: {
        width: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0EB080',
        width: '100%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        width: '100%',
        marginBottom: '4%'
    },
    buttonOutline: {
        backgroundColor: '#F9F9F9',
        marginTop: 5,
        borderColor: '#0EB080',
        borderWidth: 2
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