import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth } from '../../firebase';
import { onValue, ref, set, get, push, update } from 'firebase/database';
import { db } from '../../firebase';

const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const ChatScreen = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const user = auth.currentUser;
    const uid = user.uid;
    const [chatRefKey, setChatRefKey] = useState();
    const { userId, chatExist } = route.params;
    const [messages, setMessages] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    const [userPic, setUserPic] = useState([])
    useEffect(() => {
        const userRef = ref(db, 'users/logged_users/' + uid);

        onValue(userRef, (snapshot) => {
            setUserDetail(snapshot.val().first_name)
            setUserPic(snapshot.val().profile_pic)

        })
        console.log(userDetail)



    }, [])


    const onSend = useCallback(async (messages = []) => {
        //checks if the user isn't in a conversation
        if (!chatExist) {
            createChat();
            return;
        }
        const chatRoomRef = ref(db, 'chatroom/' + chatRefKey);

        // Save the new messages to the chat room reference
        const updatedMessages = GiftedChat.append(messages, messages);
        const messageData = updatedMessages.map(message => ({
            _id: message._id,
            createdAt: message.createdAt.toISOString(),
            text: message.text,
            user: {
                _id: message.uid,
                name: message.userDetail,
            },
        }));
        await update(chatRoomRef, { messages: messageData });

        // Update the local state with the new messages
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    }, [])



    //create chat to users with non existing chat
    const createChat = () => {
        //stop chat creation if it already exists
        if (chatExist) {
            return;
        }

        const chatRef = ref(db, 'chatParticipants');
        const chatRefKey = push(chatRef).key;
        const newChatRef = ref(db, 'chatParticipants/' + chatRefKey);
        const userChat = ref(db, 'userChats/' + uid);
        const secondUserChat = ref(db, 'userChats/' + userId);

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


    // useEffect(() => {

    //     const loadData = async () => {
    //         const myChatroom = await fetchMessages();
    //     }
    // })


    // const fetchMessages = async () => {
    //     const snapshot = await get(ref(db, 'chatroom/' + chatRefKey))
    //     return snapshot;
    // }





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
                            avatar: userPic
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