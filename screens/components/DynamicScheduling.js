import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker'
import { MaterialIcons } from '@expo/vector-icons';


const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');



const DynamicScheduling = ({ handleParentModal, gigName, eventType, img, gender, musicianType, }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date())
    const [address, setAddress] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [confirmations, setConfirmations] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [startVisible, setStartVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);


    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    };

    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(new Date(currentDate));

            if (Platform.OS === 'android') {
                toggleDatepicker()
                // setDate(currentDate.toDateString());
                setDate(new Date(currentDate))
            } else if (Platform.OS === 'ios') {
                toggleDatepicker()
                // setDate(currentDate.toDateString());
                setDate(new Date(currentDate))
            }

        } else {
            toggleDatepicker();
        }
    };


    const toggleTimepickerStart = () => {
        setStartVisible(!startVisible)
    };

    const onChangeStartTime = ({ type }, selectedTime) => {
        if (type == 'set') {
            const currentTime = new Date(selectedTime);
            setStartTime(currentTime);

            if (Platform.OS === 'android') {
                toggleTimepickerStart()
                // setStartTime(formatTime(currentTime));
                setStartTime(new Date(currentTime));
            } else if (Platform.OS === 'ios') {
                toggleTimepickerStart()
                // setStartTime(formatTime(currentTime));
                setStartTime(new Date(currentTime));
            }

        } else {
            toggleTimepickerStart();
        }
    };

    const toggleTimepickerEnd = () => {
        setEndVisible(!endVisible)
    };

    const onChangeEndTime = ({ type }, selectedTime) => {
        if (type == 'set') {
            const currentTime = new Date(selectedTime);
            setEndTime(currentTime);

            if (Platform.OS === 'android') {
                toggleTimepickerEnd()
                setEndTime(new Date(currentTime));
            } else if (Platform.OS === 'ios') {
                toggleTimepickerStart()
                // setStartTime(formatTime(currentTime));
                setStartTime(new Date(currentTime));
            }

        } else {
            toggleTimepickerEnd();
        }
    };

    const formatTime = (rawTime) => {
        let time = new Date(rawTime);
        let hours = time.getHours();
        let minutes = time.getMinutes();

        return `${hours}:${minutes}`;
    }

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleTxt}>Add the <Text style={{ color: '#0EB080' }}>date</Text> and
                        <Text style={{ color: '#0EB080' }}> location</Text> of your <Text style={{ color: '#0EB080' }}>Gig</Text></Text>
                </View>

                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.btnContainer}>
                    <AntDesign name="plus" size={24} color='#0EB080' />
                </TouchableOpacity>


                <View style={styles.modalStyle}>
                    <Modal
                        visible={modalVisible}
                        animationType='slide'
                        transparent
                        style={styles.modalStyle}>

                        <View style={styles.modalStyle}>
                            <View style={styles.modalView}>
                                <Appbar.BackAction onPress={() => setModalVisible(false)} color='black' size={20} />

                                <View style={styles.GigNameContainer}>
                                    <Text style={styles.txtStyles}>Gig Address *</Text>
                                    <TextInput style={styles.inputStyle}
                                        value={address}
                                        placeholder='Enter gig address'
                                        onChangeText={text => setAddress(text)} />
                                </View>
                                <View style={styles.GigNameContainer}>

                                    <Text style={styles.txtStyles}>Date *</Text>
                                    {!showPicker && (
                                        <Pressable
                                            onPress={toggleDatepicker} style={styles.pressableContainer}>
                                            <View style={styles.inputContainer}>
                                                <MaterialIcons name="date-range" size={24} color="#1E1E1E" style={styles.dateIcon} />
                                                <TextInput
                                                    placeholder='Choose Gig Date'
                                                    placeholderTextColor='#11182744'
                                                    value={date instanceof Date ? date.toDateString() : ''}
                                                    onChangeText={setDate}
                                                    editable={false}
                                                    style={styles.txtTime}
                                                />
                                            </View>
                                        </Pressable>

                                    )}
                                    {showPicker && (
                                        <View style={styles.dateContainer}>
                                            <DateTimePicker
                                                mode='date'
                                                display='spinner'
                                                value={date}
                                                onChange={onChange}
                                                is24Hour={false}
                                            />
                                        </View>
                                    )}

                                </View>
                                <View style={styles.timeContainer}>
                                    {!startVisible ? (
                                        <Pressable onPress={toggleTimepickerStart} style={styles.timePickerContainer}>
                                            <Text style={styles.txtStyles}>Time Start: *</Text>
                                            <TextInput
                                                placeholder='Choose Start Time'
                                                placeholderTextColor='#11182744'
                                                value={startTime instanceof Date ? formatTime(startTime) : ''}
                                                onChangeText={setStartTime}
                                                editable={false}
                                                style={styles.timeStyle}
                                            />
                                            <MaterialIcons name="access-time" size={24} color="#1E1E1E" style={styles.pickerIcon} />
                                        </Pressable>
                                    ) : startVisible ? (

                                        <DateTimePicker
                                            mode='time'
                                            display='compact'
                                            value={startTime}
                                            onChange={onChangeStartTime}
                                            is24Hour={false}
                                        />
                                    ) : null}

                                    {!endVisible ? (
                                        <Pressable onPress={toggleTimepickerEnd} style={styles.timePickerContainer}>
                                            <Text style={styles.txtStyles}>Time End: *</Text>
                                            <TextInput
                                                placeholder='Choose End Time'
                                                placeholderTextColor='#11182744'
                                                value={endTime instanceof Date ? formatTime(endTime) : ''}
                                                onChangeText={setEndTime}
                                                editable={false}
                                                style={styles.timeStyle}

                                            />
                                            <MaterialIcons name="access-time" size={24} color="#1E1E1E" style={styles.pickerIcon} />
                                        </Pressable>
                                    ) : (
                                        <DateTimePicker
                                            mode='time'
                                            display='compact'
                                            value={endTime}
                                            onChange={onChangeEndTime}
                                            is24Hour={false}
                                        />
                                    )}
                                </View>



                            </View>
                        </View>

                    </Modal>
                </View>



            </View>
        </View>
    )
}

export default DynamicScheduling

const styles = StyleSheet.create({
    dateContainer: {
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: 'black'
    },
    dateIcon: {
        margin: 5,
    },
    txtTime: {
        color: 'black',
    },

    timeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        height: '5%',
        marginBottom: 25,
        margin: 5,
        flexDirection: 'row',

    },
    timePickerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtStyles: {
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    timeStyle: {
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        width: '80%',
        height: 36,
        fontSize: 16,
        color: '#111827',
        paddingLeft: 50

    },
    GigNameContainer: {
        margin: 6,
        width: '90%'

    },
    pickerInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        width: '80%',
        height: 36,
    },
    pickerIcon: {
        position: 'absolute',
        left: 30,
        paddingTop: 30,
    },
    pickerPressable: {
        alignItems: 'center',
    },

    inputStyle: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 5,
        marginLeft: 3,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        marginTop: 5,
        padding: 2,
        color: 'black',
    },

    timePickerContainer: {
        flex: 1,
        alignItems: 'center',

    },
    modalStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        borderWidth: 2,
        borderColor: '#0EB080',
        height: '50%',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10
    },
    btnContainer: {
        borderWidth: 2,
        borderColor: '#0EB080',
        width: '85%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 25
    },
    titleTxt: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    titleContainer: {
        width: '85%',
        // borderWidth: 2,
        // borderColor: 'red'
    },
    root: {
        height: screenHeight,
        width: screenWidth,
    },
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        padding: 20,

    }
})