import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { child, onValue, ref, remove, update, set, get } from 'firebase/database';
import { db, auth } from '../../firebase';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppliedProfile from './AppliedProfile';
import { Appbar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { AirbnbRating, Rating } from 'react-native-ratings';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const ClientGigDetails = ({ postID, handleBtnClose }) => {

    const [postDetails, setPostDetails] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [userData, setUserData] = useState([]);
    const [appliedUsers, setAppliedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState([]);
    const [archived, setArchived] = useState(false);
    const user = auth.currentUser;
    const uid = user.uid;
    const navigation = useNavigation();
    const [userId, setUserId] = useState();
    const [selectedItem, setSelectedItem] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState();
    const [notification, setNotification] = useState()
    const [ratingsVisible, setRatingsVisible] = useState(false);
    const [rating, setRating] = useState(3);
    const [review, setReview] = useState('');
    // const [counter, setCounter] = useState(0);
    const showGigModal = () => setModalVisible(true);
    const hideGigModal = () => setModalVisible(false);
    const showRatings = () => setRatingsVisible(true);
    const hideRatings = () => setRatingsVisible(false);
    // Keep track of acceptance status for each user separately
    const [userAcceptanceStatus, setUserAcceptanceStatus] = useState({});
    const [acceptedVisible, setAcceptedVisible] = useState(false);
    const showAccepted = () => setAcceptedVisible(true);
    const hideAccepted = () => setAcceptedVisible(false);
    const [gigExist, setGigExist] = useState(false);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Available', value: 'Available' },
        { label: 'Done', value: 'Done' },
        { label: 'Cancelled', value: 'Cancelled' },
        { label: 'Upcoming', value: 'Upcoming' }

    ]);
    const [gigStatus, setGigStatus] = useState(null);
    const [selectedUserKey, setSelectedUserKey] = useState(null);

    const [counter, setCounter] = useState(0);


    // useEffect(() => {
    //     // if (postDetails.Event_Type === null) {
    //     //     navigation.goBack();
    //     // }
    //     console.log(postDetails.Event_Type)
    // }, [])


    useEffect(() => {
        const interval = setInterval(() => {
            // Update the count every second
            setCounter(prevCount => prevCount + 1);
        }, 300);

        console.log(counter)
        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleItemPress = (key) => {
        setSelectedItem(key);
        setUserId(key)
        showGigModal()
    };

    const handleUserPress = (userKey) => {
        setSelectedUserKey(userKey);
        showRatings()
        hideAccepted()
        const variable = acceptedUsers.some((user) => user.key === selectedUserKey)
    };




    useEffect(() => {
        const dbRef = ref(db, 'gigPosts/' + postID);
        onValue(dbRef, (snapshot) => {
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
                    about: snapshot.val().about
                };

                setPostDetails(gigData);
            } else {
                handleBtnClose(false)
            }
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
        const usersAppliedRef = ref(db, 'gigPosts/' + postID + '/usersApplied');
        onValue(usersAppliedRef, (snapshot) => {
            let userApp = [];
            let userStatus = {}; // Object to store acceptance status for each user

            snapshot.forEach((child) => {
                const userKey = child.key;
                const user = {
                    key: userKey,
                    firstName: child.val().firstName,
                    lastName: child.val().lastName,
                    profilePic: child.val().profilePic,

                };
                userApp.push(user);


                // Check if this user has an acceptance status and store it in the userStatus object
                if (child.val().accepted) {
                    userStatus[userKey] = true;
                } else {
                    userStatus[userKey] = false;
                }
            });

            setAppliedUsers(userApp);
            setUserAcceptanceStatus(userStatus); // Set the individual acceptance statuses
            // getAcceptedUsers()

        });
    }, []);

    const getAcceptedUsers = () => {
        return appliedUsers.filter((user) => userAcceptanceStatus[user.key]);
    }

    const acceptedUsers = getAcceptedUsers();
    const acceptedUserKeys = acceptedUsers.map((user) => user.key);


    const handleRatingSubmission = async (userKey) => {
        const ratingRef = ref(db, 'users/musicianRatings/' + userKey + '/' + uid);
        try {
            const snapshot = await get(ratingRef);
            const existingData = snapshot.val();

            if (existingData) {
                // // Update existing data
                const newData = {
                    ...existingData,
                    rating,
                    review,

                };
                await update(ratingRef, newData);

                hideRatings()
                showAccepted()
            } else {
                // Create new data if it doesn't exist
                const newData = {
                    rating: rating,
                    review: review,
                    userName: userData.firstName,
                    userLname: userData.lastName,
                    userPic: userData.profilePic
                };
                await set(ratingRef, newData);
                hideRatings()
                showAccepted()
            }
            setRating(null)
            setReview('');
            hideRatings()
            showAccepted()


        } catch (error) {
            console.error('Error handling rating:', error)
        }

    }



    //notify applied musicians if gig is edited


    const props = { userId, postID };


    //handles Gig Archive
    const archiveGig = () => {
        const archiveRef = ref(db, 'archiveGigs/' + uid + '/' + postID)
        set(archiveRef, postDetails)
        setArchived(true);
        handleBtnClose(false);
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

    const handleGigStatus = () => {
        const dbRefUser = ref(db, 'gigPosts/' + postID)
        const dbRef = ref(db, 'users/client/' + uid + '/gigs/' + postID);

        update(dbRefUser, {
            gigStatus: gigStatus
        })

        update(dbRef, {
            gigStatus: gigStatus
        })
    }


    useEffect(() => {
        const dbRef = ref(db, 'gigPosts/' + postID + '/usersApplied/')

        onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                setStatus(snapshot.val().accepted);
            }
        })
    }, [counter])

    //handles the rating visibility
    useEffect(() => {
        if (gigStatus === 'Done') {
            showAccepted()
        }
    }, [gigStatus])

    // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
    async function sendDoneNotification(expoPushToken) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Gig Done',
            body: 'A gig that you applied is done! Please rate and give your feedback to the event!',
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

        const notificationRef = ref(db, 'users/usersNotification/' + userId)
        const newNotificationRef = push(notificationRef);
        await set(newNotificationRef, {
            title: 'Gig Done',
            body: 'A gig that you applied is done! Please rate and give your feedback to the event!',
        })
    }


    const handleHide = (data) => {
        setModalVisible(data)
    };


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

                    <View>
                        <Text style={styles.txtStyles}>Gig Status</Text>
                        <DropDownPicker
                            open={open}
                            value={gigStatus}
                            items={items}
                            setOpen={setOpen}
                            setValue={setGigStatus}
                            setItems={setItems}
                            dropDownDirection='BOTTOM'
                            zIndex={30}
                            placeholder={gigStatus}
                            onChangeValue={handleGigStatus}
                        />
                    </View>
                </View>

                <View style={styles.appliedContainer}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Applied Users:</Text>
                    {appliedUsers.map((user, index) => (
                        <TouchableOpacity key={index} style={styles.appliedUserContainer} onPress={() => handleItemPress(user.key)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ImageBackground style={styles.userProfilePic} source={{ uri: user.profilePic }}></ImageBackground>
                                <View style={styles.userInfoContainer}>
                                    <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
                                </View>
                            </View>

                            {userAcceptanceStatus[user.key] ? (<AntDesign name="checkcircle" size={24} color="#0EB080" />) : null}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>


            <View style={styles.btnContainer}>
                <Button mode='elevated'
                    onPress={() => archiveGig()}
                    loading={loading}
                    buttonColor='#0EB080'
                    textColor='white'
                    style={styles.btnStyle}>
                    {archived ? (<Text>Gig Archived</Text>) : (<Text>Archive Gig</Text>)}
                </Button>
            </View>


            <Modal
                animationType='slide'
                visible={modalVisible}
                onRequestClose={hideGigModal}
            >



                <View>
                    <AppliedProfile {...props} hideModal={handleHide} />
                </View>

            </Modal>


            <Modal
                animationType='slide'
                transparent={true}
                visible={acceptedVisible}
            >

                <View style={styles.acceptedContainer}>

                    <View style={styles.acceptedBorder}>
                        <View style={styles.ratingTitle}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Musicians Involved</Text>
                        </View>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            {acceptedUsers.map((users, index) => (
                                <TouchableOpacity
                                    key={index.toString()}
                                    style={[
                                        styles.acceptedListContainer,
                                        // Add conditional styling to mark the selected user
                                        selectedUserKey === users.key ? styles.selectedUser : null,
                                    ]}
                                    onPress={() => handleUserPress(users.key)}>

                                    <View style={styles.acceptedPicContainer}>
                                        <ImageBackground source={{ uri: users.profilePic }} style={{ height: '100%', width: '100%' }}>
                                        </ImageBackground>
                                    </View>


                                    <View style={styles.txtContainer}>
                                        <Text>{users.firstName} {users.lastName}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.doneBtn} onPress={() => hideAccepted()}>
                                <Text style={styles.btnTxtStyle}>Done!</Text>
                            </TouchableOpacity>

                        </View>

                    </View>



                </View>

            </Modal>

            <View style={{ bottom: screenHeight / 3, zIndex: 20 }} >
                {selectedUserKey && ratingsVisible && acceptedUsers.some((user) => user.key === selectedUserKey) && (
                    <View style={styles.ratingsContainer}>
                        <View style={styles.ratingBorder}>
                            <View style={styles.ratingTitle}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Ratings and Reviews</Text>
                            </View>

                            {/* Add the rating component here */}
                            <AirbnbRating
                                reviews={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
                                count={5}
                                defaultRating={3}
                                showRating={true}
                                size={40}
                                onFinishRating={(rating) => setRating(rating)}
                            />

                            {/* Add the review input component here */}
                            <View style={styles.ratingTitles}>
                                <Text>Please share your opinion about the musician</Text>
                            </View>
                            <View style={styles.reviewContainer}>
                                <TextInput
                                    style={styles.reviewInput}
                                    multiline={true}
                                    autoCapitalize='sentences'
                                    blurOnSubmit={true}
                                    placeholder='Type your reviews...'
                                    value={review}
                                    onChangeText={(text) => setReview(text)}
                                />
                            </View>

                            {/* Add the submit button for the rating and review */}
                            <View style={styles.reviewBtnContainer}>
                                <TouchableOpacity style={styles.btnReview} onPress={() => handleRatingSubmission(selectedUserKey)}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Submit Review</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>

        </View>
    )
}

export default ClientGigDetails

const styles = StyleSheet.create({
    doneBtn: {
        width: '60%',
        backgroundColor: '#0EB080',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    selectedUser: {
        borderColor: '#0EB080',
        borderWidth: 2
    },
    acceptedListContainer: {
        borderWidth: 0.5,
        flexDirection: 'row',
        height: 95,
        padding: 10,
        marginBottom: 10,

    },
    acceptedPicContainer: {
        width: '25%',
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: '#0EB080'
    },
    txtContainer: {
        marginLeft: 10
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 450,
    },
    acceptedBorder: {
        borderWidth: 0.5,
        height: '50%',
        width: '90%',
        backgroundColor: '#F9F9F9',
        borderRadius: 15,
    },
    acceptedContainer: {
        padding: 10,
        marginTop: 10,
        height: '95%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnReview: {
        backgroundColor: '#0EB080',
        padding: 10,
        paddingHorizontal: 50,
        borderRadius: 15
    },
    reviewBtnContainer: {
        alignItems: 'center',
        marginTop: 30
    },
    reviewInput: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        width: '100%',
        borderRadius: 10,
        padding: 10
    },
    reviewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        height: '35%'
    },
    ratingTitles: {
        borderColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 25
    },
    ratingTitle: {
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    ratingBorder: {
        borderWidth: 0.5,
        height: '60%',
        width: '90%',
        backgroundColor: '#F9F9F9',
        borderRadius: 15
    },
    ratingsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight,
        width: screenWidth,
    },
    appBarStyle: {
        backgroundColor: '#151414',
        justifyContent: 'space-between'
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 450,
    },
    appliedContainer: {
        padding: 15,
        borderWidth: 2,
        borderColor: 'red',
    },
    appliedUserContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between'
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