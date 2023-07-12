import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, Button, TouchableOpacity, Checkbox } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { Appbar } from 'react-native-paper'

import DropDownPicker from 'react-native-dropdown-picker'
import { ref, set, push, child, onValue, DataSnapshot, update } from 'firebase/database';
import { db } from '../../firebase';
import { auth } from '../../firebase'


const { height: screenHeight, width: screenWidth } = Dimensions.get("screen")

const EditGig = () => {

    const user = auth.currentUser;
    const uid = user.uid
    const navigation = useNavigation()
    const route = useRoute()
    const { postID } = route.params
    const [gigData, setGigData] = useState([]);
    const [gigName, setGigName] = useState();
    const [gigAddress, setGigAddress] = useState();
    const [gigPhoto, setGigPhoto] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [about, setAbout] = useState();
    const [gigDate, setGigDate] = useState();
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

    const [sex, setSex] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Anyone', value: 'Anyone' },

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
                gigAddress: snapshot.val().Gig_Address,
                postID: snapshot.val().postID,
                gigName: snapshot.val().Gig_Name,
                uid: snapshot.val().uid,
                genreNeeded: snapshot.Genre_Needed,
                startTime: snapshot.val().Gig_Start,
                endTime: snapshot.val().Gig_End,
                instrumentsNeeded: snapshot.val().Instruments_Needed,
                gigImage: snapshot.val().Gig_Image,
                gigDate: snapshot.val().Gig_Date,
                about: snapshot.val().about,
                gender: snapshot.val().gender
            }

            setGigData(gig);


        })
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
                setGigAddress(gig.Gig_Address || '');
                setGigPhoto(gig.Gig_Image || '');
                setStartTime(gig.Gig_Start || '');
                setEndTime(gig.Gig_End || '');
                setAbout(gig.about || '');
                setGigDate(gig.Gig_Date || '');
                setGender(gig.gender || '');
                setInstruments(gig.Instruments_Needed || []);
                setGenre(gig.Genre_Needed || []);
                setEventType(gig.Event_Type || '');
            }



        })
        console.log(gender)
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
            Gig_Address: gigAddress,
            Gig_Date: gigDate,
            Gig_Start: startTime,
            Gig_End: endTime,
            Event_Type: eventType,
            about: about,
            gender: gender
        });


        update(GigPostsRef, {
            uid: uid,
            Gig_Name: gigName,
            Gig_Address: gigAddress,
            Gig_Date: gigDate,
            Gig_Start: startTime,
            Gig_End: endTime,
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
                                placeholder={gigData.gigName}
                                style={styles.inputStyle}
                                onChangeText={text => setGigName(text)} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text>Gig Date:</Text>
                            <TextInput
                                value={gigDate}
                                placeholder={gigData.gigDate}
                                style={styles.inputStyle}
                                onChangeText={text => setGigDate(text)}
                            />
                        </View>

                        <View style={styles.inputTimeContainer}>

                            <View>
                                <Text>Time start:</Text>
                                <TextInput
                                    value={startTime}
                                    placeholder={gigData.startTime}
                                    style={styles.inputStyle}
                                    onChangeText={text => setStartTime(text)}
                                />
                            </View>


                            <View>
                                <Text>Time end:</Text>
                                <TextInput
                                    value={endTime}
                                    placeholder={gigData.endTime}
                                    style={styles.inputStyle}
                                    onChangeText={text => setEndTime(text)}
                                />
                            </View>

                        </View>

                        <View style={styles.inputContainer}>
                            <Text>Gig Address:</Text>
                            <TextInput
                                value={gigAddress}
                                placeholder={gigData.gigAddress}
                                style={styles.inputStyle}
                                onChangeText={text => setGigAddress(text)}
                            />
                        </View>

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
        borderWidth: 2,
        borderColor: 'red',
        height: screenHeight,
        width: screenWidth
    },
    container: {
        borderWidth: 2,
        borderColor: 'red',
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