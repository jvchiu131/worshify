import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React from 'react'
import { useState, useCallback } from 'react'
import GenreInst from './GenreInst'
import { TextInput } from 'react-native'
import { TimePickerModal } from 'react-native-paper-dates';
import { TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { DatePickerInput } from 'react-native-paper-dates';

const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get("screen");

const AddGigModal = () => {

    const [isClicked, setIsClicked] = useState(false);
    const ContentValue = useState(new Animated.Value(-600))[0]
    const [GigName, setGigName] = useState();
    const [GigAddress, setGigAddress] = useState();
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState({});
    const [endTime, setEndTime] = useState({});
    const [EventType, setEventType] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Church Service', value: 'Church Service' },
        { label: 'Convention', value: 'Convention' },
        { label: 'Youth Event', value: 'Youth Event' },
        { label: 'Worship Concert', value: 'Worship Concert' },
        { label: 'Wedding', value: 'Wedding' }
    ]);
    const [startVisible, setStartVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);


    const onDismiss = useCallback(() => {
        setStartVisible(false)
    }, [setStartVisible])

    const onConfirm = useCallback(
        ({ hours, minutes }) => {

            setStartTime({ hours, minutes })
            console.log(startTime);
            setStartVisible(false);
        },
        [setStartVisible]
    );


    const onDismissEnd = useCallback(() => {
        setEndVisible(false)
    }, [setEndVisible])

    const onConfirmEnd = useCallback(
        ({ hours, minutes }) => {

            setEndTime({ hours, minutes })
            console.log(endTime);
            setEndVisible(false);
        },
        [setEndVisible]
    );


    const handleBtn = () => {
        Animated.timing(ContentValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
        setIsClicked(true);
    }

    const props = { gigName: GigName, gigAddress: GigAddress, gigDate: date, StartTime: startTime, EndTime: endTime, eventType: EventType };




    return (
        <View style={styles.root}>

            {isClicked ? (
                <Animated.View
                    style={{ right: ContentValue }}>
                    {isClicked ? (
                        <GenreInst {...props} />
                    ) : null}
                </Animated.View>
            ) : (
                <View style={styles.container}>


                    <View style={styles.GigNameContainer}>
                        <Text style={styles.txtStyles}>Gig Name</Text>
                        <TextInput style={styles.inputStyle}
                            value={GigName}
                            placeholder='Enter gig name'
                            onChangeText={text => setGigName(text)} />
                    </View>

                    <View style={styles.GigNameContainer}>
                        <Text style={styles.txtStyles}>Gig Address</Text>
                        <TextInput style={styles.inputStyle}
                            value={GigAddress}
                            placeholder='Enter gig address'
                            onChangeText={text => setGigAddress(text)} />
                    </View>


                    <View style={styles.timeContainer}>


                        <DatePickerInput
                            locale="en"
                            label="Gig Date"
                            value={date}
                            onChange={(d) => setDate(d)}
                            inputMode="start"
                        />

                        <TouchableOpacity style={styles.btnStyle} onPress={() => setStartVisible(true)}>
                            <View>
                                <Text>
                                    Time Start
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TimePickerModal
                            visible={startVisible}
                            onDismiss={onDismiss}
                            onConfirm={onConfirm}
                            hours={12}
                            minutes={14}
                        />


                        <TouchableOpacity style={styles.btnStyle} onPress={() => setEndVisible(true)}>
                            <View>
                                <Text>
                                    Time End
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TimePickerModal
                            visible={endVisible}
                            onDismiss={onDismissEnd}
                            onConfirm={onConfirmEnd}
                            hours={12}
                            minutes={14}
                        />


                    </View>


                    <View style={styles.eventContainer}>
                        <Text style={styles.txtStyles}>Event Type</Text>
                        <DropDownPicker
                            open={open}
                            value={EventType}
                            items={items}
                            setOpen={setOpen}
                            setValue={setEventType}
                            setItems={setItems}
                        />
                    </View>


                    <View>
                        <TouchableOpacity style={styles.btnContainer} onPress={handleBtn}>
                            <View style={styles.button}>
                                <Text style={styles.txtStyle}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}


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


    },
    container: {

        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    GigNameContainer: {

        margin: 15,
        width: '100%'
    },
    inputStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 5

    },
    txtStyles: {
        fontWeight: 'bold',
        color: 'black'
    },
    timeContainer: {
        flexDirection: 'row',
        width: '100%',

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
    },
    btnContainer: {
        borderWidth: 2,
        borderColor: '#0EB080',
        backgroundColor: '#0EB080',
        borderRadius: 10,
        top: screenHeight / 5
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
})