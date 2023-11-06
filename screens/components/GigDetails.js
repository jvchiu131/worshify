import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { child, onValue, ref, remove, update, get, set, push } from 'firebase/database';
import { db, auth } from '../../firebase';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const GigDetails = ({ postID, handleModal }) => {

    const [postDetails, setPostDetails] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [userData, setUserData] = useState([]);
    const [applied, setApplied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentUserData, setCurrentUserData] = useState([]);
    const [genre, setGenre] = useState([]);
    const [alreadyApplied, setAlreadyApplied] = useState(false);
    const [clientToken, setClientToken] = useState('');
    const user = auth.currentUser;
    const uid = user.uid;
    const [counter, setCounter] = useState(0);
    const [selectedItem, setSelectedItem] = useState();
    const [selectedIndex, setSelectedIndex] = useState();
    const [visible, setVisible] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [cancel, setCancel] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        const interval = setInterval(() => {
            // Update the count every second
            setCounter(prevCount => prevCount + 1);
        }, 500);

        console.log(counter)
        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, []);

    //extraction of postDetails of the chosen gig
    useEffect(() => {
        const fetchGigData = async () => {
            const dbRef = ref(db, 'gigPosts/' + postID);
            try {
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    const gigData = {
                        key: snapshot.key,
                        Event_Type: snapshot.val().Event_Type,
                        GigAddress: snapshot.val().Gig_Address,
                        postID: snapshot.val().postID,
                        GigName: snapshot.val().Gig_Name,
                        uid: snapshot.val().uid,
                        GenreNeeded: snapshot.val().Genre_Needed,
                        InstrumentsNeeded: snapshot.val().Instruments_Needed,
                        GigImage: snapshot.val().Gig_Image,
                        about: snapshot.val().about,
                        gigStatus: snapshot.val().gigStatus,
                    };
                    setPostDetails(gigData);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchGigData();
    }, [counter])


    useEffect(() => {
        const fetchUserData = async () => {
            const userRef = ref(db, 'users/client/' + postDetails.uid);
            try {
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = {
                        key: snapshot.key,
                        firstName: snapshot.val().first_name,
                        lastName: snapshot.val().lname,
                        profilePic: snapshot.val().profile_pic
                    };
                    setUserData(userData);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [counter])

    useEffect(() => {
        const fetchCurrentUserData = async () => {
            const currentRef = ref(db, 'users/musician/' + uid);
            try {
                const snapshot = await get(currentRef);
                if (snapshot.exists()) {
                    let userInfo = {
                        key: snapshot.key,
                        firstName: snapshot.val().first_name,
                        lastName: snapshot.val().lname,
                        profilePic: snapshot.val().profile_pic,
                        accepted: false,
                        genre: snapshot.val().genre,
                        instrument: snapshot.val().instruments
                    };
                    setCurrentUserData(userInfo);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchCurrentUserData();
    }, [currentUserData])

    useEffect(() => {
        const fetchInstruments = async () => {
            const pathRef = child(ref(db), 'gigPosts/' + postID + '/Instruments_Needed');
            try {
                const snapshot = await get(pathRef);
                let data = [];
                snapshot.forEach((child) => {
                    data.push(child.val());
                });
                setInstruments(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchInstruments();
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


    useEffect(() => {
        const fetchGenres = async () => {
            const pathRef = child(ref(db), 'gigPosts/' + postID + '/Genre_Needed');
            try {
                const snapshot = await get(pathRef);
                let data = [];
                snapshot.forEach((child) => {
                    data.push(child.val());
                });
                setGenre(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchGenres();
    }, [])

    useEffect(() => {
        const fetchToken = async () => {
            const tokenRef = ref(db, 'users/notificationTokens/' + postDetails.uid)
            try {
                const snapshot = await get(tokenRef);
                setClientToken(snapshot.val().expoToken);
            } catch (error) {
                console.log(error)
            }
        }
        fetchToken();
    }, [counter])

    // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
    async function sendPushNotification(expoPushToken) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Musician Applied!',
            body: 'A musician applied to your gig!',
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        const notificationRef = ref(db, 'users/usersNotification/' + userData.key)
        const newNotificationRef = push(notificationRef);
        await set(newNotificationRef, {
            title: 'Musician Applied!',
            body: 'A musician applied to your gig!',
        })
    }


    // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
    async function sendCancelNotification(expoPushToken) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Musician Cancelled',
            body: 'A musician cancelled in one of your gig.',
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        const notificationRef = ref(db, 'users/usersNotification/' + userData.key)
        const newNotificationRef = push(notificationRef);
        await set(newNotificationRef, {
            title: 'Musician Cancelled',
            body: 'A musician cancelled in one of your gig.',
        })


    }




    useEffect(() => {
        const usersAppliedRef = ref(db, 'gigPosts/' + postID + '/usersApplied/' + uid)
        onValue(usersAppliedRef, (snapshot) => {
            if (snapshot.exists()) {
                setAlreadyApplied(true);
                console.log('applied')
            } else {
                setAlreadyApplied(false);
            }

        })
        // console.log(userId)
    }, [])

    const applyGig = async () => {
        setLoading(true);
        const dbRef = ref(db, 'gigPosts/' + postID + '/usersApplied')
        await update(dbRef, {
            [uid]: currentUserData,

        }).then(() => {
            setLoading(false)
            setApplied(true);

        })

    }

    // const deleteGig = async () => {
    //     setLoading(true);
    //     const dbRef = ref(db, 'gigPosts/' + postID + '/usersApplied/' + uid)
    //     sendCancelNotification()
    //     await remove(dbRef)
    //         .then(() => {
    //             setLoading(false)
    //             setApplied(false)
    //         })
    //         .catch((error) => console.log(error))
    // }

    const deleteGig = async () => {
        // setLoading(true);
        const dbRef = ref(db, 'gigPosts/' + postID + '/usersApplied/' + uid)
        // sendCancelNotification()
        await remove(dbRef)
            .then(() => {
                // setLoading(false)
                setApplied(false)
            })
            .catch((error) => console.log(error))
    }


    const handleApplyCancel = async () => {
        const dbRef = ref(db, 'gigPosts/' + postID + '/usersApplied/' + uid)

        const isWithinThreeDays = () => {
            const currentDate = new Date();
            const firstScheduledDate = new Date(schedule[0].date);
            const timeDifference = firstScheduledDate.getTime() - currentDate.getTime();
            const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
            return daysDifference <= 3;
        };

        if (isWithinThreeDays()) {
            // Show the warning modal and handle cancellation logic there
            // For example, set a state variable to show the warning modal
            setShowConfirmationModal(true);
        } else {
            // Perform the cancellation directly without showing the warning
            await remove(dbRef)
        }
    }


    // Function to get the label for the button based on gigStatus
    const getApplyButtonLabel = () => {
        if (postDetails.gigStatus === 'Done' || postDetails.gigStatus === 'Cancel' || postDetails.gigStatus === 'Upcoming') {
            return "Gig is not accepting application";
        } else {
            return applied || alreadyApplied ? "Cancel Application" : "Apply Gig";
        }
    };


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

    const handleItemPress = (key) => {
        setSelectedItem(key);
        handleModal(false);
        navigation.navigate('ClientProfile', { userId: key });
    };

    const address = schedule.map(item => item.address);
    const date = schedule.map(item => item.date);
    const start = schedule.map(item => item.startTime);
    const end = schedule.map(item => item.endTime);



    return (
        <View style={styles.root}>
            <View style={styles.imgContainer}>
                <ImageBackground source={{ uri: postDetails.GigImage }} style={styles.imgStyle}></ImageBackground>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.detailContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleStyle}>{postDetails.GigName}</Text>
                    </View>
                    <View style={{ ...styles.statusContainer, flexDirection: 'row' }}>
                        <AntDesign name="checkcircle" size={24} color="#0EB080" />
                        <Text style={{ ...styles.statusChip, marginLeft: 15 }}>{postDetails.gigStatus}</Text>
                    </View>

                    <View style={{ ...styles.statusContainer, alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ ...styles.statusChip, marginTop: 10, marginBottom: 20 }}>{postDetails.Event_Type}</Text>
                    </View>

                    <View style={styles.dateTimeContainer}>
                        <View>
                            <Text>Schedule</Text>
                        </View>

                        <View style={styles.dateContainer}>

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
                                        <Text style={{ fontSize: 20, color: '#0EB080', fontWeight: 'bold' }}>{sched.index}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}

                        </View>
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

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showConfirmationModal}
                        onRequestClose={() => {
                            setShowConfirmationModal(false);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>
                                    Canceling this application within 3 days of the first scheduled date may lead to account suspension.
                                    Are you sure you want to proceed?
                                </Text>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => {
                                        // Client confirmed the cancellation, implement the logic to update banning points and ban account
                                        // ...
                                        // deleteGig()
                                        setShowConfirmationModal(false);

                                    }}
                                >
                                    <Text style={styles.buttonText}>Yes, Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => {
                                        // Client canceled the cancellation, do nothing or handle accordingly
                                        // ...

                                        setShowConfirmationModal(false);

                                    }}
                                >
                                    <Text style={styles.buttonText}>No, Continue Gig</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>



                    <View style={styles.InstContainer}>
                        <View style={styles.instrumentStyle}>
                            {instruments.map((instrument, index) => (
                                <View key={index} style={styles.chip}>
                                    <Text style={styles.instTxt}>{instrument.quantity}</Text>
                                    <Text style={styles.instTxt}>{instrument.name}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.genreStyle}>
                            {genre.map((genres, index) => (
                                <Text style={[styles.chip, styles.genreTxt]} key={index}>{genres}</Text>
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => handleItemPress(userData.key)}>

                        <View style={styles.organizerContainer}>
                            <View style={styles.organizerPhotoContainer}>
                                <ImageBackground style={{ height: '100%', width: '100%' }} source={{ uri: userData.profilePic }}>

                                </ImageBackground>
                            </View>
                            <View style={styles.organizerTxtContainer}>
                                <Text>{userData?.firstName} {userData?.lastName}</Text>
                                <Text style={{ color: '#706E8F', fontSize: 10 }}>Organizer</Text>
                            </View>
                        </View>

                    </TouchableOpacity>

                    <View style={styles.aboutContainer}>
                        <View style={styles.aboutTitle}>
                            <Text style={{ fontWeight: 'bold' }}>About Event</Text>
                        </View>

                        <View style={styles.aboutContent}>
                            <Text style={{ fontSize: 11 }}>{postDetails.about}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>


            <View style={styles.btnContainer}>
                {user && !user.isAnonymous && (
                    <Button
                        mode="elevated"
                        onPress={() => {
                            if (postDetails.gigStatus === 'Done' || postDetails.gigStatus === 'Cancel' || postDetails.gigStatus === 'Upcoming') {
                                // Do nothing if the gig is not accepting applications anymore
                            } else if (applied || alreadyApplied) {

                                // handleApplyCancel();
                                deleteGig();
                                sendCancelNotification(clientToken);
                            } else {
                                applyGig();
                                sendPushNotification(clientToken);
                            }
                        }}
                        loading={loading}
                        buttonColor={postDetails.gigStatus === 'Done' || postDetails.gigStatus === 'Cancel' || postDetails.gigStatus === 'Close' ? 'gray' : applied || alreadyApplied ? 'red' : '#0EB080'}
                        textColor="white"
                        style={styles.btnStyle}
                        disabled={postDetails.gigStatus === 'Done' || postDetails.gigStatus === 'Cancel' || postDetails.gigStatus === 'Close' || postDetails.gigStatus === 'On-going'}
                    >
                        {getApplyButtonLabel()}
                    </Button>
                )}
            </View>
        </View>
    )
}

export default GigDetails

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
    schedItem: {
        borderWidth: 2,
        borderColor: '#0EB080',
        marginRight: 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        height: '100%'
    },
    statusChip: {
        backgroundColor: '#0EB080',
        padding: 5,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: 'white',
        fontWeight: 'bold',
        borderRadius: 10,
        overflow: 'hidden'
    },
    statusContainer: {
        width: '35%'
    },
    aboutContent: {
        textAlign: 'center'
    },
    aboutTitle: {
        marginBottom: 10
    },
    aboutContainer: {
        padding: 15,
    },
    organizerTxtContainer: {
        justifyContent: 'center',
        marginLeft: 7
    },
    organizerPhotoContainer: {
        height: 60,
        width: '18%',
        borderRadius: 100,
        overflow: 'hidden'
    },
    organizerContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    scrollContainer: {
        flex: 1,
    },
    InstContainer: {
        marginTop: 10
    },
    instTxt: {
        fontSize: 10
    },
    genreTxt: {
        fontSize: 10
    },
    genreStyle: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    instrumentStyle: {
        flexDirection: 'row',
        padding: 10,
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
        paddingHorizontal: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: 10

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
        marginTop: 10,

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
        height: '100%',
        width: '100%',
        marginBottom: 10
    },
    dateTimeContainer: {
        alignItems: 'center',
        height: '25%',

    },
    root: {
        height: screenHeight,
        width: screenWidth,
        flex: 1
    },
    detailContainer: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        height: '100%',
        zIndex: 2,
        top: -15,
        backgroundColor: 'white',
        padding: 10
    },
    imgContainer: {
        height: '25%',
        width: '100%',
    },
    imgStyle: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        // justifyContent: 'center',
        textAlign: 'left',
        padding: 20,
        flexDirection: 'row',
        paddingHorizontal: 0

    },
    titleStyle: {
        color: "#0EB080",
        fontWeight: 'bold',
        fontSize: 20,
    }
})