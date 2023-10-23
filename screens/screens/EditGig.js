import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, Button, TouchableOpacity, Pressable, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { Appbar } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import DropDownPicker from 'react-native-dropdown-picker'
import { ref, set, push, child, onValue, DataSnapshot, update, get } from 'firebase/database';
import { db } from '../../firebase';
import { auth } from '../../firebase'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen")

const EditGig = () => {

    const user = auth.currentUser;
    const uid = user.uid
    const navigation = useNavigation()
    const route = useRoute()
    const { postID } = route.params
    const [gigData, setGigData] = useState([]);
    const [gigName, setGigName] = useState();
    const [gigPhoto, setGigPhoto] = useState();
    const [about, setAbout] = useState();
    const [gender, setGender] = useState();
    const [instruments, setInstruments] = useState([]);
    const [genre, setGenre] = useState(gigData.genreNeeded || []);
    const [eventType, setEventType] = useState();
    const [items, setItems] = useState([
        { label: 'Church Service', value: 'Church Service' },
        { label: 'Convention', value: 'Convention' },
        { label: 'Youth Event', value: 'Youth Event' },
        { label: 'Worship Concert', value: 'Worship Concert' },
        { label: 'Wedding', value: 'Wedding' }
    ]);
    const [showPicker, setShowPicker] = useState(false);
    const [startVisible, setStartVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState();

    const [sex, setSex] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Both', value: 'Both' },

    ]);
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);

    useEffect(() => {
        const pathRef = child(ref(db), 'gigPosts/' + postID + '/Instruments_Needed')
        onValue(pathRef, (snapshot) => {
            let data = [];
            snapshot.forEach((child) => {
                data.push(child.val());
            })
            setInstruments(data);
        })
    }, [])
    useEffect(() => {
        const pathRef = child(ref(db), 'gigPosts/' + postID + '/Genre_Needed')
        onValue(pathRef, (snapshot) => {
            let data = [];
            snapshot.forEach((child) => {
                data.push(child.val());
            })
            setGenre(data);
        })
    }, [])

    useEffect(() => {
        const gigRef = ref(db, 'gigPosts/' + postID)
        onValue(gigRef, (snapshot) => {
            const gig = {
                key: snapshot.key,
                eventType: snapshot.val().Event_Type,
                postID: snapshot.val().postID,
                gigName: snapshot.val().Gig_Name,
                uid: snapshot.val().uid,
                genreNeeded: snapshot.Genre_Needed,
                instrumentsNeeded: snapshot.val().Instruments_Needed,
                gigImage: snapshot.val().Gig_Image,
                about: snapshot.val().about,
                gender: snapshot.val().gender
            }

            setGigData(gig);
        })
    }, [])

    useEffect(() => {
        const fetchInstruments = async () => {
            const pathRef = child(ref(db), 'gigPosts/' + postID + '/schedule');
            try {
                const snapshot = await get(pathRef);
                let data = [];
                snapshot.forEach((child) => {
                    data.push(child.val());
                });
                setSchedule(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchInstruments();
        // schedule.map((items) => (
        //     console.log(items.index)
        // ))
    }, [])



    const handleInstrumentChange = (index, field, value) => {
        setInstruments((prevInstruments) => {
            const updatedInstruments = [...prevInstruments];
            updatedInstruments[index][field] = value;
            return updatedInstruments;
        });
    };

    const saveInstruments = () => {
        const instrumentsRef = ref(db, 'gigPosts/' + postID + '/Instruments_Needed');
        const UserGigsRef = ref(db, 'users/' + '/client/' + uid + '/gigs/' + postID + '/Instruments_Needed');
        set(instrumentsRef, instruments);
        set(UserGigsRef, instruments);
    };

    const saveGenre = () => {
        const genreRef = ref(db, 'gigPosts/' + postID + '/Genre_Needed');
        const UserGigsRef = ref(db, 'users/' + '/client/' + uid + '/gigs/' + postID + '/Genre_Needed');
        set(genreRef, genre);
        set(UserGigsRef, genre);
    };


    useEffect(() => {
        const gigRef = ref(db, 'gigPosts/' + postID)
        onValue(gigRef, (snapshot) => {
            const gig = snapshot.val()
            if (gig) {
                setGigData(gig);
                setGigName(gig.Gig_Name || '');
                setGigPhoto(gig.Gig_Image || '');
                setAbout(gig.about || '');
                setGender(gig.gender || '');
                setInstruments(gig.Instruments_Needed || []);
                setGenre(gig.Genre_Needed || []);
                setEventType(gig.Event_Type || '');
            }

        })
    }, [postID]);


    //handles gig creation
    //add gig details at the same time in PostGigs and UserGigs
    const handleEditGig = () => {

        //Generates GigPost Key
        const UserGigsRef = ref(db, 'users/' + '/client/' + uid + '/gigs/' + postID);
        const GigPostsRef = ref(db, 'gigPosts/' + '/' + postID);


        update(UserGigsRef, {
            uid: uid,
            Gig_Name: gigName,
            Event_Type: eventType,
            about: about,
            gender: gender
        });


        update(GigPostsRef, {
            uid: uid,
            Gig_Name: gigName,
            Event_Type: eventType,
            about: about,
            gender: gender
        });


    }

    const handleGenreChange = (index, value) => {
        setGenre((prevGenre) => {
            const updatedGenre = [...prevGenre];
            updatedGenre[index] = value;
            return updatedGenre;
        });
    };

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
        let hours = time.getHours().toString().padStart(2, '0');
        let minutes = time.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }

    const handleSet = (index) => {
        // console.log(index)
        setSelectedIndex(index);
        // console.log(selectedIndex)
        setVisible(true)
    }

    const handleCloseSet = () => {
        setSelectedIndex(null);
        setVisible(false);
    }

    const address = schedule.map(item => item.address);
    const date = schedule.map(item => item.date);
    const start = schedule.map(item => item.startTime);
    const end = schedule.map(item => item.endTime);


    return (
        <View style={styles.root}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
            </Appbar.Header>


            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={{ fontWeight: "bold" }}>Edit Gig</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.detailsContainer}>
                        <View style={styles.inputContainer}>
                            <Text>Gig Title:</Text>
                            <TextInput
                                value={gigName}
                                placeholder={gigData.gigName || ''}
                                style={styles.inputStyle}
                                onChangeText={text => setGigName(text)} />
                        </View>


                        <View style={styles.AddressContainer}>
                            {schedule.map((sched, index) => (
                                <TouchableOpacity style={styles.schedItem} onPress={() => handleSet(index)}>
                                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Set</Text>
                                    <View key={index} style={{
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


                        </View>

                        <Modal visible={visible} animationType='slide' transparent>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={{ fontWeight: 'bold' }}>Schedule and Location</Text>
                                    {visible ? (
                                        <View style={styles.modalDetails}>
                                            <View style={{ marginTop: 15 }}>
                                                <Text>Date:</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <MaterialIcons name="date-range" size={24} color="black" />
                                                    <Text>{date[selectedIndex]}</Text>

                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                                                <View>
                                                    <Text>Time Start:</Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Feather name="clock" size={24} color="black" />
                                                        <Text>{start[selectedIndex]}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Text>Time End:</Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Feather name="clock" size={24} color="black" />
                                                        <Text>{end[selectedIndex]}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 10 }}>
                                                <Text>Address:</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Ionicons name="location-outline" size={24} color="black" />
                                                    <Text>{address[selectedIndex]}</Text>
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
                            <DropDownPicker
                                open={open}
                                value={eventType}
                                items={items}
                                setOpen={setOpen}
                                setValue={setEventType}
                                setItems={setItems}
                                placeholder={gigData.eventType}
                                dropDownDirection='TOP'

                            />
                        </View>

                        <View style={styles.instrumentsContainer}>
                            <Text style={{ fontWeight: 'bold' }}>Instruments:</Text>
                            <View>
                                <View style={styles.instrumentStyle}>
                                    {instruments.map((instrument, index) => (
                                        <View key={index} style={styles.chip}>
                                            <TextInput
                                                value={instrument.quantity}
                                                onChangeText={(value) =>
                                                    handleInstrumentChange(index, 'quantity', value)
                                                }
                                                style={styles.instTxt}
                                                placeholder='Quantity:'
                                            />
                                            <TextInput
                                                value={instrument.name}
                                                onChangeText={(value) =>
                                                    handleInstrumentChange(index, 'name', value)
                                                }
                                                style={styles.instTxt}
                                            />
                                        </View>
                                    ))}
                                </View>

                                <TouchableOpacity onPress={saveInstruments}>
                                    <View style={styles.btnStyle}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Save instruments</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.instrumentsContainer}>
                            <Text style={{ fontWeight: 'bold' }}>Genre:</Text>
                            <View>
                                <View style={styles.instrumentStyle}>
                                    {genre.map((genre, index) => (
                                        <View key={index} style={styles.chip}>
                                            <TextInput
                                                value={genre}
                                                onChangeText={(value) => handleGenreChange(index, value)}
                                                style={styles.instTxt}
                                                placeholder='Genre:'
                                            />

                                        </View>
                                    ))}
                                </View>

                                <TouchableOpacity onPress={saveGenre}>
                                    <View style={styles.btnStyle}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Save genre</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View>
                            <View>
                                <Text style={styles.txtStyles}>Sex:</Text>
                                <DropDownPicker
                                    open={opens}
                                    value={gender}
                                    items={sex}
                                    setOpen={setOpens}
                                    setValue={setGender}
                                    setItems={setSex}
                                    placeholder={gigData.gender}
                                    dropDownDirection='TOP'
                                />
                            </View>
                        </View>


                        <View style={styles.inputContainer}>
                            <Text>About:</Text>
                            <TextInput
                                value={about}
                                placeholder={gigData.about}
                                onChangeText={text => setAbout(text)}
                                style={styles.aboutStyle}
                            />
                        </View>


                        <TouchableOpacity style={styles.btnStyle} onPress={handleEditGig}>
                            <View>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit Gig</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>


    )
}

export default EditGig

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
    chip: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15

    },
    btnTxtStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    btnStyle: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,

    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20
    },
    AddressTxt: {
        fontWeight: 'bold',
        fontSize: 13
    },
    LocationContainer: {
        justifyContent: 'center',
        marginLeft: 10,

    },
    AddressContainer: {
        flexDirection: 'row',
        paddingLeft: 25,
        alignItems: 'center',
    },
    schedItem: {
        borderWidth: 2,
        borderColor: '#0EB080',
        marginRight: 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '28%',
        height: '40%'
    },
    dateTxt: {
        fontWeight: 'bold',
        fontSize: 13
    },
    timeTxt: {
        color: '#747688',
        fontSize: 12
    },
    dateContainer: {
        justifyContent: 'center',
        marginLeft: 10
    },
    dateTimeContainer: {
        flexDirection: 'row',
        paddingLeft: 25,
        alignItems: 'center',

    },
    timeContainer: {
        width: '100%',
        marginTop: 2,
        height: '5%',
        marginBottom: 150,

    },
    dateStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 10,
        height: '100%',
        width: '50%',
        left: '25%'
    },
    aboutStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 5,
        paddingVertical: 20

    },
    chip: {
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 5
    },
    btnStyle: {
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0EB080',
        marginTop: 15
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 450,
    },
    instrumentsContainer: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 12,
        padding: 10,
        marginTop: 20,
        width: '75%'
    },
    inputTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    root: {
        height: screenHeight,
        width: screenWidth
    },
    container: {
        padding: 20
    },
    detailsContainer: {
        marginTop: 20
    },
    inputContainer: {
        marginBottom: 10
    },
    inputStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 5

    },
})