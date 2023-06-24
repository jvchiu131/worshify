import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ProfileCard from '../components/ProfileCard';
import { Appbar } from 'react-native-paper';
import { auth, db } from '../../firebase';
import { child, onValue, ref } from 'firebase/database';
import { FontAwesome5 } from '@expo/vector-icons';

const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');



const ProfileScreen = () => {

    const navigation = useNavigation();
    const user = auth.currentUser;
    const uid = user.uid;
    const [fName, setFname] = useState('');
    const [lName, setLname] = useState('');


    useEffect(() => {
        const fNameRef = ref(db, 'users/' + '/logged_users/' + uid + '/first_name');
        onValue(fNameRef, (snapshot) => {
            setFname(snapshot.val());
        })

        const lNameRef = ref(db, 'users/' + '/logged_users/' + uid + '/lname');
        onValue(lNameRef, (snapshot) => {
            setLname(snapshot.val());
        })
    })


    return (
        <View style={styles.root}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction color='white' onPress={() => navigation.goBack()} />

                <Text style={styles.txtStyle}>{fName} {lName}</Text>

                <TouchableOpacity>
                    <FontAwesome5 name="edit" size={24} color="white" style={{ padding: 15 }} />
                </TouchableOpacity>
            </Appbar.Header>
            <View style={styles.cardContainer}>
                <ProfileCard />
            </View>

        </View>


    )
}

export default ProfileScreen

const styles = StyleSheet.create({
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