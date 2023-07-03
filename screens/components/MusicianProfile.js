import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import ProfileCard from './ProfileCard'
import MusicianDetails from './MusicianDetails';
import { useRoute } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';
import { ref, set, push, update } from 'firebase/database';
import { auth } from '../../firebase';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');



const MusicianProfile = () => {


    const navigation = useNavigation()
    const route = useRoute()
    const { userId } = route.params
    const user = auth.currentUser
    const uid = user.uid


    const props = { userId };



    const createChat = () => {
        const chatRefKey = push(child(ref(db), 'chats')).key;
        const chatRef = ref(db, 'chatParticipants/' + chatRefKey)
        const userChat = ref(db, 'userChats/' + uid)
        const secondUserChat = ref(db, 'userChats/' + userId)
        set(chatRef, {
            [uid]: true,
            [userId]: true
        })

        update(userChat, {
            chatUID: chatRefKey
        })
        update(secondUserChat, {
            chatUID: chatRefKey
        })
    }


    return (
        <View style={styles.root}>

            <Appbar.Header style={styles.appBarHeader}>
                <Appbar.BackAction onPress={navigation.goBack} color='white' />
                <Ionicons name="chatbox-ellipses-outline" size={24} color="white" style={{ padding: 20 }}
                    onPress={() => navigation.navigate('Chat', { ...props })} />
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