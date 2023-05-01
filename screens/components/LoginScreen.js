import { KeyboardAvoidingView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { TextInput } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'



const { height: screenHeight } = Dimensions.get('window');


const LoginScreen = () => {


    return (
        <KeyboardAvoidingView style={styles.root}>
            <View style={styles.textLogo}>
                <Text style={styles.wors}>WORS<Text style={styles.hify}>HIFY</Text></Text>
            </View>
            <View
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
                <StatusBar style='auto' />
            </View>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#151414'
    },
    wors: {
        color: '#F9F9F9',
        fontSize: '35%'
    },
    hify: {
        color: '#0EB080'
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
        borderWidth: 2,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: '65%',
        position: 'absolute',
        bottom: '0%',
        backgroundColor: '#F9F9F9'
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