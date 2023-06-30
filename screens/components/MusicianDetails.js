import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Modal, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db, auth } from '../../firebase';
import { ref, onValue, child } from 'firebase/database';
import { EvilIcons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import AddPortfolio from './AddPortfolio';



const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');


const MusicianDetails = () => {

    const user = auth.currentUser;
    const uid = user.uid;

    const [instruments, setInstruments] = useState([]);
    const [genre, setGenre] = useState([]);
    const [childrenExist, setChildrenExist] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const pathRef = child(ref(db), 'users/logged_users/' + uid + '/instruments')
        onValue(pathRef, (snapshot) => {
            let data = [];
            snapshot.forEach((child) => {
                data.push(child.val());
            })

            setInstruments(data);
        })


    }, [])

    useEffect(() => {
        const pathRef = child(ref(db), 'users/logged_users/' + uid + '/genre')
        onValue(pathRef, (snapshot) => {
            let data = [];
            snapshot.forEach((child) => {
                data.push(child.val());
            })

            setGenre(data);
        })


    }, [])



    return (

        <View style={styles.root}>
            <View style={styles.genreContainer}>
                <View style={styles.titleContainer}>
                    <Text>Genre</Text>
                </View>
                <View style={styles.listContainer}>
                    <Text style={styles.txtStyle}>{genre[0]}</Text>
                    <Text style={styles.txtStyle}>{genre[1]}</Text>
                    <Text style={styles.txtStyle}>{genre[2]}</Text>
                </View>
            </View>
            <View style={styles.instrumentsContainer}>
                <View style={styles.titleContainer}>
                    <Text>Instruments</Text>
                </View>
                <View style={styles.listContainer}>
                    <Text style={styles.txtStyle}>{instruments[0]}</Text>
                    <Text style={styles.txtStyle}>{instruments[1]}</Text>
                    <Text style={styles.txtStyle}>{instruments[2]}</Text>
                </View>

            </View>

            <View style={styles.portfolioContainer}>
                <View style={styles.titleContainer}>
                    <Text>Portfolio</Text>
                </View>

                <View style={styles.portfolioStyle}>
                    {childrenExist ? (
                        <View></View>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.portfolioSaveStyle} onPress={showModal}>
                                <EvilIcons name="image" size={24} color="black" />
                                <Text> Add Images</Text>
                            </TouchableOpacity>
                            <Modal
                                visible={modalVisible}
                                animationType='slide'
                                onRequestClose={hideModal}
                            >
                                <Appbar.BackAction onPress={hideModal} style={styles.appBarStyle} />
                                <AddPortfolio />

                            </Modal>
                        </>

                    )}
                </View>
            </View>

        </View>

    )
}

export default MusicianDetails

const styles = StyleSheet.create({
    portfolioSaveStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '55%'
    },
    portfolioStyle: {
        alignItems: 'center'
    },
    txtStyle: {
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 5,
        color: '#0EB080',
        marginHorizontal: 10,
        fontSize: 10
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    genreContainer: {
        borderTopWidth: 0.5,
        borderTopColor: '#000000',
        padding: 20
    },
    instrumentsContainer: {
        borderTopWidth: 0.5,
        borderTopColor: '#000000',
        padding: 20
    },
    portfolioContainer: {
        borderTopWidth: 0.5,
        borderTopColor: '#000000',
        padding: 20,

    },
    titleContainer: {
        marginBottom: 5
    }
})