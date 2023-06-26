import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { auth } from '../../firebase';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');



const RecommendedGigs = () => {

    const user = auth.currentUser;
    const uid = user.uid;
    const [userInstrument, setUserInstruments] = useState([]);
    const [userGenre, setUserGenre] = useState([])
    const [gigGenre, setGigGenre] = useState([]);
    const [gigInstrument, setGigInstrument] = useState([]);
    const [recommendedGigs, setRecommendedGigs] = useState([]);


    useEffect(() => {
        const userInstrumentRef = ref(db, 'users/musician/' + uid + '/metadata/instruments');
        onValue(userInstrumentRef, (snapshot) => {
            const instrumentsData = snapshot.val();
            // console.log(instrumentsData);
            setUserInstruments(instrumentsData);

        })

    }, [uid])

    useEffect(() => {
        const userGenreRef = ref(db, 'users/musician/' + uid + '/metadata/genre');
        onValue(userGenreRef, (snapshot) => {
            const genreData = snapshot.val();
            // console.log(genreData);
            setUserGenre(genreData);

        })
    }, [uid])






    useEffect(() => {
        const gigRef = ref(db, 'gigPosts');
        onValue(gigRef, (snapshot) => {
            let gigDetails = [];
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
                })
            })




            const gigScore = gigDetails.map((gig) => {
                const instrumentsGig = gig.InstrumentsNeeded;
                const genreGig = gig.GenreNeeded;
                // console.log({ ...instrumentsGig });
                // console.log({ ...genreGig });
                const matchedGenre = instrumentsGig.filter((genre) => userGenre.includes(genre));
                const matchedInstruments = genreGig.filter((instruments) => userInstrument.includes(instruments));
                const calculatePercentage = ((matchedGenre.length + matchedInstruments.length) / 6) + 100;
                setGigGenre(genreGig);
                setGigInstrument(instrumentsGig);
                return { ...gig, calculatePercentage };
            });

            console.log(gigGenre);
            console.log(gigInstrument);

            const gigSorted = gigScore.sort((a, b) => b.calculatePercentage - a.calculatePercentage);

            const topGigs = gigSorted.slice(0, 10);
            setRecommendedGigs(topGigs);
        });
    }, [])


    return (
        <ScrollView style={styles.rootContainer} horizontal={true}>
            <View style={styles.container}>

                {recommendedGigs.map((gig) => (

                    <TouchableOpacity >
                        <ImageBackground source={{ uri: gig.GigImage }} style={styles.imageContainer}>
                        </ImageBackground>

                        <View style={styles.textContainer}>
                            <Text>TextContainer</Text>
                            <Text>Job detail</Text>
                            <Text>Job detail</Text>
                        </View>
                    </TouchableOpacity>

                ))}

            </View>
        </ScrollView>
    )
}

export default RecommendedGigs

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'row',
        height: '100%',
        borderWidth: 2,
        borderColor: 'green',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: screenWidth,
        padding: 10,
        backgroundColor: '#3C3C43',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'red',
    },
    imageContainer: {
        height: '60%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'red',
    },
    textContainer: {
        backgroundColor: '#3C3C43',
        width: '100%',
        height: '40%',
    }
})