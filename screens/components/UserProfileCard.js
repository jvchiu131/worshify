import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase';
import { onValue, ref } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');



const UserProfileCard = () => {

    const user = auth.currentUser;
    const uid = user.uid;

    const navigation = useNavigation();


    const [userDetails, setUserDetails] = useState([]);
    const [userRatings, setUserRatings] = useState();
    const [counter, setCounter] = useState(0);

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



    useEffect(() => {

        const dbRef = ref(db, 'users/logged_users/' + uid)
        onValue(dbRef, (snapshot) => {
            const userData = {
                firstName: snapshot.val().first_name,
                lastName: snapshot.val().lname,
                email: snapshot.val().email,
                profilePic: snapshot.val().profile_pic,
                address: snapshot.val().address,
                accountType: snapshot.val().accountType,
                gigsCompleted: snapshot.val().gigsCompleted || 0,
                gigsCancelled: snapshot.val().gigsCancelled || 0
            }
            setUserDetails(userData);
        })
    }, [uid])

    // useEffect(() => {
    //     console.log(userDetails.gigsCompleted)
    // }, [])

    const handleSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Sign Out',
                    onPress: () => {
                        // Perform sign out logic here, for example:
                        // auth.signOut();
                        // You can navigate to the sign-in screen or perform any other action after sign out.
                        signOut(auth).then(() => {
                            // Sign-out successful.
                            navigation.navigate('Login')
                        }).catch((error) => {
                            // An error happened.
                        });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        if (userDetails.accountType === "Musician") {
            const ratingRef = ref(db, 'users/musicianRatings/' + uid)
            onValue(ratingRef, (snapshot) => {
                let totalRating = 0;
                let length = 0;

                snapshot.forEach((child) => {
                    const rating = child.val().rating;
                    //limits the rating to maximum of 5
                    const limitRating = Math.min(rating, 5);
                    totalRating += limitRating;
                    length++;
                });

                if (length > 0) {
                    const avgRating = totalRating / length;
                    setUserRatings(avgRating);
                } else {
                    console.log('No ratings')
                }
            })
        }
    }, [counter])



    return (
        <View style={styles.rootContainer}>
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <ImageBackground style={styles.imgStyle} source={{ uri: userDetails.profilePic }}></ImageBackground>
                </View>
                <View style={styles.textContainer}>
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.textName}>
                                {userDetails.firstName} {userDetails.lastName}
                            </Text>

                            <Text style={styles.accountTypeStyle}>{userDetails.accountType}</Text>
                        </View>
                        <View style={styles.addressStyle}>
                            <Entypo name="location" size={12} color="#0EB080" />
                            <Text style={styles.addressTxtStyle}>
                                {userDetails.address}
                            </Text>
                        </View>

                        <View style={styles.emailContainer}>
                            <MaterialCommunityIcons name="email-outline" size={12} color="#0EB080" />
                            <Text style={styles.emailTxtStyle}>{userDetails.email}</Text>
                        </View>

                        {userRatings ? (
                            <View style={styles.ratingContainer}>
                                <Entypo name="star" size={14} color="yellow" />
                                <Text style={styles.ratingTxt}>
                                    {userRatings}
                                </Text>
                            </View>
                        ) : null}

                    </View>


                    <View>
                        <View style={styles.statisticsContainer}>
                            <Octicons name="dot-fill" size={24} color="#0EB080" />
                            <Text style={{ ...styles.emailTxtStyle, fontWeight: 'bold' }}>Gigs Completed</Text>
                            <Text style={{ ...styles.emailTxtStyle, color: "#0EB080", fontWeight: 'bold' }}>{userDetails.gigsCompleted}</Text>
                        </View>
                        <View style={styles.statisticsContainer}>
                            <Octicons name="dot-fill" size={24} color="red" />
                            <Text style={{ ...styles.emailTxtStyle, fontWeight: 'bold' }}>Gigs Cancelled</Text>
                            <Text style={{ ...styles.emailTxtStyle, color: "red", fontWeight: 'bold' }}>{userDetails.gigsCancelled}</Text>
                        </View>
                    </View>

                    <View >
                        <TouchableOpacity style={styles.signOutContainer} onPress={() => handleSignOut()}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name="sign-out" size={24} color="white" />
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Sign Out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default UserProfileCard

const styles = StyleSheet.create({
    signOutContainer: {
        borderWidth: 2,
        borderColor: 'red',
        padding: 2,
        marginTop: 25,
        backgroundColor: 'red',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statisticsContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingTxt: {
        color: 'white',
        fontSize: 15,
        marginLeft: 7

    },
    accountTypeStyle: {
        color: '#0EB080',
        fontWeight: '800'
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    emailTxtStyle: {
        color: 'white',
        marginLeft: 7
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    addressStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addressTxtStyle: {
        color: 'white',
        marginLeft: 7
    },
    rootContainer: {
        height: '70%',
        width: '90%',
        borderRadius: 10,
        bottom: screenHeight / 20,
        backgroundColor: '#1E1E1E',
        padding: 10
    },
    imgStyle: {
        height: '100%',
        width: '100%',
        borderRadius: 150,
        overflow: 'hidden',

    },
    imgContainer: {
        height: '80%',
        width: '25%',
        borderRadius: 150,
        borderColor: '#0EB080',
        borderWidth: 1.5
    },
    container: {
        height: '50%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',

    },
    textContainer: {
        height: '100%',
        width: '75%',
        padding: 10,
    },
    textName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})