import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ProfileCard from '../components/ProfileCard';
import { Appbar } from 'react-native-paper';
import { auth, db } from '../../firebase';
import { child, onValue, ref } from 'firebase/database';
import { FontAwesome5 } from '@expo/vector-icons';
import ClientGigSearch from '../components/ClientGigSearch';
import MusicianDetails from '../components/MusicianDetails';

const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');



const ProfileScreen = () => {

    const navigation = useNavigation();
    const user = auth.currentUser;
    const uid = user.uid;
    const [isMusician, setIsMusician] = useState(false);
    const [accountType, setAccountType] = useState('');


    const [userDetails, setUserDetails] = useState([]);


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
            }
            setUserDetails(userData);
        })


    }, [])



    useEffect(() => {
        const accountTypeRef = ref(db, 'users/accountType/' + uid + '/accountType')
        onValue(accountTypeRef, (snapshot) => {
            const userType = snapshot.val();
            setAccountType(userType);
        })

        if (accountType === 'Musician') {
            setIsMusician(true);
        }
    })


    return (
        <View style={styles.root}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction color='white' onPress={() => navigation.goBack()} />

                <Text style={styles.txtStyle}>{userDetails.firstName} {userDetails.lastName}</Text>

                <TouchableOpacity>
                    <FontAwesome5 name="edit" size={24} color="white" style={{ padding: 15 }} />
                </TouchableOpacity>
            </Appbar.Header>
            <View style={styles.cardContainer}>
                <ProfileCard />
            </View>


            <View style={styles.profileDetailStyle}>
                {isMusician ? (
                    <View>
                        <MusicianDetails />
                    </View>
                ) : (
                    <View>
                        <Text>Client</Text>
                    </View>
                )}
            </View>
        </View>


    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileDetailStyle: {
        height: '100%',
        bottom: screenHeight / 10
    },
    root: {
        height: screenHeight,
        width: screenWidth,
        backgroundColor: '#151414'
    },
    cardContainer: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        backgroundColor: '#151414',
        justifyContent: 'space-between',
    },
    backBtn: {
        backgroundColor: 'white'
    },
    txtStyle: {
        color: 'white',
        fontWeight: 'bold'
    },
})