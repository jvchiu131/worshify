import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { child, onValue, ref, remove, update, get } from 'firebase/database';
import { db, auth } from '../../firebase';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const ClientGigDetails = ({ postID }) => {

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
                        StartTime: snapshot.val().Gig_Start,
                        EndTime: snapshot.val().Gig_End,
                        InstrumentsNeeded: snapshot.val().Instruments_Needed,
                        GigImage: snapshot.val().Gig_Image,
                        GigDate: snapshot.val().Gig_Date,
                        about: snapshot.val().about,
                        gigStatus: snapshot.val().gigStatus
                    };
                    setPostDetails(gigData);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchGigData();

    }, [])

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
    }, [])

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
                        profilePic: snapshot.val().profile_pic
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

            onValue(tokenRef, (snapshot) => {
                setClientToken(snapshot.val().expoToken);
            })

            // try {
            //     const snapshot = await get(tokenRef);
            //     setClientToken(snapshot.val());
            //     console.log(clientToken);
            // } catch (error) {
            //     console.log(error)
            // }
        }
        console.log(clientToken)

        fetchToken();
    }, [])

    // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
    async function sendPushNotification(expoPushToken) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Original Title',
            body: 'And here is the body!',
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
            [uid]: currentUserData
        }).then(() => {
            setLoading(false)
            setApplied(true);

        })

    }

    const deleteGig = async () => {
        setLoading(true);
        const dbRef = ref(db, 'gigPosts/' + postID + '/usersApplied/' + uid)
        await remove(dbRef)
            .then(() => {
                setLoading(false)
                setApplied(false)
            })
            .catch((error) => console.log(error))
    }


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
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusChip}>{postDetails.gigStatus}</Text>
                    </View>

                    <View style={styles.dateTimeContainer}>
                        <View>
                            <FontAwesome5 name="calendar-alt" size={30} color="#0EB080" />
                        </View>

                        <View style={styles.dateContainer}>
                            <Text style={styles.dateTxt}>{postDetails.GigDate}</Text>
                            <Text style={styles.timeTxt}>{postDetails.StartTime} - {postDetails.EndTime}</Text>
                        </View>
                    </View>

                    <View style={styles.AddressContainer}>
                        <View>
                            <Entypo name="location" size={30} color="#0EB080" />
                        </View>

                        <View style={styles.LocationContainer}>
                            <Text style={styles.AddressTxt}>{postDetails.GigAddress}</Text>
                        </View>
                    </View>

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

                {applied || alreadyApplied ? (

                    <Button mode='elevated'
                        onPress={() => deleteGig()}
                        loading={loading}
                        buttonColor='red'
                        textColor='white'
                        style={styles.btnStyle}>
                        Cancel Application
                    </Button>

                ) : (
                    <Button mode='elevated'
                        onPress={async () => { applyGig(), await sendPushNotification(clientToken); }}
                        loading={loading}
                        buttonColor='#0EB080'
                        textColor='white'
                        style={styles.btnStyle}>
                        Apply Gig
                    </Button>

                )}

            </View>
        </View>
    )
}

export default ClientGigDetails

const styles = StyleSheet.create({
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
        alignItems: 'center',

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
        marginLeft: 10
    },
    dateTimeContainer: {
        flexDirection: 'row',
        paddingLeft: 25,
        alignItems: 'center',

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
        justifyContent: 'center',
        textAlign: 'left',
        padding: 25,
        flexDirection: 'row'
    },
    titleStyle: {
        color: "#0EB080",
        fontWeight: 'bold',
        fontSize: 20,
    }
})