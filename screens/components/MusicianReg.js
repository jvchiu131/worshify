import { StyleSheet, Text, TouchableOpacity, TextInput, View, Animated, Dimensions } from 'react-native'
import React, { useState } from 'react'


const { height: screenHeight } = Dimensions.get('screen');

const MusicianReg = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Create an Account as <Text style={{ color: '#0EB080' }}>Musician</Text></Text>
            </View>
            <View style={styles.subheaderContainer}>
                <Text style={styles.subHeader}>Do you already have an account?
                    <TouchableOpacity>
                        <Text style={{ color: '#0EB080' }}> Sign In</Text>
                    </TouchableOpacity>
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.nameContainer}>
                    <TextInput style={styles.inputStyle} placeholder='First Name' />
                    <TextInput style={styles.inputStyle} placeholder='Last Name' />
                </View>
                <View style={styles.emailContainer}>
                    <TextInput style={styles.emailStyle} placeholder='Email' />
                </View>
                <View style={styles.birthContainer}>
                    <TextInput style={styles.bdayStyle} placeholder='Birthday' />
                    <TextInput style={styles.ageStyle} placeholder='Age' />
                </View>
                <View style={styles.addressContainer}>
                    <TextInput style={styles.addressStyle} placeholder='Address' />
                </View>
                <View style={styles.musicContainer}>
                    <TextInput style={styles.genreStyle} placeholder='Select genre' />
                    <TextInput style={styles.instrumentStyle} placeholder='Select instrument' />
                </View>
            </View>

        </View>
    )
}

export default MusicianReg

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        borderWidth: 2,
        borderColor: 'red'
    },
    headerContainer: {
        bottom: screenHeight / 4,
    },
    header: {
        fontSize: 20,
    },
    subHeader: {
        fontSize: 13
    },
    subheaderContainer: {
        bottom: screenHeight / 4.2
    },
    inputContainer: {
        display: 'flex',
        flex: 'row',
        alignItems: 'center',
        top: screenHeight / 3.5
    },
    nameContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: screenHeight / 2.3
    },
    inputStyle: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#606060',
        paddingVertical: 12,
        width: '45%',
    },
    emailContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: screenHeight / 2.8
    },
    emailStyle: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#606060',
        paddingVertical: 12,
        width: '95%'
    },
    birthContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: screenHeight / 3.6
    },
    bdayStyle: {

        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#606060',
        paddingVertical: 12,
        width: '45%'
    },
    ageStyle: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#606060',
        paddingVertical: 12,
        width: '45%'
    },
    addressContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: screenHeight / 5
    },
    addressStyle: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#606060',
        paddingVertical: 12,
        width: '95%'
    },
    musicContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: screenHeight / 8
    },
    genreStyle: {

        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#606060',
        paddingVertical: 12,
        width: '45%'
    },
    instrumentStyle: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#606060',
        paddingVertical: 12,
        width: '45%'
    },
})