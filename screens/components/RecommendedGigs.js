import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, Dimensions, FlatList, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase';
import { ref, onValue, child } from 'firebase/database';
import { auth } from '../../firebase';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import GigDetails from './GigDetails';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');



const RecommendedGigs = () => {

    const user = auth.currentUser;
    const uid = user.uid;
    const [userInstrument, setUserInstruments] = useState([]);
    const [userGenre, setUserGenre] = useState([])
    const [userGender, setUserGender] = useState();
    const [gigGenre, setGigGenre] = useState([]);
    const [gigInstrument, setGigInstrument] = useState([]);
    const [recommendedGigs, setRecommendedGigs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const [counter, setCounter] = useState(0);
    const [gigSched, setGigSched] = useState([]);

    useEffect(() => {
        const userInstrumentRef = ref(db, 'users/musician/' + uid + '/instruments');
        onValue(userInstrumentRef, (snapshot) => {
            const instrumentsData = snapshot.val();
            setUserInstruments(instrumentsData);

        })
    }, [uid])

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
        const userGenreRef = ref(db, 'users/musician/' + uid + '/genre');
        onValue(userGenreRef, (snapshot) => {
            const genreData = snapshot.val();
            setUserGenre(genreData);

        })

    }, [uid])

    useEffect(() => {
        const userGenderRef = ref(db, 'users/musician/' + uid + '/gender')
        onValue(userGenderRef, (snapshot) => {
            const genderData = snapshot.val();
            setUserGender(genderData);
        })


    }, [uid])

    const renderSeparator = () => {
        return (
            <View style={{
                marginHorizontal: 10,
                height: 0.5
            }} />
        )
    }

    useEffect(() => {
        const gigRef = ref(db, 'gigPosts');
        let gigDetails = [];
        let gigInstruments = [];
        onValue(gigRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                gigDetails.push({
                    key: childSnapshot.key,
                    Event_Type: childSnapshot.val().Event_Type,
                    postID: childSnapshot.val().postID,
                    GigName: childSnapshot.val().Gig_Name,
                    uid: childSnapshot.val().uid,
                    GenreNeeded: childSnapshot.val().Genre_Needed,
                    InstrumentsNeeded: childSnapshot.val().Instruments_Needed,
                    GigImage: childSnapshot.val().Gig_Image,
                    gender: childSnapshot.val().gender,
                    sched: childSnapshot.val().schedule,
                    status: childSnapshot.val().gigStatus
                });
            });

            const filteredGigs = gigDetails.filter((gig) => {
                const excludedStatuses = ['Done', 'Cancel', 'On-going', 'Close'];
                return !excludedStatuses.includes(gig.status);
            });

            const gigScore = filteredGigs.map((gig) => {

                const instrumentsGig = gig.InstrumentsNeeded.map((inst) => inst.name) || [];
                const genreGig = gig.GenreNeeded;
                const genderGig = gig.gender;

                const matchedGender = userGender === genderGig;
                const matchedGenre = genreGig.filter((genre) => userGenre.includes(genre));
                const matchedInstruments = instrumentsGig.filter((instrument) => userInstrument.includes(instrument));
                let totalGenreAndInstrument = userGenre.length + userInstrument.length

                if (matchedGender) {
                    totalGenreAndInstrument += 1
                }

                let matchedItemsCount = matchedGenre.length + matchedInstruments.length;

                if (matchedGender) {
                    matchedItemsCount += 1
                }

                const calculatePercentage = (matchedItemsCount / totalGenreAndInstrument) * 100;

                return { ...gig, calculatePercentage };

            });

            const gigSorted = gigScore.sort((a, b) => b.calculatePercentage - a.calculatePercentage);
            const topGigs = gigSorted.slice(0, 5);
            setRecommendedGigs(topGigs);
        });
    }, [counter])


    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.container} onPress={() => { handleModal(item.key) }} key={item.postID.toString()}>
                <View style={styles.imageContainer}>
                    <ImageBackground source={{ uri: item.GigImage }} style={styles.imgStyle} >
                    </ImageBackground>
                    <Text style={styles.percentageStyle}>{Math.round(item.calculatePercentage)}% Matched</Text>
                </View>

                <View style={styles.nameContainer}>
                    <Text style={styles.titleStyle}>{item.GigName}</Text>
                </View>

                {/* <View style={styles.dateAddressStyle}>
                    <View style={styles.addressStyle}>
                        <EvilIcons name="location" size={15} color="#0EB080" />
                        <Text style={{ color: 'white' }}>{item.GigAddress}</Text>
                    </View>

                    <View style={styles.dateStyle}>
                        <MaterialIcons name="date-range" size={15} color="#0EB080" style={{ marginRight: 5 }} />
                        <Text style={{ color: 'white' }}>{item.GigDate}</Text>
                    </View>
                </View> */}
            </TouchableOpacity>
        )

    }

    const handleModal = (key) => {
        setSelectedItem(key);
        showModal()
    }

    const props = { postID: selectedItem };



    return (
        <View style={styles.rootContainer}>
            <FlatList
                data={recommendedGigs}
                renderItem={renderItem}
                keyExtractor={(item) => item.postID}
                ItemSeparatorComponent={renderSeparator}
                horizontal
                refreshing
            />

            <Modal
                visible={modalVisible}
                animationType='slide'
                onRequestClose={hideModal}
            >
                <Appbar.Header style={styles.appBarStyle}>
                    <Appbar.BackAction onPress={hideModal} color='white' />
                </Appbar.Header>

                <GigDetails {...props} />
            </Modal>

        </View>

    )
}

export default RecommendedGigs

const styles = StyleSheet.create({
    appBarStyle: {
        backgroundColor: '#151414',
    },
    percentageStyle: {
        fontSize: 20,
        color: '#0EB080',
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'right'
    },
    rootContainer: {
        flexDirection: 'row',
        height: '100%',
    },
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        width: screenWidth / 1.20,
        padding: 10,
        backgroundColor: '#3C3C43',
        borderRadius: 15,
    },
    imageContainer: {
        height: '65%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    nameContainer: {
        backgroundColor: '#3C3C43',
        width: '100%',
        height: '15%',
        marginTop: 10,
    },
    imgStyle: {
        height: '100%',
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden'
    },
    titleStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    dateAddressStyle: {
        height: '20%',
        width: '100%',
        justifyContent: 'center'
    },
    addressStyle: {
        flexDirection: 'row',
    },
    dateStyle: {
        flexDirection: 'row',
    }
})