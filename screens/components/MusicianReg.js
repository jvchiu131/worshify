import { StyleSheet, Text, TouchableOpacity, TextInput, View, Animated, Dimensions, Button } from 'react-native'
import React, { useState } from 'react'
import InstGenre from './InstGenre';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const MusicianReg = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const ContentValue = useState(new Animated.Value(-600))[0]



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


    const handleBtn = () => {
        Animated.timing(ContentValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
        setIsClicked(true);
    }


    return (
        <View style={styles.container}>
            {isClicked ? (
                <Animated.View
                    style={{ right: ContentValue }}>
                    {isClicked ? (
                        <InstGenre />
                    ) : null}
                </Animated.View>
            ) : (

                <>
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
                            <Button title='Birthday' onPress={showDatePicker} color={'black'} />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                isDarkModeEnabled={true}
                            />
                            <TextInput style={styles.ageStyle} keyboardType='numeric' placeholder='Age' />
                        </View>
                        <View style={styles.addressContainer}>
                            <TextInput style={styles.addressStyle} placeholder='Address' />
                        </View>
                        <View style={styles.phoneContainer}>
                            <TextInput style={styles.addressStyle} keyboardType='numeric' placeholder='Phone' />
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
            )
            }

        </View >

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
        display: 'flex',
        flex: 'row',
        alignItems: 'center',
        top: screenHeight / 4,
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
        bottom: screenHeight / 5,
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
        paddingVertical: '2%',
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
        bottom: screenHeight / 7.4,
    }
})