// import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { child, onValue, ref, remove, update, set, get } from 'firebase/database';
// import { db, auth } from '../../firebase';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { Entypo } from '@expo/vector-icons';
// import { Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import AppliedProfile from './AppliedProfile';
// import { Appbar } from 'react-native-paper';
// import { AntDesign } from '@expo/vector-icons';
// import DropDownPicker from 'react-native-dropdown-picker'
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import { AirbnbRating, Rating } from 'react-native-ratings';


// const { height: screenHeight } = Dimensions.get('screen');
// const { width: screenWidth } = Dimensions.get('screen');

// const ViewGig = ({ postID }) => {

//     const [postDetails, setPostDetails] = useState([]);
//     const [instruments, setInstruments] = useState([]);
//     const [userData, setUserData] = useState([]);
//     const [appliedUsers, setAppliedUsers] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [genre, setGenre] = useState([]);
//     const [archived, setArchived] = useState(false);
//     const user = auth.currentUser;
//     const uid = user.uid;
//     const navigation = useNavigation();
//     const [userId, setUserId] = useState();
//     const [selectedItem, setSelectedItem] = useState([]);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [status, setStatus] = useState();
//     const [notification, setNotification] = useState()
//     const [ratingsVisible, setRatingsVisible] = useState(false);
//     const [rating, setRating] = useState(3);
//     const [review, setReview] = useState('');
//     // const [counter, setCounter] = useState(0);
//     const showGigModal = () => setModalVisible(true);
//     const hideGigModal = () => setModalVisible(false);
//     const showRatings = () => setRatingsVisible(true);
//     const hideRatings = () => setRatingsVisible(false);
//     // Keep track of acceptance status for each user separately
//     const [userAcceptanceStatus, setUserAcceptanceStatus] = useState({});
//     const [acceptedVisible, setAcceptedVisible] = useState(false);
//     const showAccepted = () => setAcceptedVisible(true);
//     const hideAccepted = () => setAcceptedVisible(false);

//     const [open, setOpen] = useState(false);
//     const [items, setItems] = useState([
//         { label: 'Available', value: 'Available' },
//         { label: 'Done', value: 'Done' },
//         { label: 'Cancelled', value: 'Cancelled' },
//         { label: 'Upcoming', value: 'Upcoming' }

//     ]);
//     const [gigStatus, setGigStatus] = useState(null);
//     const [selectedUserKey, setSelectedUserKey] = useState(null);

//     const [counter, setCounter] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             // Update the count every second
//             setCounter(prevCount => prevCount + 1);
//         }, 500);

//         console.log(counter)
//         // Clean up the interval when the component unmounts
//         return () => {
//             clearInterval(interval);
//         };
//     }, []);

//     const handleItemPress = (key) => {
//         setSelectedItem(key);
//         setUserId(key)
//         showGigModal()
//     };

//     const handleUserPress = (userKey) => {
//         setSelectedUserKey(userKey);
//         showRatings()
//         hideAccepted()
//         const variable = acceptedUsers.some((user) => user.key === selectedUserKey)
//         console.log(variable);
//         console.log(ratingsVisible)
//         console.log(selectedUserKey)
//         console.log(acceptedUsers)
//     };



//     useEffect(() => {
//         const dbRef = ref(db, 'gigPosts/' + postID);
//         onValue(dbRef, (snapshot) => {
//             const gigData = {
//                 key: snapshot.key,
//                 Event_Type: snapshot.val().Event_Type,
//                 GigAddress: snapshot.val().Gig_Address,
//                 postID: snapshot.val().postID,
//                 GigName: snapshot.val().Gig_Name,
//                 uid: snapshot.val().uid,
//                 GenreNeeded: snapshot.val().Genre_Needed,
//                 StartTime: snapshot.val().Gig_Start,
//                 EndTime: snapshot.val().Gig_End,
//                 InstrumentsNeeded: snapshot.val().Instruments_Needed,
//                 GigImage: snapshot.val().Gig_Image,
//                 GigDate: snapshot.val().Gig_Date,
//                 about: snapshot.val().about,
//                 status: snapshot.val().gigStatus
//             };

//             setPostDetails(gigData);
//         });

//     }, [postID])

