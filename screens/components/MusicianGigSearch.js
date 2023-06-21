import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native'
import React from 'react'
import { db, auth } from '../../firebase'
import { useState, useEffect } from 'react'
import { DataSnapshot, child, onValue, ref, set } from 'firebase/database'
import { EvilIcons } from '@expo/vector-icons';



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
                    InstrumentsNeeded: childSnapshot.val().Instruments_Needed,
                    GigImage: childSnapshot.val().Gig_Image
                });
            })
            setGigData(gigDetails);

        })

    }, [])





    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.renderStyle}>

                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <ImageBackground source={{ uri: item.GigImage }} style={styles.imgStyle}>
                        </ImageBackground>
                    </View>
                    <View style={styles.txtContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleStyle}>{item.GigName}</Text>
                        </View>
                        <View style={styles.addressContainer}>
                            <EvilIcons name="location" size={20} color="#0EB080" />
                            <Text style={styles.txtStyle}>{item.GigAddress}</Text>
                        </View>

                        <Text style={styles.txtStyle}>{item.Event_Type}</Text>
                    </View>
                </View>
            </TouchableOpacity>

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
            <View style={styles.header}>
                <Text style={styles.availGigs}>Available Gigs</Text>
            </View>


            <FlatList
                data={gigData}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                ItemSeparatorComponent={renderSeparator} />
        </View>
    )
}

export default MusicianGigSearch

const styles = StyleSheet.create({
    header: {
        margin: 15
    },
    availGigs: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold'
    },
    addressContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: 'red'
    },
    txtStyle: {
        color: 'white',
        fontSize: 10
    },
    root: {
        height: screenHeight,
        width: screenWidth,
        bottom: screenHeight / 5
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    renderStyle: {
        marginHorizontal: 2
    },
    titleStyle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    titleContainer: {
        margin: 2
    },
    txtContainer: {
        width: '60%',
    },
    imgContainer: {
        height: '100%',
        width: '30%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    imgStyle: {
        width: '100%',
        height: 70,
    }

})