import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase';
import { onValue, ref } from 'firebase/database';
import { auth } from '../../firebase';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');



const ProfileCard = ({ userId }) => {

    const user = auth.currentUser;
    const uid = user.uid;


    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {

        const dbRef = ref(db, 'users/logged_users/' + userId)
        onValue(dbRef, (snapshot) => {
            const userData = {
                firstName: snapshot.val().first_name,
                lastName: snapshot.val().lname,
                email: snapshot.val().email,
                profilePic: snapshot.val().profile_pic,
                address: snapshot.val().address,
                accountType: snapshot.val().accountType,
                genre: snapshot.val().genre,
                instruments: snapshot.val().instruments,
            }
            setUserDetails(userData);
        })
    }, [])





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

                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProfileCard

const styles = StyleSheet.create({
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
        height: '100%',
        width: '100%',
        borderRadius: 10,
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