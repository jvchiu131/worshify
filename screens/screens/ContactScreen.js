import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList } from 'react-native'
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
            console.log(contacts);
        })
    }, [])


    useEffect(() => {
        contacts.map((item) => {
            const chatParticipantsRef = ref(db, 'chatParticipants/' + item.element);
            onValue(chatParticipantsRef, (snapshot) => {
                let userChat = []
                userChat.push(snapshot.val())
                setUserId(userChat);
                console.log(userId)
            })

        })
    }, [])





    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Text>{item.element}</Text>
            </View>
        )
    }

    const renderSeparator = () => {
        return (
            <View style={{
                marginTop: 20,
                height: 0.5
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
    txtContainer: {
        borderWidth: 2,
        borderColor: 'red'
    },
    imgContainer: {
        borderWidth: 2,
        borderColor: 'red'
    },
    itemContainer: {
        borderW: 2,
        borderColor: 'red',
        flexDirection: 'row'
    },
    root: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#151414',
        height: ScreenHeight,
        width: ScreenWidth,
        borderWidth: 2,
        borderColor: 'red'
    },
    container: {
        width: ScreenWidth,
        top: ScreenHeight / 15,
        borderWidth: 2,
        borderColor: 'red'
    },


})