//     useEffect(() => {
//         const userRef = ref(db, 'users/client/' + uid)
//         onValue(userRef, (snapshot) => {
//             const userData = {
//                 key: snapshot.key,
//                 firstName: snapshot.val().first_name,
//                 lastName: snapshot.val().lname,
//                 profilePic: snapshot.val().profile_pic
//             };
//             setUserData(userData)
//         });
//     }, [postID])

//     useEffect(() => {
//         const pathRef = child(ref(db), 'gigPosts/' + postID + '/Instruments_Needed')
//         onValue(pathRef, (snapshot) => {
//             let data = [];
//             snapshot.forEach((child) => {
//                 data.push(child.val());
//             })
//             setInstruments(data);
//         })
//     }, [])

//     useEffect(() => {
//         const pathRef = child(ref(db), 'gigPosts/' + postID + '/Genre_Needed')
//         onValue(pathRef, (snapshot) => {
//             let data = [];
//             snapshot.forEach((child) => {
//                 data.push(child.val());
//             })
//             setGenre(data);
//         })
//     }, [])




//     useEffect(() => {
//         const usersAppliedRef = ref(db, 'gigPosts/' + postID + '/usersApplied');
//         onValue(usersAppliedRef, (snapshot) => {
//             let userApp = [];
//             let userStatus = {}; // Object to store acceptance status for each user

//             snapshot.forEach((child) => {
//                 const userKey = child.key;
//                 const user = {
//                     key: userKey,
//                     firstName: child.val().firstName,
//                     lastName: child.val().lastName,
//                     profilePic: child.val().profilePic,

//                 };
//                 userApp.push(user);


//                 // Check if this user has an acceptance status and store it in the userStatus object
//                 if (child.val().accepted) {
//                     userStatus[userKey] = true;
//                 } else {
//                     userStatus[userKey] = false;
//                 }
//             });

//             setAppliedUsers(userApp);
//             setUserAcceptanceStatus(userStatus); // Set the individual acceptance statuses
//             // getAcceptedUsers()

//         });
//     }, []);

//     const getAcceptedUsers = () => {
//         return appliedUsers.filter((user) => userAcceptanceStatus[user.key]);
//     }

//     const acceptedUsers = getAcceptedUsers();
//     const acceptedUserKeys = acceptedUsers.map((user) => user.key);


//     //notify applied musicians if gig is edited


//     const props = { userId, postID };




//     const handleGigStatus = () => {
//         const dbRefUser = ref(db, 'gigPosts/' + postID)
//         const dbRef = ref(db, 'users/client/' + uid + '/gigs/' + postID);

//         update(dbRefUser, {
//             gigStatus: gigStatus
//         })

//         update(dbRef, {
//             gigStatus: gigStatus
//         })
//     }


//     useEffect(() => {
//         const dbRef = ref(db, 'gigPosts/' + postID + '/usersApplied/')

//         onValue(dbRef, (snapshot) => {
//             if (snapshot.exists()) {
//                 setStatus(snapshot.val().accepted);
//             }
//         })
//     }, [counter])

//     //handles the rating visibility
//     useEffect(() => {
//         if (gigStatus === 'Done') {
//             showAccepted()
//         }
//     }, [gigStatus])


//     return (
//         <View style={styles.root}>
//             <View style={styles.imgContainer}>
//                 <ImageBackground source={{ uri: postDetails.GigImage }} style={styles.imgStyle}></ImageBackground>
//             </View>

//             <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollViewContent}>
//                 <View style={styles.detailContainer}>
//                     <View style={styles.titleContainer}>
//                         <Text style={styles.titleStyle}>{postDetails.GigName}</Text>
//                     </View>

//                     <View style={styles.dateTimeContainer}>
//                         <View>
//                             <FontAwesome5 name="calendar-alt" size={30} color="#0EB080" />
//                         </View>

//                         <View style={styles.dateContainer}>
//                             <Text style={styles.dateTxt}>{postDetails.GigDate}</Text>
//                             <Text style={styles.timeTxt}>{postDetails.StartTime} - {postDetails.EndTime}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.AddressContainer}>
//                         <View>
//                             <Entypo name="location" size={30} color="#0EB080" />
//                         </View>

