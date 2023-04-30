import { KeyboardAvoidingView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { TextInput } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'



const { height: screenHeight } = Dimensions.get('window');


const LoginScreen = () => {


    return (
        <View style={styles.root}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Email'
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Password'
                        secureTextEntry
                        style={styles.input} />
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
                <StatusBar style='auto' />
            </KeyboardAvoidingView>

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    container: {
        width: '100%',
        borderWidth: 2,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%',
        position: 'absolute',
        bottom: '0%',

    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 5
    },
    buttonContainer: {
        width: "60%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: 'blue',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: 'blue',
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: 'blue',
        fontWeight: '700',
        fontSize: 16
    }
})