import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { onValue, ref, child, get } from 'firebase/database'
import { AirbnbRating, Rating } from 'react-native-ratings';


const FeaturedMusician = () => {
    const [featuredMusicians, setFeaturedMusicians] = useState([]);

    useEffect(() => {
        const ratingRef = ref(db, 'users/musicianRatings/');
        onValue(ratingRef, (snapshot) => {
            const musicians = [];
            snapshot.forEach((childSnapshot) => {
                let totalRatings = 0;
                let averageRating = 0;
                let numRatings = 0; // Track the number of ratings

                childSnapshot.forEach((rating) => {
                    const ratingValue = rating.val().rating;
                    totalRatings += ratingValue;
                    numRatings += 1; // Increment the number of ratings for each child
                });

                averageRating = totalRatings / numRatings; // Calculate the average rating
                musicians.push({ userId: childSnapshot.key, averageRating });
            });

            // Sort the musicians based on average rating in descending order
            musicians.sort((a, b) => b.averageRating - a.averageRating);

            // Get the top 5 musicians with the highest ratings
            const top5Musicians = musicians.slice(0, 5);
            setFeaturedMusicians(top5Musicians);

            // Fetch additional data for each musician
            fetchMusiciansData(top5Musicians);
        });
    }, []);

    const fetchMusiciansData = async (musiciansData) => {
        const updatedMusiciansData = await Promise.all(
            musiciansData.map(async (musician) => {
                const musicianRef = ref(db, 'users/musician/' + musician.userId);
                const snapshot = await get(musicianRef); // Use get to fetch data only once
                const musicianData = snapshot.val();
                return {
                    userId: musician.userId,
                    averageRating: musician.averageRating,
                    firstName: musicianData.first_name,
                    profilePic: musicianData.profile_pic,
                    lastName: musicianData.lname
                };
            })
        );

        setFeaturedMusicians(updatedMusiciansData);
        console.log(featuredMusicians)
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} horizontal={true}>
            {featuredMusicians.map((musician) => (
                <TouchableOpacity key={musician.userId} style={styles.musicianContainer}>
                    <View>
                        <View style={styles.imgContainer}>
                            <ImageBackground source={{ uri: musician.profilePic }} style={{ height: '100%', width: '100%' }}>

                            </ImageBackground>
                        </View>


                        <View style={styles.txtContainer}>
                            <AirbnbRating
                                reviews={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
                                count={5}
                                defaultRating={Math.round(musician.averageRating)}
                                size={15}
                                isDisabled={true}
                                showRating={false}
                            />
                            <Text style={styles.titleTxt}>{musician.firstName} {musician.lastName}</Text>
                        </View>




                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default FeaturedMusician;

const styles = StyleSheet.create({
    titleTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    txtContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        height: '70%',
        width: '60%',
        borderRadius: 100,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    musicianContainer: {

        height: '90%',
        marginRight: 20,
        width: '30%',
        backgroundColor: '#1B1A1C',
        borderRadius: 15
    },
    scrollContainer: {
        flexGrow: 1,
        paddingRight: 550
    },
});