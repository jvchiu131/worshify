import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { onValue, ref } from 'firebase/database'
import ViewGig from './ViewGig'
import { Appbar } from 'react-native-paper';

const UpcomingGigs = () => {
    const [gigPosts, setGigPosts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handlePress = (key) => {
        setSelectedItem(key)
        showModal()
    }

    const props = { postID: selectedItem };

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
                <TouchableOpacity key={gigPost.postID} style={styles.gigContainer} onPress={() => { handlePress(gigPost.postID) }}>
                    {/* Display the gig post data */}

                    <View style={styles.imgContainer}>
                        <ImageBackground source={{ uri: gigPost.Gig_Image }} style={{ height: '100%', width: '100%' }}></ImageBackground>
                    </View>
                    <View style={styles.txtContainer}>
                        <Text style={styles.gigNameStyle}>{gigPost.Gig_Name}</Text>
                        <View style={[gigPost.gigStatus === 'Available' ? styles.gigStatusGreen :
                            gigPost.gigStatus === 'Cancel' ? styles.gigStatusRed :
                                gigPost.gigStatus === 'On-going' ? styles.gigStatusYellow :
                                    gigPost.gigStatus === 'Done' ? styles.gigStatusGreen :
                                        styles.gigStatusGray]}>
                            <Text style={styles.gigStatusStyle}>
                                {gigPost.gigStatus}
                            </Text>
                        </View>
                    </View>

                </TouchableOpacity>
            ))}

            <Modal
                visible={modalVisible}
                animationType='slide'
                onRequestClose={hideModal}
                onDismiss={() => {
                    setModalVisible(false)
                }}>
                <Appbar.Header style={styles.appBarStyle}>
                    <Appbar.BackAction onPress={() => { hideModal(), setSelectedItem(null) }} color='white' />
                </Appbar.Header>
                <ViewGig {...props} />
            </Modal>
        </ScrollView>
    )
}

export default UpcomingGigs;

const styles = StyleSheet.create({
    gigStatusGreen: {
        backgroundColor: "#0EB080", // Green color
    },
    gigStatusRed: {
        backgroundColor: 'red', // Red color
    },
    gigStatusYellow: {
        backgroundColor: '#FABF35', // Yellow color
    },
    gigStatusGray: {
        backgroundColor: '#808080', // Gray color
    },
    appBarStyle: {
        backgroundColor: '#151414',
        justifyContent: 'space-between'
    },
    txtContainer: {
        width: '75%',
        height: '100%',

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
        height: '10%',
        borderRadius: 10
    },
    gigNameStyle: {
        color: 'white',
        width: '95%',
        marginBottom: '5%'
    },
    gigStatusStyle: {
        color: 'white',
        fontWeight: 'bold',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 1350
    },
});