//                         <View style={styles.LocationContainer}>
//                             <Text style={styles.AddressTxt}>{postDetails.GigAddress}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.InstContainer}>
//                         <View style={styles.instrumentStyle}>
//                             {instruments.map((instrument, index) => (
//                                 <View key={index} style={styles.chip}>
//                                     <Text style={styles.instTxt}>{instrument.quantity}</Text>
//                                     <Text style={styles.instTxt}>{instrument.name}</Text>
//                                 </View>
//                             ))}
//                         </View>
//                         <View style={styles.genreStyle}>
//                             {genre.map((genres, index) => (
//                                 <Text style={[styles.chip, styles.genreTxt]} key={index}>{genres}</Text>
//                             ))}
//                         </View>
//                     </View>

//                     <View style={styles.organizerContainer}>
//                         <View style={styles.organizerPhotoContainer}>
//                             <ImageBackground style={{ height: '100%', width: '100%' }} source={{ uri: userData.profilePic }}>

//                             </ImageBackground>
//                         </View>
//                         <View style={styles.organizerTxtContainer}>
//                             <Text>{userData.firstName} {userData.lastName}</Text>
//                             <Text style={{ color: '#706E8F', fontSize: 10 }}>Organizer</Text>
//                         </View>
//                     </View>

//                     <View style={styles.aboutContainer}>
//                         <View style={styles.aboutTitle}>
//                             <Text style={{ fontWeight: 'bold' }}>About Event</Text>
//                         </View>

//                         <View style={styles.aboutContent}>
//                             <Text style={{ fontSize: 11 }}>{postDetails.about}</Text>
//                         </View>


//                     </View>

//                     <View style={styles.statusContainer}>
//                         <Text style={styles.txtStyles}>Gig Status</Text>
//                         <Text style={styles.statusStyle}>{postDetails.status}</Text>

//                     </View>
//                 </View>
//             </ScrollView>




//         </View>
//     )
// }

// export default ViewGig

// const styles = StyleSheet.create({
//     statusStyle: {
//         borderRadius: 15,
//         padding: 10,
//         marginTop: 10,
//         width: '50%',
//         textAlign: 'center',
//         backgroundColor: '#0EB080',
//         overflow: 'hidden',
//         color: 'white',
//         fontWeight: 'bold',

//     },
//     txtStyles: {
//         fontWeight: 'bold',
//         fontSize: 17
//     },
//     statusContainer: {
//         marginTop: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: screenWidth
//     },
//     doneBtn: {
//         width: '60%',
//         backgroundColor: '#0EB080',
//         padding: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10
//     },
//     selectedUser: {
//         borderColor: '#0EB080',
//         borderWidth: 2
//     },
//     acceptedListContainer: {
//         borderWidth: 0.5,
//         flexDirection: 'row',
//         height: 95,
//         padding: 10,
//         marginBottom: 10
//     },
//     acceptedPicContainer: {
//         width: '25%',
//         borderRadius: 50,
//         overflow: 'hidden',
//         borderWidth: 0.5,
//         borderColor: '#0EB080'
//     },
//     txtContainer: {
//         marginLeft: 10
//     },
//     scrollViewContent: {
//         flexGrow: 1,
//         paddingBottom: 10,
//     },
//     acceptedBorder: {
//         borderWidth: 0.5,
//         height: '50%',
//         width: '90%',
//         backgroundColor: '#F9F9F9',
//         borderRadius: 15
//     },
//     acceptedContainer: {
//         padding: 10,
//         marginTop: 10,
//         height: '95%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     btnReview: {
//         backgroundColor: '#0EB080',
//         padding: 10,
//         paddingHorizontal: 50,
//         borderRadius: 15
//     },
//     reviewBtnContainer: {
//         alignItems: 'center',
//         marginTop: 30
//     },
//     reviewInput: {
//         backgroundColor: '#D9D9D9',
//         height: '100%',
//         width: '100%',
//         borderRadius: 10,
//         padding: 10
//     },
//     reviewContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 10,
//         marginTop: 10,
//         height: '35%'
//     },
//     ratingTitles: {
//         borderColor: 'lightgray',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 10,
//         marginTop: 25
//     },
//     ratingTitle: {
//         borderBottomWidth: 1,
//         borderColor: 'lightgray',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 10
//     },
//     ratingBorder: {
//         borderWidth: 0.5,
//         height: '60%',
//         width: '90%',
//         backgroundColor: '#F9F9F9',
//         borderRadius: 15
//     },
//     ratingsContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: screenHeight,
//         width: screenWidth,
//     },
//     appBarStyle: {
//         backgroundColor: '#151414',
//         justifyContent: 'space-between'
//     },
//     scrollViewContent: {
//         flexGrow: 1,
//         paddingBottom: 450,
//     },
//     appliedContainer: {
//         padding: 15,
//         borderWidth: 2,
//         borderColor: 'red',
//     },
//     appliedUserContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//         justifyContent: 'space-between'
//     },
//     userProfilePic: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 10,
//     },
//     userName: {
//         fontWeight: 'bold',
//     },
//     aboutContent: {
//         textAlign: 'center'
//     },
//     aboutTitle: {
//         marginBottom: 10
//     },
//     aboutContainer: {
//         padding: 15,
//         borderWidth: 2
//     },
//     organizerTxtContainer: {
//         justifyContent: 'center',
//         marginLeft: 7
//     },
//     organizerPhotoContainer: {
//         height: 60,
//         width: '18%',
//         borderRadius: 100,
//         overflow: 'hidden'
//     },
//     organizerContainer: {
//         flexDirection: 'row',
//         padding: 10,
//     },
//     scrollContainer: {
//         flex: 1,
//     },
//     InstContainer: {
//         marginTop: 10
//     },
//     instTxt: {
//         fontSize: 10
//     },
//     genreTxt: {
//         fontSize: 10
//     },
//     genreStyle: {
//         flexDirection: 'row',
//         padding: 10,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     instrumentStyle: {
//         flexDirection: 'row',
//         padding: 10,
//         justifyContent: 'center',
//         alignItems: 'center'

