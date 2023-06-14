import { StyleSheet, Text, View, Animated, Button } from 'react-native'
import React from 'react'
import { useState } from 'react'
import GenreInst from './GenreInst'
import { TextInput } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

const AddGigModal = () => {

    const [isClicked, setIsClicked] = useState(false);
    const ContentValue = useState(new Animated.Value(-600))[0]
    const [GigName, setGigName] = useState();
    const [GigAddress, setGigAddress] = useState();
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [DatebtnClick, setDateBtnClick] = useState(false);
    const [StartTimeClick, setStartTimeClick] = useState(false);
    const [EndTimeClick, setEndTimeClick] = useState(false);
    const [EventType, setEventType] = useState();
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Church Service', value: 'Church Service' },
        { label: 'Convention', value: 'Convention' },
        { label: 'Youth Event', value: 'Youth Event' },
        { label: 'Worship Concert', value: 'Worship Concert' },
        { label: 'Wedding', value: 'Wedding' }
    ]);
    const [value, setValue] = useState(null);



    const handleBtnClick = () => {
        Animated.timing(ContentValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
        setIsClicked(true)
    }

    const handleDateClick = () => {
        setDateBtnClick(true);
        console.log(date);

    }

    const handleStartTime = () => {
        setStartTimeClick(true);
    }

    const handleEndTime = () => {
        setEndTimeClick(true);
    }




    return (
        <View style={styles.root}>



            <View style={styles.container}>


                <View style={styles.GigNameContainer}>
                    <Text style={styles.txtStyle}>Gig Name</Text>
                    <TextInput style={styles.inputStyle}
                        value={GigName}
                        placeholder='Enter gig name'
                        onChangeText={text => setGigName(text)} />
                </View>

                <View style={styles.GigNameContainer}>
                    <Text style={styles.txtStyle}>Gig Address</Text>
                    <TextInput style={styles.inputStyle}
                        value={GigAddress}
                        placeholder='Enter gig address'
                        onChangeText={text => setGigAddress(text)} />
                </View>


                <View style={styles.timeContainer}>


                    <TouchableOpacity style={styles.btnStyle} onPress={handleDateClick}>
                        <View>
                            <Text>
                                Date
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnStyle} onPress={handleStartTime}>
                        <View>
                            <Text>
                                Time Start
                            </Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.btnStyle} onPress={handleEndTime}>
                        <View>
                            <Text>
                                Time End
                            </Text>
                        </View>
                    </TouchableOpacity>


                    {DatebtnClick ? (
                        <RNDateTimePicker display='spinner' mode='date' value={date} onChange={setDate} />
                    ) : null}

                    {StartTimeClick ? (
                        <RNDateTimePicker display='spinner' mode='time' value={startTime} onChange={setStartTime} />
                    ) : null}

                    {EndTimeClick ? (
                        <RNDateTimePicker display='spinner' mode='time' value={endTime} onChange={setEndTime} />
                    ) : null}

                </View>


                <View style={styles.eventContainer}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                </View>
            </View>
        </View>
    )
}

export default AddGigModal

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderWidth: 2,
        borderColor: 'red'
    },
    container: {
        borderWidth: 2,
        borderColor: 'green',
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    GigNameContainer: {
        borderWidth: 2,
        borderColor: 'red',
        margin: 15,
        width: '100%'
    },
    inputStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 5

    },
    txtStyle: {
        fontWeight: 'bold'
    },
    timeContainer: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 2,
        borderColor: 'red',
        justifyContent: 'space-around',
        margin: 15,
        height: '5%'
    },
    btnStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: '25%'
    },
    eventContainer: {
        borderWidth: 2,
        borderColor: 'red'
    }
})