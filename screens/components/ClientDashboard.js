import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { db } from '../../firebase'
import { ref, set, update } from 'firebase/database'
import { auth } from '../../firebase';
import FeaturedMusician from './FeaturedMusician';
import UpcomingGigs from './UpcomingGigs';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');



Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
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
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

const ClientDashboard = () => {


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const user = auth.currentUser;
    const uid = user.uid;

    useEffect(() => {
        console.log(user.isAnonymous)
    }, [])




    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
        });



        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });



        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const handleNotification = async () => {
        const userRef = ref(db, 'users/notificationTokens/' + uid);
        await set(userRef, {
            expoToken: expoPushToken,
        })
    }

    useEffect(() => {
        handleNotification()
    }, [expoPushToken])





    return (
        <View style={styles.root}>
            <View style={styles.txtContainer}>
                <Text style={styles.txtStyle}>FEATURED MUSICIANS</Text>
            </View>
            <View style={styles.featuredContainer}>
                <FeaturedMusician />
            </View>


            <View style={styles.txtContainer}>
                <Text style={styles.txtStyle}>UPCOMING GIGS</Text>
            </View>

            <View style={styles.container}>
                <UpcomingGigs />
            </View>
        </View>
    )
}

export default ClientDashboard

const styles = StyleSheet.create({
    txtStyle: {
        color: "white",
        fontWeight: '800',
        fontSize: 16
    },
    txtContainer: {
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 10,
        margin: 10,
    },
    featuredContainer: {
        width: screenWidth,
        height: '30%',
    },
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        width: screenWidth,
        bottom: screenHeight / 4.4
    },
    container: {
        marginTop: 10,
        height: '100%',
    }
})