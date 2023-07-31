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
                        <Text style={styles.gigNameStyle}>{gigPost.Gig_Date}</Text>
                        <Text style={styles.gigNameStyle}>{gigPost.Gig_Start}</Text>
                        <Text style={styles.gigNameStyle}>{gigPost.Gig_End}</Text>
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
    appBarStyle: {
        backgroundColor: '#151414',
        justifyContent: 'space-between'
    },
    txtContainer: {
        width: '80%',
        height: '100%'
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
        height: '5%',
        borderRadius: 10
    },
    gigNameStyle: {
        color: 'white'
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 1350
    },
});