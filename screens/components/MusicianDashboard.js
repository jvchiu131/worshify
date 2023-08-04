import { StyleSheet, Text, View, Dimensions } from 'react-native'
import FeaturedGig from './FeaturedGig';
import RecommendedGigs from './RecommendedGigs';
import AdCard from './AdCard';

const { height: screenHeight } = Dimensions.get("screen");
const { width: screenWidth } = Dimensions.get("screen");
import React, { useState, useEffect, useRef } from 'react'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { db } from '../../firebase'
import { ref, set, update } from 'firebase/database'
import { auth } from '../../firebase';


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




const MusicianDashboard = () => {


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const user = auth.currentUser;
    const uid = user.uid;
    const [modalVisibility, setModalVisibility] = useState(false);




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

            <View style={styles.container}>
                <View style={styles.featuredContainer}>
                    <View style={styles.txtContainer}>
                        <Text style={styles.txtStyle}>FEATURED GIGS</Text>
                    </View>

                    <View style={styles.recCardContainer}>
                        <FeaturedGig />
                    </View>


                </View>


                <View style={styles.recommendedContainer}>
                    <View style={styles.txtContainer}>
                        <Text style={styles.txtStyle}>
                            RECOMMENDED GIGS
                        </Text>
                    </View>
                    <View style={styles.recCardContainer}>
                        <RecommendedGigs />
                    </View>
                </View>


            </View>


        </View>
    )
}

export default MusicianDashboard

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        justifyContent: 'flex-start',
    },
    container: {
        height: "100%",
        bottom: screenHeight / 4.9,
    },
    featuredContainer: {
        width: screenWidth,
        height: '25%',
    },
    recommendedContainer: {
        height: '35%',
        top: screenHeight / 20,
        width: '100%',
    },
    txtContainer: {
        width: '50%',
        height: '15%',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 10,
        margin: 10,
        paddingTop: 10,
    },
    recCardContainer: {
        height: '85%',
        width: '100%',
    },
    txtStyle: {
        color: "white",
        fontWeight: '800',
        fontSize: 14
    },

})