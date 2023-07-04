import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import ProfileCard from './ProfileCard'
import MusicianDetails from './MusicianDetails';
import { useRoute } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';
import { ref, set, push, update, get, onValue, child, off } from 'firebase/database';
import { auth } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');



const MusicianProfile = () => {


    const navigation = useNavigation()
    const route = useRoute()
    const { userId } = route.params
    const user = auth.currentUser
    const uid = user.uid
    const [participants, setParticipants] = useState([]);
    const [chatRefKey, setChatRefKey] = useState(null);
    const [chatExist, setChatExist] = useState(false);

    const props = { userId, chatExist, chatRefKey };


    //checks if user already has a chat with this user
    const checkChat = () => {
        const chatRef = ref(db, 'chatParticipants')
        let participantData = [];
        onValue(chatRef, (snapshot) => {
            participantData = [];
            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    participantData.push({
                        key: child.key,
                        uid: child.val()[uid],
                        userId: child.val()[userId]
                    })

                    setParticipants(participantData)
                })

            } else {
                //  if parent node "chatParticipants" doesn't exist, will create an initial data
                console.log('chat doesnt exist')
            }

        })


    }
    useEffect(() => {
        checkChat();
    }, [])

    useEffect(() => {
        // Check if chat exists for participants
        const chatExists = participants.some((item) => {
            const participantUid = item.uid;
            const participantUserId = item.userId;
            const participantKey = item.key;

            setChatRefKey(participantKey)

            return participantUid === true && participantUserId === true;
        });
        if (chatExists) {
            setChatExist(true);
            console.log('chat exists')
            // console.log(chatRefKey)
        } else {
            console.log('chat doesnt exist with this user')
            setChatExist(false);
        }
    }, [participants])





    return (
        <View style={styles.root}>

            <Appbar.Header style={styles.appBarHeader}>
                <Appbar.BackAction onPress={navigation.goBack} color='white' />
                <TouchableOpacity onPress={() => { navigation.navigate('Chat', { ...props }); }}>
                    <Ionicons name="chatbox-ellipses-outline" size={24} color="white" style={{ padding: 20 }} />
                </TouchableOpacity>

            </Appbar.Header>

            <View style={styles.container}>
                <ProfileCard {...props} />
            </View>

            <View>
                <MusicianDetails {...props} />
            </View>

        </View>
    )
}

export default MusicianProfile

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        width: screenWidth,
    },
    container: {
        alignItems: 'center',
        height: '30%',
        padding: 15
    },
    appBarHeader: {
        backgroundColor: '#151414',
        justifyContent: 'space-between',
    },

})