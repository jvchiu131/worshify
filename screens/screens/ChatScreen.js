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

    const navigation = useNavigation()
    const route = useRoute()
    const user = auth.currentUser;
    const uid = user.uid;
    const [newChatRefKey, setChatRefKey] = useState();
    const { userId, chatExist, chatRefKey } = route.params;
    const [messages, setMessages] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    const [userPic, setUserPic] = useState([])



    useEffect(() => {
        const userRef = ref(db, 'users/logged_users/' + uid);
        console.log(chatExist)

        onValue(userRef, (snapshot) => {
            setUserDetail(snapshot.val().first_name)
            setUserPic(snapshot.val().profile_pic)

            console.log(snapshot.val().first_name)
            console.log(snapshot.val().profile_pic)
        })
        console.log(userDetail)
        console.log(chatRefKey)
    }, [uid])



    useEffect(() => {

        if (chatExist) {
            const chatRoomRef = query(ref(db, 'chatroom/' + chatRefKey), orderByChild('createdAt'));
            onValue(chatRoomRef, (snapshot) => {
                const messageList = []
                snapshot.forEach((child) => {
                    const { createdAt, text, user } = child.val();
                    messageList.push({
                        _id: child.key,
                        createdAt: new Date(createdAt),
                        text,
                        user,
                    });
                });
                setMessages(messageList.reverse());
            });
            return () => {
                off(chatRoomRef) // Unsubscribe from chatroomsRef updates
            };
        } else if (!chatExist) {
            createChat()
        }


    }, [uid]);


    const onSend = useCallback((messages = []) => {
        //checks if the user isn't in a conversation
        if (!chatExist) {
            createChat();
            return;
        }
        const chatRoomRef = push(ref(db, 'chatroom/' + chatRefKey));
        const { _id, createdAt, text, user } = messages[0]
        update(chatRoomRef, {
            _id,
            createdAt,
            text,
            user,
        });

        setMessages(previousMessage => GiftedChat.append(previousMessage, messages));
    }, [])



    //create chat to users with non existing chat
    const createChat = () => {
        // stop chat creation if it already exists
        if (chatExist) {
            return;
        }

        const chatRef = ref(db, 'chatParticipants');
        const chatRefKey = push(chatRef).key;
        const newChatRef = ref(db, 'chatParticipants/' + chatRefKey);
        const userChat = ref(db, 'userChats/' + uid);
        const secondUserChat = ref(db, 'userChats/' + userId);
        console.log(chatRefKey);

        const chatData = {
            [uid]: true,
            [userId]: true
        }
        const userChatData = {
            [chatRefKey]: chatRefKey,
        }
        const secondUserChatData = {
            [chatRefKey]: chatRefKey,
        }
        set(newChatRef, chatData);
        update(userChat, userChatData);
        update(secondUserChat, secondUserChatData);

        setChatRefKey(chatRefKey)

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
        borderWidth: 2,
        borderColor: 'red',
        // top: screenHeight / 1.3,
        height: '85%'
    }
})