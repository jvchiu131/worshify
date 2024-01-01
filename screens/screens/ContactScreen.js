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
        navigation.navigate('Chat', { chatRefKey: key, chatExist: true, });
    };

    //extracting user chat rooms
    useEffect(() => {
        const userChatRef = ref(db, 'contacts/' + uid);
        onValue(userChatRef, (snapshot) => {
            let userChatData = []
            snapshot.forEach((child) => {
                userChatData.push({
                    newChatRefKey: child.val().newChatRefKey,
                    fName: child.val().fName,
                    lName: child.val().lName,
                    profilePic: child.val().profilePic
                })
            })
            setContacts(userChatData);
        })
    }, [])

    // useEffect(() => {
    //     contacts.map((user) => {
    //         console.log(user.newChatRefKey)
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



    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item.newChatRefKey)}>
                <View style={styles.imgContainer}>
                    <ImageBackground source={{ uri: item.profilePic }} style={styles.imgStyle}>
                    </ImageBackground>
                </View>
                <Text style={{ color: 'white' }}>{item.fName} </Text>
                <Text style={{ color: 'white' }}>{item.lName}</Text>
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
                {/* <View>

                </View> */}
                <View style={styles.flatStyle}>
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
    flatStyle: {
        height: '100%'
    },
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
        borderRadius: 20,
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
        // top: ScreenHeight / ,
        bottom: ScreenHeight / 4,
        // borderWidth: 2,
        // borderColor: 'red',
        height: '81%'
    },


})