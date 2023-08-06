import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
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
            const notifications = []; // Initialize an empty array
            snapshot.forEach((notif) => {
                notifications.push(notif.val()); // Push values from snapshot
            });
            setNotification(notifications.reverse()); // Set the state once with the accumulated array
        });

        // console.log(notification.map((notif) => notif.body))
    }, []);


    return (
        <View style={styles.root}>
            <Appbar.Header style={styles.appBarStyle}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color='white' />
                <Text style={{ color: 'white', fontWeight: 'bold' }}>NOTIFICATIONS</Text>
            </Appbar.Header>


            {notification.map((notif) => (
                <View style={styles.container} key={notif.key}>
                    <View style={styles.titleContainer}>
                        <Text style={{ color: 'white' }}>{notif.title}</Text>
                    </View>
                    <View style={styles.bodyContainer}>
                        <Text style={{ color: 'white' }}>{notif.body}</Text>
                    </View>
                </View>
            ))}


        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    titleContainer: {
        marginBottom: 5
    },
    bodyContainer: {},
    scrollContainer: {
        flexGrow: 1,
        paddingRight: 550
    },
    appBarStyle: {
        backgroundColor: '#151414',
    },
    root: {
        height: screenHeight,
        width: screenWidth,
        backgroundColor: '#151414',

    },
    container: {
        height: '10%',
        width: '100%',
        padding: 20,
        borderWidth: 1,
        borderColor: 'grey',
        marginBottom: 10,
        borderRadius: 15
    }
})