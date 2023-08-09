import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { child, onValue, ref, remove, update, set } from 'firebase/database';
import { db, auth } from '../../firebase';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-paper';



const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const ArchiveGig = ({ postID }) => {

    const [postDetails, setPostDetails] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [userData, setUserData] = useState([]);
    const [appliedUsers, setAppliedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState([]);
    const [archived, setArchived] = useState(false);
    const user = auth.currentUser;
    const uid = user.uid;

    useEffect(() => {
        const dbRef = ref(db, 'archiveGigs/' + uid + '/' + postID);
        onValue(dbRef, (snapshot) => {
            const gigData = {
                key: snapshot.key,
                Event_Type: snapshot.val().Event_Type,
                GigAddress: snapshot.val().GigAddress,
                postID: snapshot.val().postID,
                GigName: snapshot.val().GigName,
                uid: snapshot.val().uid,
                GenreNeeded: snapshot.val().GenreNeeded,
                StartTime: snapshot.val().StartTime,
                EndTime: snapshot.val().EndTime,
                InstrumentsNeeded: snapshot.val().InstrumentsNeeded,
                GigImage: snapshot.val().GigImage,
                GigDate: snapshot.val().GigDate,
                about: snapshot.val().about
            };

            setPostDetails(gigData);
        });

    }, [postID])

    useEffect(() => {
        const userRef = ref(db, 'users/client/' + uid)
        onValue(userRef, (snapshot) => {
            const userData = {
                key: snapshot.key,
                firstName: snapshot.val().first_name,
                lastName: snapshot.val().lname,
                profilePic: snapshot.val().profile_pic
            };
            setUserData(userData)
        });
    }, [postID])

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
        const usersAppliedRef = ref(db, 'gigPosts/' + postID + '/usersApplied')
        onValue(usersAppliedRef, (snapshot) => {
            let userApp = [];
            snapshot.forEach((child) => {
                userApp.push({
                    key: child.key,
                    firstName: child.val().firstName,
                    lastName: child.val().lastName,
                    profilePic: child.val().profilePic
                })
            })

            setAppliedUsers(userApp);
        })

        console.log(appliedUsers)


    }, [])


    const archiveGig = () => {
        const archiveRef = ref(db, 'archiveGigs/' + uid + '/' + postID)
        set(archiveRef, postDetails)
        setArchived(true);
        deleteGig();
    }


    const deleteGig = async () => {
        setLoading(true);
        const dbRefUser = ref(db, 'gigPosts/' + postID)
        const dbRef = ref(db, 'users/client/' + uid + '/gigs/' + postID);
        remove(dbRef)
        await remove(dbRefUser)
            .then(() => { setLoading(false) })
            .catch((error) => console.log(error))
    }


    return (
        <View style={styles.root}>
            <View style={styles.imgContainer}>
                <ImageBackground source={{ uri: postDetails.GigImage }} style={styles.imgStyle}></ImageBackground>
            </View>

            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.detailContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleStyle}>{postDetails.GigName}</Text>


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
                            <Text>{userData.firstName} {userData.lastName}</Text>
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

                <View style={styles.appliedContainer}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Applied Users:</Text>
                    {appliedUsers.map((user, index) => (
                        <View key={index} style={styles.appliedUserContainer}>
                            <ImageBackground style={styles.userProfilePic} source={{ uri: user.profilePic }}></ImageBackground>
                            <View style={styles.userInfoContainer}>
                                <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>





        </View>
    )
}

export default ArchiveGig

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 450,
    },
    appliedContainer: {
        padding: 15,
    },
    appliedUserContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userProfilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontWeight: 'bold',
    },
    aboutContent: {
        textAlign: 'center'
    },
    aboutTitle: {
        marginBottom: 10
    },
    aboutContainer: {
        padding: 15,
        borderWidth: 2
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
        padding: 25
    },
    titleStyle: {
        color: "#0EB080",
        fontWeight: 'bold',
        fontSize: 20,
    }
})