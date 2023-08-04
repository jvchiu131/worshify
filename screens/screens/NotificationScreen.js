import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';
import { ref, onValue, } from 'firebase/database';
import { auth } from '../../firebase';


const { height: screenHeight, width: screenWidth } = Dimensions.get('screen')


const NotificationScreen = () => {

    const navigation = useNavigation()
    const [notification, setNotification] = useState([]);
    const user = auth.currentUser;
    const uid = user.uid;


    useEffect(() => {
        const notificationRef = ref(db, 'users/usersNotification/' + uid);
        onValue(notificationRef, (snapshot) => {
            snapshot.forEach((notif) => {
                setNotification(notif.val())
            })
        })
    }, [])


    return (
        <View style={styles.root}>
            <Appbar.Header style={styles.appBarStyle}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color='white' />
            </Appbar.Header>
            <View style={styles.container}>

            </View>

        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    appBarStyle: {
        backgroundColor: '#151414',
    },
    root: {
        height: screenHeight,
        width: screenWidth,
        backgroundColor: '#151414',

    },
    container: {

        justifyContent: 'center',
        alignItems: 'center'
    }
})