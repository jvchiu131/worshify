import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../firebase';
import { onValue, ref, child, push } from 'firebase/database';
import { auth } from '../../firebase';




const { height: ScreenHeight } = Dimensions.get('screen');
const { width: ScreenWidth } = Dimensions.get('screen');


const ContactScreen = () => {

    const user = auth.currentUser;
    const uid = user.uid;
    const [contacts, setContacts] = useState([]);
    const navigation = useNavigation();
    const [userId, setUserId] = useState([]);
    const [userDetails, setUserDetails] = useState([]);

    const handleItemPress = (key) => {
        console.log('item presseedd', key)
        // showModal();
        navigation.navigate('Chat', { chatRef: key });
    };

    //extracting user chat rooms
    useEffect(() => {
        const userChatRef = ref(db, 'userChats/' + uid);
        onValue(userChatRef, (snapshot) => {
            let userChatData = []
            snapshot.forEach((child) => {
                userChatData.push({
                    key: child.key,
                    element: child.val()
                })
            })
            setContacts(userChatData);
        })
    }, [])

    // useEffect(() => {
    //     contacts.map((user) => {
    //         console.log(user)
    //     })
    // }, [])


    useEffect(() => {
        contacts.map((item) => {
            const chatParticipantsRef = ref(db, 'chatParticipants/' + item.key);
            onValue(chatParticipantsRef, (snapshot) => {
                let userChat = []
                snapshot.forEach((child) => {
                    if (child.key !== uid) {
                        userChat.push(child.key)
                    }
                })
                setUserId(userChat);
                // console.log(userId)
            })
        })
    }, [])






    useEffect(() => {

        const userRef = ref(db, 'users/logged_users/' + userId);
        onValue(userRef, (snapshot) => {
            let userData = []
            snapshot.forEach((child) => {
                userData.push({
                    key: child.key,
                    firstName: child.val().first_name,
                    lastName: child.val().lname,
                    profilePic: child.val().profile_pic
                })
            })
            setUserDetails(userData);
            // console.log(userData);
        })
    }, [])


    const renderItem = ({ item }) => {


        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item.element)}>
                <View style={styles.imgContainer}>
                    <ImageBackground source={{ uri: item.profilePic }} style={styles.imgStyle}>

                    </ImageBackground>
                </View>
                <Text style={{ color: 'white' }}>{item.element} {item.lastName}</Text>
            </TouchableOpacity>
        )
    }



    const renderSeparator = () => {
        return (
            <View style={{
                marginTop: 20,
                height: 20
            }} />
        )

    }



    return (

        <View style={styles.root}>
            <Header />
            <View style={styles.container}>
                <View>

                </View>
                <View>
                    <FlatList
                        data={contacts}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}
                        keyExtractor={(item) => item.key} />
                </View>
            </View>
        </View>


    )
}

export default ContactScreen

const styles = StyleSheet.create({
    imgStyle: {
        height: 20,
        width: 20
    },
    txtContainer: {
        // borderWidth: 2,
        // borderColor: 'red'
    },
    imgContainer: {
        // borderWidth: 2,
        // borderColor: 'red'
    },
    itemContainer: {
        backgroundColor: '#1E1E1E',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20
    },
    root: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#151414',
        height: ScreenHeight,
        width: ScreenWidth,
        // borderWidth: 2,
        // borderColor: 'red'
    },
    container: {
        width: ScreenWidth,
        top: ScreenHeight / 15,
        // borderWidth: 2,
        // borderColor: 'red'
    },


})