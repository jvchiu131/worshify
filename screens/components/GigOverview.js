import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, ImageBackground, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { ref as ref_db, set, push, child, onValue, DataSnapshot } from 'firebase/database';
import { db } from '../../firebase';
import DateTimePicker from '@react-native-community/datetimepicker'

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const GigOverview = ({ InstrumentsNeeded, GenreNeeded, uid, gigName, gigAddress, gigDate, StartTime, EndTime, eventType, img, gender, musicianType }) => {


    const [items, setItems] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Anyone', value: 'Anyone' },

    ]);
    const [showPicker, setShowPicker] = useState(false);
    const [startVisible, setStartVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);

    const [quantity, setQuantity] = useState(InstrumentsNeeded.map(() => 1));
    const [Gender, setGender] = useState(gender);
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState(gigAddress);
    const [about, setAbout] = useState('');
    const [instrumentsNeeded, setInstrumentsNeeded] = useState(InstrumentsNeeded.map(instrument => ({ name: instrument, quantity: 1 })));
    const [gigCreated, setGigCreated] = useState(false);
    const [date, setDate] = useState(gigDate || new Date());
    const [startTime, setStartTime] = useState(StartTime || new Date());
    const [endTime, setEndTime] = useState(EndTime || new Date());

    // handles the gig overview of the creation of Gig for user review

    //handles gig creation
    //add gig details at the same time in PostGigs and UserGigs
    const handleCreateGig = () => {

        //Generates GigPost Key
        const newGigsRefKey = push(child(ref_db(db), 'gigs')).key;
        const UserGigsRef = ref_db(db, 'users/' + '/client/' + uid + '/gigs/' + newGigsRefKey);
        const GigPostsRef = ref_db(db, 'gigPosts/' + '/' + newGigsRefKey);

        const instruments = instrumentsNeeded.map((instrument, index) => ({
            name: instrument.name,
            quantity: quantity[index],
        }));

        set(UserGigsRef, {
            uid: uid,
            Gig_Name: gigName,
            Gig_Address: address,
            Gig_Date: gigDate.toDateString(),
            Gig_Start: formatTime(StartTime),
            Gig_End: formatTime(EndTime),
            Event_Type: eventType,
            Instruments_Needed: instruments,
            Genre_Needed: GenreNeeded,
            postID: newGigsRefKey,
            Gig_Image: img,
            about: about,
            gender: Gender,
            musicianType: musicianType
        });


        set(GigPostsRef, {
            uid: uid,
            Gig_Name: gigName,
            Gig_Address: address,
            Gig_Date: gigDate.toDateString(),
            Gig_Start: formatTime(StartTime),
            Gig_End: formatTime(EndTime),
            Event_Type: eventType,
            Instruments_Needed: instruments,
            Genre_Needed: GenreNeeded,
            postID: newGigsRefKey,
            Gig_Image: img,
            about: about,
            gender: Gender,
            musicianType: musicianType
        });

        setGigCreated(true);

    }

    useEffect(() => {
        // console.log(gigDate.toDateString())
        // console.log(formatTime(StartTime))
        console.log(address)
    }, [])

    const handleQuantityChange = (index, value) => {
        const newQuantity = [...quantity];
        newQuantity[index] = value;
        setQuantity(newQuantity);
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


    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.root}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>Review and Create Gig</Text>

                        <Text style={{ fontSize: 12 }}>Double check the information below before proceeding</Text>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View style={styles.inputContainer}>
                            <Text>Gig Title:</Text>
                            <TextInput
                                value={gigName}
                                placeholder={gigName}
                                style={styles.inputStyle}
                                editable={false} />
                        </View>

                        <View style={styles.timeContainer}>

                            {!showPicker && (
                                <Pressable
                                    onPress={toggleDatepicker}>
                                    <TextInput
                                        placeholder='Choose Gig Date'
                                        placeholderTextColor='#11182744'
                                        value={date instanceof Date ? date.toDateString() : ''}
                                        onChangeText={setDate}
                                        editable={false}
                                        style={styles.dateStyle}
                                    />
                                </Pressable>

                            )}


                            {showPicker && (
                                <DateTimePicker
                                    mode='date'
                                    display='spinner'
                                    value={date}
                                    onChange={onChange}
                                    is24Hour={false}
                                />
                            )}



                            {!startVisible && (
                                <Pressable
                                    onPress={toggleTimepickerStart}>
                                    <TextInput
                                        placeholder='Choose Start Time'
                                        placeholderTextColor='#11182744'
                                        value={startTime instanceof Date ? formatTime(startTime) : ''}
                                        onChangeText={setStartTime}
                                        editable={false}
                                        style={styles.dateStyle}
                                    />
                                </Pressable>

                            )}


                            {startVisible && (
                                <DateTimePicker
                                    mode='time'
                                    display='spinner'
                                    value={startTime}
                                    onChange={onChangeStartTime}
                                    is24Hour={false}
                                />
                            )}


                            {!endVisible && (
                                <Pressable
                                    onPress={toggleTimepickerEnd}>
                                    <TextInput
                                        placeholder='Choose End Time'
                                        placeholderTextColor='#11182744'
                                        value={endTime instanceof Date ? formatTime(endTime) : ''}
                                        onChangeText={setEndTime}
                                        editable={false}
                                        style={styles.dateStyle}
                                    />
                                </Pressable>

                            )}


                            {endVisible && (
                                <DateTimePicker
                                    mode='time'
                                    display='spinner'
                                    value={endTime}
                                    onChange={onChangeEndTime}
                                />
                            )}


                        </View>


                        <View style={styles.inputContainer}>
                            <Text>Gig Address:</Text>
                            <TextInput
                                value={address}
                                placeholder="put address here"
                                style={styles.inputStyle}
                                onChangeText={(text) => setAddress(text)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text>Event Type:</Text>
                            <TextInput
                                value={eventType}
                                placeholder={eventType}
                                style={styles.inputStyle}
                                editable={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text>Instruments:</Text>

                            <View>
                                {InstrumentsNeeded.map((instrument, index) => (
                                    <View style={styles.rootInstrument} key={index}>
                                        <Text style={styles.instrumentsContainer}>{instrument}</Text>
                                        <View style={styles.btnQuantity}>
                                            <TouchableOpacity onPress={() => handleQuantityChange(index, quantity[index] - 1)} style={styles.btnSprt}>
                                                <Text>-</Text>
                                            </TouchableOpacity>

                                            <Text style={styles.btnSprt}>{quantity[index]}</Text>

                                            <TouchableOpacity onPress={() => handleQuantityChange(index, quantity[index] + 1)} style={styles.btnSprt}>
                                                <Text>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>

                        </View>

                        <View>
                            <View style={styles.eventContainer}>
                                <Text style={styles.txtStyles}>Gender:</Text>
                                <DropDownPicker
                                    open={open}
                                    value={Gender}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setGender}
                                    setItems={setItems}
                                    dropDownDirection='TOP'
                                    placeholder={gender}
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text>About:</Text>
                            <TextInput
                                value={about}
                                placeholder='Type here...'
                                onChangeText={text => setAbout(text)}
                                style={styles.aboutStyle}
                                multiline={true}
                                autoCapitalize='sentences'
                                blurOnSubmit={true}

                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text>Gig Photo:</Text>
                            <View style={styles.imgContainer}>
                                <ImageBackground source={{ uri: img }} style={styles.imgStyle}>

                                </ImageBackground>
                            </View>

                            <TouchableOpacity style={styles.btnStyle} onPress={handleCreateGig} disabled={gigCreated}>
                                <View >
                                    {gigCreated ? (<Text style={{ color: 'white', fontWeight: 'bold' }}>Gig Created!</Text>) : (
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Create Gig</Text>
                                    )}
                                </View>
                            </TouchableOpacity>

                        </View>



                    </View>

                </View>

            </View>
        </ScrollView>
    )
}

export default GigOverview

const styles = StyleSheet.create({
    dateStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 10,
        height: '100%',
        width: '80%'
    },
    rootInstrument: {
        flexDirection: 'row',
    },
    btnSprt: {
        padding: 5,
        marginHorizontal: 5
    },
    btnQuantity: {
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    btnStyle: {
        backgroundColor: '#0EB080',
        marginTop: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    aboutStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 5,
        paddingVertical: 20

    },
    imgContainer: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#0EB080',
        width: '100%',
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    imgStyle: {
        borderRadius: 15,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 700,
    },
    instrumentsContainer: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 12,
        padding: 10,
        marginTop: 10,
        width: '75%'
    },
    inputTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 5

    },
    inputContainer: {
        marginBottom: 10
    },
    detailsContainer: {
        marginTop: 20
    },
    titleTxt: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,

    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        padding: 20

    },
    root: {
        height: screenHeight,
        width: screenWidth
    },
    timeContainer: {
        height: '5%',
        marginBottom: 200
    }
})