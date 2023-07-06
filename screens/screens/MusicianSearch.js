import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, ImageBackground, Modal, } from 'react-native'
import React from 'react'
import { db } from '../../firebase'
import { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { Appbar } from 'react-native-paper';
import Header from '../components/Header'
import { EvilIcons } from '@expo/vector-icons';
import MusicianProfile from '../components/MusicianProfile'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'



const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const MusicianSearch = () => {

    const [musician, setMusician] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigation = useNavigation();



    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);


    const handleItemPress = (key) => {
        console.log('item presseedd', key)
        setSelectedItem(key);
        // showModal();
        navigation.navigate('MusicianProfile', { userId: key });
    };


    //reference to musician 
    useEffect(() => {
        const musicianRef = ref(db, 'users/musician/')
        onValue(musicianRef, (snapshot) => {
            let musicianData = [];
            snapshot.forEach((child) => {
                musicianData.push({
                    key: child.key,
                    firstName: child.val().first_name,
                    lastName: child.val().lname,
                    address: child.val().address,
                    profilePic: child.val().profile_pic,
                    uid: child.val().uid,
                    instruments: child.val().instruments
                })
            })

            setMusician(musicianData);


        })
    }, [])


    const props = {
        userId: selectedItem
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleItemPress(item.uid)}>
                <View style={styles.renderContainer}>
                    <View style={styles.imgContainer}>
                        <ImageBackground source={{ uri: item.profilePic }} style={styles.imgStyle}></ImageBackground>
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameStyle}>{item.firstName} {item.lastName}</Text>
                        </View>

                        <View style={styles.addressContainer}>
                            <EvilIcons name="location" size={15} color="#0EB080" />
                            <Text style={styles.addressText}>
                                {item.address}
                            </Text>
                        </View>

                        <View style={styles.instrumentsContainer}>
                            <Text style={styles.instrumentStyle}>{item.instruments[0]}</Text>
                            <Text style={styles.instrumentStyle}>{item.instruments[1]}</Text>
                            <Text style={styles.instrumentStyle}>{item.instruments[2]}</Text>
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
            <Header />

            <View style={styles.flatlistContainer}>
                <FlatList
                    data={musician}
                    renderItem={renderItem}
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={(item) => item.key}
                />
            </View>


        </View>
    )
}

export default MusicianSearch

const styles = StyleSheet.create({
    appBarHeader: {
        backgroundColor: '#151414',
        justifyContent: 'space-between',
    },
    addressText: {
        color: 'white',
        fontSize: 10
    },
    instrumentStyle: {
        borderWidth: 1,
        borderColor: '#0EB080',
        marginHorizontal: 5,
        fontSize: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        color: 'white',
    },
    instrumentsContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer: {
        marginBottom: 5
    },
    imgStyle: {
        width: '100%',
        height: 70,
    },
    imgContainer: {
        height: '95%',
        width: '25%',
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#0EB080',

    },
    textContainer: {
        marginLeft: 15,
        width: '73%'
    },
    nameStyle: {
        color: 'white',
        fontWeight: 'bold'
    },
    flatlistContainer: {
        height: '100%',
        width: '100%',
        bottom: screenHeight / 5,
        padding: 20,

    },
    renderContainer: {

        backgroundColor: '#1E1E1E',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20

    },
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        width: screenWidth,
    },


})