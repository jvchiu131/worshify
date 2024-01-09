import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, ImageBackground, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { ref, onValue, update } from 'firebase/database';
import { auth } from '../../firebase';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import GigDetails from './GigDetails';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen')

const FeaturedGig = () => {
    const user = auth.currentUser;
    const uid = user.uid;
    const [userInstrument, setUserInstruments] = useState([]);
    const [userGenre, setUserGenre] = useState([]);
    const [featuredGigs, setFeaturedGigs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);



    useEffect(() => {
        const userInstrumentRef = ref(db, 'users/musician/' + uid + '/instruments');
        onValue(userInstrumentRef, (snapshot) => {
            const instrumentsData = snapshot.val();
            setUserInstruments(instrumentsData);
        });
    }, [uid]);

    useEffect(() => {
        const userGenreRef = ref(db, 'users/musician/' + uid + '/genre');
        onValue(userGenreRef, (snapshot) => {
            const genreData = snapshot.val();
            setUserGenre(genreData);
        });
    }, [uid]);

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
                    sched: childSnapshot.val().schedule,
                    status: childSnapshot.val().gigStatus
                });
            });


            const filteredGigs = gigDetails.filter((gig) => {
                const excludedStatuses = ['Done', 'Cancel', 'On-going', 'Close'];
                return !excludedStatuses.includes(gig.status);
            });


            filteredGigs.forEach((gig) => {
                if (gig.sched && gig.sched.length > 0) {
                    // Get the last set's date
                    const lastSetDate = new Date(gig.sched[gig.sched.length - 1].date);
                    const currentDate = new Date();
                    const differenceInDays = Math.floor((currentDate - lastSetDate) / (1000 * 60 * 60 * 24));

                    // If 3 or more days have passed since the last set's date, and gigStatus is not already 'Done', update gigStatus to 'Done'
                    if (differenceInDays >= 3 && gig.status !== 'Done') {
                        // Update gigStatus in the database

                        const gigRef = ref(db, 'users/client/' + uid + '/gigs/' + gig.key);
                        const gigsRefs = ref(db, 'gigPosts/' + gig.key);
                        update(gigRef, {
                            gigStatus: 'Done'
                        })
                        update(gigsRefs, {
                            gigStatus: 'Done'
                        })
                    }
                }
            });


            const gigScore = filteredGigs.map((gig) => {
                const instrumentsGig = gig.InstrumentsNeeded?.map((inst) => inst.name) || [];
                const genreGig = gig.GenreNeeded?.length ? gig.GenreNeeded : [];
                // const date = gig.map((sched) => sched.date)
                const gigSched = gig.sched?.map((sched) => sched.date);
                // console.log(gig.status)

                const matchedGenre = genreGig.filter((genre) => userGenre.includes(genre));
                const matchedInstruments = instrumentsGig.filter((instrument) =>
                    userInstrument.includes(instrument)
                );
                const totalGenreAndInstrument = userGenre.length + userInstrument.length
                const calculatePercentage = ((matchedGenre.length + matchedInstruments.length) / totalGenreAndInstrument) * 100;
                // console.log(calculatePercentage)
                return { ...gig, calculatePercentage, GigDate: new Date(gigSched[0]) };
            });

            const gigSortedByDate = gigScore.sort((a, b) => a.GigDate - b.GigDate);
            // console.log(gigSortedByDate);
            const topGigs = gigSortedByDate.slice(0, 5);
            setFeaturedGigs(topGigs);
        });
    }, [userGenre]);

    const renderSeparator = () => {
        return <View style={{ marginHorizontal: 10, height: 0.5 }} />;
    };

    const handleModal = (key) => {
        setSelectedItem(key);
        showModal()
    }

    const props = { postID: selectedItem };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} horizontal={true}>
            {/* Your FlatList or other component to render the featured gigs */}
            <View style={styles.rootContainer}>
                {featuredGigs.map((gig) => (
                    <TouchableOpacity key={gig.postID} style={styles.container} onPress={() => { handleModal(gig.key) }}>
                        <View style={styles.imageContainer}>
                            <ImageBackground source={{ uri: gig.GigImage }} style={styles.imgStyle}>
                            </ImageBackground>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.titleTxt}>{gig.GigName}</Text>
                            <Text style={{ color: 'white' }}>{gig.GigDate.toLocaleDateString()}</Text>
                            {/* Other gig details */}
                        </View>
                    </TouchableOpacity>
                ))}

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
        </ScrollView>
    );
};

export default FeaturedGig;

const styles = StyleSheet.create({
    appBarStyle: {
        backgroundColor: '#151414',
    },
    imgStyle: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    rootContainer: {
        flexDirection: 'row',
    },
    container: {
        width: screenWidth,
        marginRight: 15,
        height: '100%'
    },
    textContainer: {
        bottom: '35%',
        paddingHorizontal: 10
    },
    titleTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});