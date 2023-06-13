import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { auth, db } from '../../firebase';
import { DataSnapshot, onValue, ref, set } from 'firebase/database';
import { useState } from 'react';
import { useEffect } from 'react';
import MusicianDashboard from '../components/MusicianDashboard';
import ClientDashboard from '../components/ClientDashboard';


const { height: screenHeight } = Dimensions.get("screen");
const { width: screenWidth } = Dimensions.get('screen');
const DashScreen = () => {

    const [isMusician, setIsMusician] = useState(false);
    const [accountType, setAccountType] = useState("");
    const user = auth.currentUser;
    const uid = user.uid;


    //handles account type identification
    useEffect(() => {
        const userType = ref(db, 'users/' + uid + '/accountType');
        onValue(userType, (DataSnapshot) => {
            const accType = DataSnapshot.val().toString();
            setAccountType(accType);
        });

        if (accountType === 'Musician') {
            console.log(user.email + " is musician")
            console.log(accountType);
            setIsMusician(true);
        } else if (accountType === "Client") {
            console.log(user.email + " is client")
            console.log(accountType);
            setIsMusician(false);
        }
    }, [accountType]);




    return (
        <View style={styles.root}>
            <Header />

            {isMusician ? (
                <MusicianDashboard />
            ) : (
                <ClientDashboard />
            )}


        </View>
    )
}



export default DashScreen

const styles = StyleSheet.create({
    adStyle: {
        bottom: screenHeight / 1.6,
        alignItems: 'center'
    },
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
    },
    btn: {
        bottom: screenHeight / 5
    },
    cardjob: {
        bottom: screenHeight / 2.4,
        alignItems: 'center',
    },
    textStyle: {
        fontWeight: 'bold',
        color: 'white'
    },
    textContainer: {
        bottom: screenHeight / 2.4,
        alignItems: 'flex-start',
        width: '95%',
        margin: '3%'
    }


})