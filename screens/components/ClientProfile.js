import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList, Dimensions, Modal } from 'react-native'
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
const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');



const ClientProfile = () => {


    const navigation = useNavigation()
    const route = useRoute()
    const { userId } = route.params
    const user = auth.currentUser
    const uid = user.uid
    const [participants, setParticipants] = useState([]);
    const [chatRefKey, setChatRefKey] = useState(null);
    const [chatExist, setChatExist] = useState(false);
    const [counter, setCounter] = useState(0);

    const [visible, setVisible] = useState(false);

    const hideDialog = () => {
        setVisible(false);
        setCounter(prevCount => prevCount + 1)
    }



    useEffect(() => {
        const interval = setInterval(() => {
            // Update the count every second
            setCounter(prevCount => prevCount + 1);
        }, 500);

        console.log(counter)
        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        checkChat();
    }, [])




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

                setChatExist(true);

            } else {
                //  if parent node "chatParticipants" doesn't exist, will create an initial data
                // console.log('chat doesnt exist')
            }
        })
    }



    useEffect(() => {
        let foundParticipantKey = null

        // Check if chat exists for participants
        const chatExists = participants.some((item) => {
            const participantUid = item.uid;
            const participantUserId = item.userId;
            const participantKey = item.key;
            foundParticipantKey = participantKey;
            return participantUid === true && participantUserId === true;
        });
        if (chatExists) {
            setChatExist(true);
            setChatRefKey(foundParticipantKey);
            // console.log('chat exists')
            // console.log(chatRefKey)
        } else {
            setChatExist(false);
            // console.log('chat doesnt exist with this user')
            // console.log(chatRefKey)
        }
    }, [counter])


    //create chat to users with non existing chat
    const createChat = () => {
        // stop chat creation if it already exists
        let chatRefcontainer = null;
        if (chatExist) {
            navigation.navigate('Chat', { ...props });
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

            chatRefcontainer = newChatRefKey;

            // console.log(chatRefKey);

        }
        setChatExist(true);
        setChatRefKey(chatRefcontainer);
        hideDialog()
    };

    const props = { userId, chatExist, chatRefKey };

    const handleClick = () => {
        if (chatExist) {
            navigation.navigate('Chat', { ...props });
        } else {
            setVisible(true);
            // console.log('chater')
        }
        setCounter(prevCount => prevCount + 1)
    }



    return (
        <View style={styles.root}>

            <Appbar.Header style={styles.appBarHeader}>
                <Appbar.BackAction onPress={navigation.goBack} color='white' />
                <TouchableOpacity onPress={handleClick}>
                    <Ionicons name="chatbox-ellipses-outline" size={24} color="white" style={{ padding: 20 }} />
                </TouchableOpacity>

            </Appbar.Header>

            <View style={styles.container}>
                <ProfileCard {...props} />
            </View>

            <Modal
                animationType='slide'
                visible={visible}
                onRequestClose={!visible}
                transparent={true}>
                <View style={styles.modalView}>
                    <View style={styles.modalRoot}>
                        <Text>Create Chat with this user?</Text>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={hideDialog} style={{ ...styles.btnStyle, backgroundColor: 'red' }}>
                                <Text style={{ color: 'white' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.btnStyle, backgroundColor: '#0EB080' }} onPress={() => createChat()}>
                                <Text style={{ color: 'white' }}>Create Chat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 
            <View>
                <MusicianDetails {...props} />
            </View> */}

        </View>
    )
}

export default ClientProfile

const styles = StyleSheet.create({

    modalRoot: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnStyle: {

        padding: 10,
        borderRadius: 10
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 30
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '25%',
        justifyContent: 'center',
        top: screenHeight / 3
    },
    modalContainer: {
        height: '25%',
        borderWidth: 2,
        borderColor: 'red',
        zIndex: 30
    },
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