import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal, Pressable, TextInput, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker'
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

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
    const [inputsValid, setInputsValid] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);

    useEffect(() => {
        // Perform validation here based on your requirements
        const addressValid = address.trim() !== '';
        const dateValid = date instanceof Date;
        const startTimeValid = startTime instanceof Date;
        const endTimeValid = endTime instanceof Date;

        setInputsValid(addressValid && dateValid && startTimeValid && endTimeValid);
    }, [address, date, startTime, endTime]);


    const handleConfirm = () => {
        const editedConfirmation = { date, address, startTime, endTime };
        if (editIndex !== -1) {
            const updatedConfirmations = [...confirmations];
            updatedConfirmations[editIndex] = editedConfirmation;
            setConfirmations(updatedConfirmations);
        } else {
            setConfirmations([...confirmations, editedConfirmation]);
        }
        setAddress('');
        setDate(new Date());
        setStartTime(new Date());
        setEndTime(new Date());
        setModalVisible(false);
        setEditIndex(-1); // Reset the edit index
    }



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

    const handleRemoveConfirmation = (index) => {
        const updatedConfirmations = [...confirmations];
        updatedConfirmations.splice(index, 1);
        setConfirmations(updatedConfirmations);
    };

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleTxt}>Add the <Text style={{ color: '#0EB080' }}>date</Text> and
                        <Text style={{ color: '#0EB080' }}> location</Text> of your <Text style={{ color: '#0EB080' }}>Gig</Text></Text>
                </View>

                {confirmations.map((confirmation, index) => (
                    <TouchableOpacity key={index} style={styles.listContainer}
                        onPress={() => {
                            setAddress(confirmation.address);
                            setDate(confirmation.date);
                            setStartTime(confirmation.startTime);
                            setEndTime(confirmation.endTime);
                            setModalVisible(true);
                            setEditIndex(index); // Set the index of the item being edited
                        }}>
                        <TouchableOpacity style={styles.erase} onPress={() => handleRemoveConfirmation(index)}>
                            <AntDesign name="closecircle" size={20} color="red" />
                        </TouchableOpacity>
                        <View style={styles.dateList}>
                            <MaterialIcons name="date-range" size={24} color='#0EB080' style={styles.dateIcon} />
                            <Text>Date: {confirmation.date.toDateString()}</Text>
                        </View>

                        <View style={styles.timeList}>

                            <View style={styles.timeStyleList}>
                                <MaterialIcons name="access-time" size={20} color='#0EB080' style={{ marginRight: 10 }} />
                                <Text>Start: {formatTime(confirmation.startTime)}</Text>
                            </View>
                            <View style={styles.timeStyleList}>
                                <MaterialIcons name="access-time" size={20} color='#0EB080' style={{ marginRight: 10 }} />
                                <Text>End: {formatTime(confirmation.endTime)}</Text>
                            </View>

                        </View>
                        <View style={styles.addressList}>
                            <EvilIcons name="location" size={30} color='#0EB080' />
                            <Text>Address: {confirmation.address}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

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


                                <View style={styles.btnConfirmContainer}>
                                    <TouchableOpacity style={[styles.confirmBtn,
                                    inputsValid ? null : { backgroundColor: 'gray' }]}
                                        onPress={() => inputsValid && handleConfirm()}
                                        disabled={!inputsValid}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>
                                            Confirm
                                        </Text>
                                    </TouchableOpacity>
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
    erase: {
        width: '11%',
        marginBottom: 5
    },
    timeStyleList: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        width: '40%',
        justifyContent: 'center'
    },
    dateList: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeList: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    addressList: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    listContainer: {
        borderWidth: 2,
        borderColor: '#0EB080',
        width: '85%',
        marginTop: 25,
        borderRadius: 10,
        padding: 10
    },
    btnConfirmContainer: {
        alignItems: 'center',
        width: '100%',
        marginTop: '20%'
    },
    confirmBtn: {
        borderRadius: 10,
        backgroundColor: '#0EB080',
        height: '35%',
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center'
    },
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
        borderRadius: 10,

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