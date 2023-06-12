import { StyleSheet, Text, TouchableOpacity, TextInput, View, Animated, Dimensions, Button } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const ClientReg = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState(new Date());
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setBirthday(date);
        hideDatePicker();
    };

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                // console.log(user.email);


                //writes data on the database
                const writeUserData = () => {
                    set(ref(db, 'users/' + user.uid),
                        {
                            first_name: firstName,
                            lname: lastName,
                            email: email,
                            birthday: birthday,
                            age: age,
                            address: address,
                            accountType: 'Client'
                        }
                    );
                }
                writeUserData();
            })
            .catch(error => alert(error.message))

    }


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Create an Account as <Text style={{ color: '#0EB080' }}>Client</Text></Text>
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
                    <TextInput style={styles.inputStyle}
                        value={firstName}
                        placeholder='First Name'
                        onChangeText={text => setFirstName(text)} />

                    <TextInput style={styles.inputStyle}
                        value={lastName}
                        placeholder='Last Name'
                        onChangeText={text => setLastName(text)} />

                </View>
                <View style={styles.emailContainer}>
                    <TextInput style={styles.emailStyle}
                        value={email}
                        placeholder='Email'
                        onChangeText={text => setEmail(text)} />
                </View>

                {/* <View style={styles.passContainer}>
                            <TextInput style={styles.passStyle}
                                value={password}
                                placeholder='Password'
                                onChange={text => setPassword(text)}
                                secureTextEntry />
                        </View> */}
                <View style={styles.birthContainer}>
                    <Button title='Birthday' onPress={showDatePicker} color={'black'} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        isDarkModeEnabled={true}
                    />
                    <TextInput style={styles.ageStyle}
                        keyboardType='numeric'
                        placeholder='Age'
                        value={age}
                        onChangeText={text => setAge(text)} />

                </View>
                <View style={styles.addressContainer}>
                    <TextInput style={styles.addressStyle}
                        placeholder='Address'
                        value={address}
                        onChangeText={text => setAddress(text)} />
                </View>
                <View style={styles.phoneContainer}>
                    <TextInput style={styles.passStyle}
                        value={password}
                        placeholder='Password'
                        onChangeText={text => setPassword(text)}
                        secureTextEntry />
                </View>

                <View>
                    <TouchableOpacity style={styles.btnContainer} onPress={handleSignup}>
                        <View style={styles.button}>
                            <Text style={styles.txtStyle}>Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default ClientReg

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    headerContainer: {
        bottom: screenHeight / 4.3,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subHeader: {
        fontSize: 13
    },
    subheaderContainer: {
        bottom: screenHeight / 4.6
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        top: screenHeight / 4,
        justifyContent: 'center'
    },
    nameContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        bottom: screenHeight / 2.3,
        width: screenWidth
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
        bottom: screenHeight / 2.8,
        width: screenWidth
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
        justifyContent: 'space-around',
        bottom: screenHeight / 3.6,
        width: screenWidth
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
        bottom: screenHeight / 5,
        width: screenWidth
    },
    addressStyle: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#606060',
        paddingVertical: 12,
        width: '95%',
    },
    musicContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: screenHeight / 8
    },
    btnContainer: {
        borderWidth: 2,
        borderColor: '#0EB080',
        backgroundColor: '#0EB080',
        borderRadius: 10,
        bottom: screenHeight / 15
    },
    button: {
        borderWidth: 1,
        borderColor: '#0EB080',
        backgroundColor: '#0EB080',
        width: screenWidth / 1.5,
        alignItems: 'center',
        paddingVertical: 2,
        borderRadius: 10
    },
    txtStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
    },
    phoneContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: screenHeight / 8,
        width: screenWidth
    },
    passStyle: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#606060',
        paddingVertical: 12,
        width: '95%'
    },
    passContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: screenHeight / 4,
        width: screenWidth
    },
})

