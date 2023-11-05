import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth } from '../../firebase';
import { onValue, ref, set, push, update, off, orderByChild, query, child } from 'firebase/database';
import { db } from '../../firebase';

const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const ChatScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const user = auth.currentUser;
    const uid = user.uid;
    const { userId, chatExist, chatRefKey, chatRef } = route.params;
    const [messages, setMessages] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    const [userPic, setUserPic] = useState([]);




    useEffect(() => {
        const userRef = ref(db, 'users/logged_users/' + uid);
        onValue(userRef, (snapshot) => {
            setUserDetail(snapshot.val().first_name)
            setUserPic(snapshot.val().profile_pic)
        })
    }, [uid])



    useEffect(() => {
        const dbRef = ref(db, 'chatParticipants/' + chatRefKey);
        onValue(dbRef, (snapshot) => {
            console.log(snapshot.val());
        })
    })




    useEffect(() => {

        if (!chatExist) {
            // createChat()
            console.log('chat exist')

        } else if (chatExist) {
            const chatRoomRef = query(ref(db, 'chatroom/' + chatRefKey), orderByChild('createdAt'));
            onValue(chatRoomRef, (snapshot) => {
                const messageList = []
                snapshot.forEach((child) => {
                    const { createdAt, text, user } = child.val();
                    messageList.push({
                        _id: child.key,
                        createdAt: new Date(createdAt),
                        text,
                        user
                    });
                });
                setMessages(messageList.reverse());
            });
            return () => {
                off(chatRoomRef) // Unsubscribe from chatroomsRef updates
            };
        }


    }, []);


    const onSend = useCallback((messages = []) => {
        setMessages(previousMessage => GiftedChat.append(previousMessage, messages));
        const chatRoomRef = push(ref(db, 'chatroom/' + chatRefKey));
        const { _id, createdAt, text, user } = messages[0]
        update(chatRoomRef, {
            _id,
            createdAt,
            text,
            user,
        });
    }, [])



    //create chat to users with non existing chat
    const createChat = () => {
        // stop chat creation if it already exists
        if (chatExist) {
            return;
        } else {

            const chatRef = ref(db, 'chatParticipants');
            const newChatRefKey = push(chatRef).key;
            const newChatRef = ref(db, 'chatParticipants/' + newChatRefKey);
            const userChat = ref(db, 'userChats/' + uid);
            const secondUserChat = ref(db, 'userChats/' + userId);

            const chatData = {
                [uid]: true,
                [userId]: true
            }
            const userChatData = {
                [newChatRefKey]: newChatRefKey,
            }
            const secondUserChatData = {
                [newChatRefKey]: newChatRefKey,
            }
            set(newChatRef, chatData);
            update(userChat, userChatData);
            update(secondUserChat, secondUserChatData);

            console.log(chatRefKey);

        }

    };



    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={navigation.goBack} />
                </Appbar.Header>

                <View style={styles.chatStyle}>
                    <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        messagesContainerStyle={{
                            backgroundColor: '#fff'
                        }}
                        user={{
                            _id: uid,
                            name: userDetail,

                        }}
                    />
                </View>
            </View>
        </View>

    )
}

export default ChatScreen

const styles = StyleSheet.create({
    root: {
        height: screenHeight,
        width: screenWidth
    },
    container: {
        flex: 1,
    },
    textStyle: {
        color: 'white'
    },
    chatStyle: {
        // top: screenHeight / 1.3,
        height: '85%'
    }
})