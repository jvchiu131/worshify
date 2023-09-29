import { StyleSheet, Text, TouchableOpacity, TextInput, View, Animated, Dimensions, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useState } from 'react'
import ProfilePicReg from './ProfilePicReg';
import DateTimePicker from '@react-native-community/datetimepicker'


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const ClientReg = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState(new Date());
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [birthPlaceholder, setBirthPlaceholder] = useState('');
    const ContentValue = useState(new Animated.Value(-600))[0]



    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    };

    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setBirthday(currentDate);
            setBirthPlaceholder(currentDate.toDateString());

            if (Platform.OS === 'android') {
                toggleDatepicker()
                setBirthday(currentDate);
                setBirthPlaceholder(currentDate.toDateString());
            }

        } else {
            toggleDatepicker();
        }
    };


    const handleBtn = () => {
        Animated.timing(ContentValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
        setIsClicked(true);
    }


    const props = { fname: firstName, lname: lastName, email: email, bday: birthday, age: age, address: address, password: password }




    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            {isClicked ? (
                <Animated.View
                    style={{ right: ContentValue }}>
                    {isClicked ? (
                        <ProfilePicReg {...props} />
                    ) : null}
                </Animated.View>
            ) : (
                <>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Create an Account as <Text style={{ color: '#0EB080' }}>Client</Text></Text>
                    </View>
                    {/* <View style={styles.subheaderContainer}>
                        <Text style={styles.subHeader}>Do you already have an account?
                            <TouchableOpacity>
                                <Text style={{ color: '#0EB080' }}> Sign In</Text>
                            </TouchableOpacity>
                        </Text>
                    </View> */}

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
                        <View style={styles.birthContainer}>
                            <View style={styles.ageStyle}>
                                {!showPicker && (
                                    <Pressable
                                        onPress={toggleDatepicker}>
                                        <TextInput
                                            placeholder='Birth Date'
                                            placeholderTextColor='#11182744'
                                            value={birthPlaceholder}
                                            onChangeText={setBirthPlaceholder}
                                            editable={false}
                                        />
                                    </Pressable>

                                )}

                                {showPicker && (
                                    <DateTimePicker
                                        mode='date'
                                        display='spinner'
                                        value={birthday}
                                        onChange={onChange}
                                        is24Hour={false}
                                    />
                                )}
                            </View>

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
                            <TouchableOpacity style={styles.btnContainer} onPress={handleBtn}>
                                <View style={styles.button}>
                                    <Text style={styles.txtStyle}>Next</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </>
            )}
        </KeyboardAvoidingView>
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
        width: screenWidth,
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

