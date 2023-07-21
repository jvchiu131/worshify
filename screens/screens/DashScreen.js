import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { auth, db } from '../../firebase';
import { DataSnapshot, child, onValue, ref, set, update } from 'firebase/database';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import MusicianDashboard from '../components/MusicianDashboard';
import ClientDashboard from '../components/ClientDashboard';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';



const { height: screenHeight } = Dimensions.get("screen");
const { width: screenWidth } = Dimensions.get('screen');



const DashScreen = () => {

    const [isMusician, setIsMusician] = useState(false);
    const [accountType, setAccountType] = useState();
    const user = auth.currentUser;
    const uid = user.uid;




    //handles account type identification
    useEffect(() => {
        const userType = ref(db, 'users/' + '/accountType/' + uid + '/accountType');
        onValue(userType, (DataSnapshot) => {
            const accType = DataSnapshot.val();
            setAccountType(accType);
        });

        if (accountType === 'Musician') {

            setIsMusician(true);
        } else if (accountType === "Client") {

            setIsMusician(false);
        }
    }, [accountType]);




    return (
        <View style={styles.root}>
            <Header />

            <View>
                {isMusician ? (
                    <MusicianDashboard />
                ) : (
                    <ClientDashboard />
                )}

            </View>


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