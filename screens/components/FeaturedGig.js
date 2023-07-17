import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { auth } from '../../firebase';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen')

const FeaturedGig = () => {
    const user = auth.currentUser;
    const uid = user.uid;
    const [userInstrument, setUserInstruments] = useState([]);
    const [userGenre, setUserGenre] = useState([]);
    const [featuredGigs, setFeaturedGigs] = useState([]);


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
        onValue(gigRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                gigDetails.push({
                    key: childSnapshot.key,
                    Event_Type: childSnapshot.val().Event_Type,
                    GigAddress: childSnapshot.val().Gig_Address,
                    postID: childSnapshot.val().postID,
                    GigName: childSnapshot.val().Gig_Name,
                    uid: childSnapshot.val().uid,
                    GenreNeeded: childSnapshot.val().Genre_Needed,
                    StartTime: childSnapshot.val().Gig_Start,
                    EndTime: childSnapshot.val().Gig_End,
                    InstrumentsNeeded: childSnapshot.val().Instruments_Needed,
                    GigImage: childSnapshot.val().Gig_Image,
                    GigDate: childSnapshot.val().Gig_Date,
                });
            });

            const gigScore = gigDetails.map((gig) => {
                const instrumentsGig = gig.InstrumentsNeeded;
                const genreGig = gig.GenreNeeded;

                const matchedGenre = genreGig.filter((genre) => userGenre.includes(genre));
                const matchedInstruments = instrumentsGig.filter((instrument) =>
                    userInstrument.includes(instrument)
                );
                const calculatePercentage = ((matchedGenre.length + matchedInstruments.length) / 6) * 100;

                return { ...gig, calculatePercentage, GigDate: new Date(gig.GigDate) };
            });

            const gigSortedByDate = gigScore.sort((a, b) => a.GigDate - b.GigDate);
            const topGigs = gigSortedByDate.slice(0, 5);
            setFeaturedGigs(topGigs);
        });
    }, [userGenre]);

    const renderSeparator = () => {
        return <View style={{ marginHorizontal: 10, height: 0.5 }} />;
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} horizontal={true}>
            {/* Your FlatList or other component to render the featured gigs */}
            <View style={styles.rootContainer}>
                {featuredGigs.map((gig) => (
                    <TouchableOpacity key={gig.key} style={styles.container}>
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
            </View>
        </ScrollView>
    );
};

export default FeaturedGig;

const styles = StyleSheet.create({
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
