import { StyleSheet, Text, View, Animated } from 'react-native'
import { Stack, TextInput, IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

const LoginModal = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isFocused, setIsFocused] = useState(false);



    const handleFocus = () => {
        setIsFocused(true); // Change the color to a different value upon selection
    };

    const handleBlur = () => {
        setIsFocused(false)
        //setIconColor('#606060'); // Reset the color to the original value upon deselection
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChangeText={setUsername}
                    color={isFocused || username ? '#0EB080' : '#606060'}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    trailing={props =>
                        <Icon name="account"
                            style={{ color: isFocused || username ? '#0EB080' : '#606060' }}
                            {...props} />}
                />
                <TextInput
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChangeText={setPassword}
                    color={isFocused || password ? '#0EB080' : '#606060'}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    trailing={props =>
                        <Icon name="lock"
                            style={{ color: isFocused || password ? '#0EB080' : '#606060' }}
                            {...props} />} />
                <TouchableOpacity>
                    <Text style={styles.Ftext}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>


            <View
                style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { }}
                    style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default LoginModal

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        position: 'absolute',
        bottom: '0%',
        backgroundColor: '#F9F9F9',
    },
    inputContainer: {
        width: '80%',
        marginBottom: '5%'
    },
    input: {
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 25,
        marginTop: 5,
        borderWidth: 2,
        borderColor: '#0EB080',
        paddingVertical: 15,

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