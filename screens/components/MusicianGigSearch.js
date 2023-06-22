import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, ImageBackground, Modal } from 'react-native'
import React from 'react'
import { db } from '../../firebase'
import { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { EvilIcons } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import GigDetails from './GigDetails'


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const MusicianGigSearch = () => {

    const [gigData, setGigData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const handleItemPress = (key) => {
        setSelectedItem(key);
        showModal();
        console.log(key)
    };


    const props = { postID: selectedItem };


    useEffect(() => {
        const dbRef = ref(db, 'gigPosts');
        const gigDetails = [];

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
                    GigImage: childSnapshot.val().Gig_Image,
                    GigDate: childSnapshot.val().Gig_Date
                });
            })
            setGigData(gigDetails);
        })

    }, [])




    const renderItem = ({ item }) => {


        return (
            <TouchableOpacity style={styles.renderStyle} onPress={() => handleItemPress(item.postID)}>

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
                            <EvilIcons name="location" size={15} color="#0EB080" />
                            <Text style={styles.txtStyle}>{item.GigAddress}</Text>
                        </View>

                        <View style={styles.dateContainer}>
                            <View style={styles.dateTimeContainer}>
                                <MaterialIcons name="date-range" size={15} color="#0EB080" style={{ marginRight: 5 }} />
                                <Text style={styles.txtStyle}>{item.GigDate}</Text>
                            </View>
                            <View style={styles.dateTimeContainer}>
                                <FontAwesome5 name="clock" size={15} color="#0EB080" style={{ marginRight: 5 }} />
                                <Text style={styles.txtStyle}>{item.StartTime} - {item.EndTime}</Text>
                            </View>
                        </View>

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

            <Modal
                visible={modalVisible}
                animationType='slide'
                onRequestClose={hideModal}
            >
                <GigDetails {...props} />
            </Modal>


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
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',

    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
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
        justifyContent: 'flex-start',
        marginTop: 5
    },
    txtStyle: {
        color: 'white',
        fontSize: 11
    },
    root: {
        height: screenHeight,
        width: screenWidth,
        bottom: screenHeight / 5
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    renderStyle: {
        marginHorizontal: 2
    },
    titleStyle: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        width: '107%'
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