import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, ImageBackground, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { ref as ref_db, set, push, child, onValue, DataSnapshot } from 'firebase/database';
import { db } from '../../firebase';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'
import { Feather } from '@expo/vector-icons';
const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const GigOverview = ({ handleGrandParentModal, InstrumentsNeeded, GenreNeeded, uid, gigName, schedule, eventType, img, gender, musicianType, handleModal }) => {


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
    const [about, setAbout] = useState('');
    const [instrumentsNeeded, setInstrumentsNeeded] = useState(InstrumentsNeeded.map(instrument => ({ name: instrument, quantity: 1 })));
    const [gigCreated, setGigCreated] = useState(false);
    const [modalVisible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);


    // handles the gig overview of the creation of Gig for user review
    const toastHandle = () => {
        Toast.show({
            type: 'success',
            text1: 'Your gig has been successfully created!'
        })
    }

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

        // Create an array of schedule objects
        const scheduleArray = schedule.map((sched, index) => ({
            index: index + 1,
            date: sched.date.toDateString(),
            startTime: formatTime(sched.startTime),
            endTime: formatTime(sched.endTime),
            address: sched.address,
        }));

        set(UserGigsRef, {
            uid: uid,
            Gig_Name: gigName,
            schedule: scheduleArray,
            Event_Type: eventType,
            Instruments_Needed: instruments,
            Genre_Needed: GenreNeeded,
            postID: newGigsRefKey,
            Gig_Image: img,
            about: about,
            gigStatus: 'Available',
            gender: Gender,
            musicianType: musicianType
        });


        set(GigPostsRef, {
            uid: uid,
            Gig_Name: gigName,
            schedule: scheduleArray,
            Event_Type: eventType,
            Instruments_Needed: instruments,
            Genre_Needed: GenreNeeded,
            postID: newGigsRefKey,
            Gig_Image: img,
            gigStatus: 'Available',
            about: about,
            gender: Gender,
            musicianType: musicianType
        });
        // toastHandle();
        setGigCreated(true);

        setTimeout(() => {
            handleModal(false);
            handleGrandParentModal(false);
            toastHandle()
        }, 1500)
    }






    const handleQuantityChange = (index, value) => {
        const newQuantity = [...quantity];
        newQuantity[index] = value;
        setQuantity(newQuantity);
    }

    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    };



    //erase the OS restriction of the app
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
    useEffect(() => {
        schedule.map((sched) => {
            console.log(sched);
        })

    }, [])

    const handleSet = (index) => {
        console.log(schedule[index])
        setSelectedIndex(index);
        setVisible(true)
    }

    const handleCloseSet = () => {
        setSelectedIndex(null);
        setVisible(false);
    }
    // useEffect(() => {
    //     setVisible(false)
    // }, [])


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

                        <View style={styles.schedContainer}>
                            <Text style={{ color: '#0EB080', fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>Sets</Text>
                            <ScrollView horizontal={true} style={styles.schedScroll}>
                                {schedule.map((sched, index) => (
                                    <TouchableOpacity style={styles.schedItem} onPress={() => handleSet(index)}>
                                        <Text style={{ fontSize: 20, fontWeight: '500' }}>Set</Text>
                                        <View style={{
                                            backgroundColor: '#F0F0F0',
                                            height: 45,
                                            width: 45,
                                            borderRadius: 25,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 10
                                        }}>
                                            <Text style={{ fontSize: 20, color: '#0EB080', fontWeight: 'bold' }}>{index + 1}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <Modal visible={modalVisible} animationType='slide' transparent>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={{ fontWeight: 'bold' }}>Schedule and Location</Text>


                                    {modalVisible ? (
                                        <View style={styles.modalDetails}>
                                            <View style={{ marginTop: 15 }}>
                                                <Text>Date:</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <MaterialIcons name="date-range" size={24} color="black" />
                                                    <Text>{schedule[selectedIndex].date.toDateString()}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                                                <View>
                                                    <Text>Time Start:</Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Feather name="clock" size={24} color="black" />
                                                        <Text>{formatTime(schedule[selectedIndex].startTime)}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Text>Time End:</Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Feather name="clock" size={24} color="black" />
                                                        <Text>{formatTime(schedule[selectedIndex].endTime)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 10 }}>
                                                <Text>Address:</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Ionicons name="location-outline" size={24} color="black" />
                                                    <Text>{schedule[selectedIndex].address}</Text>
                                                </View>
                                            </View>

                                            <TouchableOpacity onPress={() => handleCloseSet()} style={styles.closeSetBtn}>
                                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15 }}>Close</Text>
                                            </TouchableOpacity>

                                        </View>
                                    ) : null
                                    }

                                </View>
                            </View>
                        </Modal>


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
    closeSetBtn: {
        alignSelf: 'center',
        backgroundColor: '#0EB080',
        width: '70%',
        height: '15%',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    modalDetails: {
        height: '100%',
        width: '100%'
    },
    modalContent: {
        borderColor: '#0EB080',
        borderRadius: 15,
        backgroundColor: 'white',
        height: '35%',
        width: '80%',
        borderWidth: 2,
        elevation: 5,
        alignItems: 'center',
        padding: 20
    },
    modalContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    schedScroll: {
        width: '100%',
        height: '12%'
    },
    schedItem: {
        borderWidth: 2,
        borderColor: '#0EB080',
        marginRight: 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
    },
    schedContainer: {
        alignItems: 'center',
        padding: 5,
    },
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
        height: '30%',
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