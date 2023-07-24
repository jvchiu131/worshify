import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { onValue, ref } from 'firebase/database'

const UpcomingGigs = () => {
    const [gigPosts, setGigPosts] = useState([]);

    useEffect(() => {
        const gigPostRef = ref(db, 'gigPosts');
        onValue(gigPostRef, (snapshot) => {
            const gigPostsData = snapshot.val();
            if (gigPostsData) {
                // Convert the gig posts object to an array of gig posts
                const gigPostsArray = Object.values(gigPostsData);
                setGigPosts(gigPostsArray);
            } else {
                setGigPosts([]);
            }
        });
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {gigPosts.map((gigPost) => (
                <TouchableOpacity key={gigPost.postID} style={styles.gigContainer}>
                    {/* Display the gig post data */}

                    <View style={styles.imgContainer}>
                        <ImageBackground source={{ uri: gigPost.Gig_Image }} style={{ height: '100%', width: '100%' }}></ImageBackground>
                    </View>
                    <View style={styles.txtContainer}>
                        <Text style={styles.gigNameStyle}>{gigPost.Gig_Name}</Text>
                    </View>


                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default UpcomingGigs;

const styles = StyleSheet.create({
    txtContainer: {
        width: '80%'
    },
    imgContainer: {
        height: '100%',
        width: '20%',
        marginRight: 15

    },
    gigContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        height: '10%'
    },
    gigNameStyle: {
        color: 'white'
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 1350
    },
});