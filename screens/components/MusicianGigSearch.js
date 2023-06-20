import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { db, auth } from '../../firebase'
import { useState, useEffect } from 'react'
import { DataSnapshot, child, onValue, ref, set } from 'firebase/database'



const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const MusicianGigSearch = () => {

    const [gigData, setGigData] = useState([])




    useEffect(() => {
        const dbRef = ref(db, 'gigPosts');
        const gigDetails = []
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                gigDetails.push({
                    key: childSnapshot.key,
                    Event_Type: childSnapshot.val().Event_Type,
                    GigAddress: childSnapshot.val().Gig_Address,
                    postID: childSnapshot.val().postID,
                    GigName: childSnapshot.val().Gig_Name,
                    uid: childSnapshot.val().uid,
                    GenreNeeded: childSnapshot.Genre_Needed,
                    StartTime: childSnapshot.val().Gig_Start,
                    EndTime: childSnapshot.val().Gig_End,
                    InstrumentsNeeded: childSnapshot.val().Instruments_Needed
                });
            })

        })
        setGigData(gigDetails);
    }, [])





    const renderItem = ({ item }) => {
        return (
            <View>
                <Text>{item.GigName}</Text>
                <Text>{item.GigAddress}</Text>
                <Text>{item.Event_Type}</Text>
                <Text>{item.key}</Text>
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
        <View>
            <FlatList
                data={gigData}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                ItemSeparatorComponent={renderSeparator} />
        </View>
    )
}

export default MusicianGigSearch

const styles = StyleSheet.create({})