//     },
//     chip: {
//         borderWidth: 2,
//         borderColor: '#0EB080',
//         borderRadius: 10,
//         padding: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginHorizontal: 15

//     },
//     btnTxtStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: 15,
//     },
//     btnStyle: {
//         width: '80%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 25,

//     },
//     btnContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         bottom: 20
//     },
//     AddressTxt: {
//         fontWeight: 'bold',
//         fontSize: 13
//     },
//     LocationContainer: {
//         justifyContent: 'center',
//         marginLeft: 10,

//     },
//     AddressContainer: {
//         flexDirection: 'row',
//         paddingLeft: 25,
//         alignItems: 'center',
//         marginTop: 10,

//     },
//     dateTxt: {
//         fontWeight: 'bold',
//         fontSize: 13
//     },
//     timeTxt: {
//         color: '#747688',
//         fontSize: 12
//     },
//     dateContainer: {
//         justifyContent: 'center',
//         marginLeft: 10
//     },
//     dateTimeContainer: {
//         flexDirection: 'row',
//         paddingLeft: 25,
//         alignItems: 'center',

//     },
//     root: {
//         height: screenHeight,
//         width: screenWidth,
//         flex: 1
//     },
//     detailContainer: {
//         borderTopRightRadius: 15,
//         borderTopLeftRadius: 15,
//         height: '100%',
//         zIndex: 2,
//         top: -15,
//         backgroundColor: 'white',


//     },
//     imgContainer: {
//         height: '25%',
//         width: '100%',
//     },
//     imgStyle: {
//         width: '100%',
//         height: '100%',
//     },
//     titleContainer: {
//         justifyContent: 'center',
//         textAlign: 'left',
//         padding: 25
//     },
//     titleStyle: {
//         color: "#0EB080",
//         fontWeight: 'bold',
//         fontSize: 20,
//     }
// })


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

const ViewGig = ({ postID, handleModal }) => {

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
                        schedule: snapshot.val().schedule,
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

    // useEffect(() => {
    //     const dbRef = ref(db, 'gigPosts/' + postID);
    //     onValue(dbRef, (snapshot) => {
    //         if (snapshot.exists()) {
    //             setSchedule(snapshot.val().schedule);
    //         } else {
    //             handleBtnClose(false)
    //         }
    //     });

    // }, [postID])

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
                        accepted: false
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
        </View>
    )
}

export default ViewGig

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