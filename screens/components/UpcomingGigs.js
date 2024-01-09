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

    const filteredGigs = gigPosts.filter((gig) => {
        const excludedStatuses = ['Done', 'Cancel', 'On-going', 'Close'];
        return !excludedStatuses.includes(gig.gigStatus);
    });

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {filteredGigs.map((gigPost) => (
                <TouchableOpacity key={gigPost.postID} style={styles.gigContainer} onPress={() => { handlePress(gigPost.postID) }}>
                    {/* Display the gig post data */}

                    <View style={styles.imgContainer}>
                        <ImageBackground source={{ uri: gigPost.Gig_Image }} style={{ height: '100%', width: '100%' }}></ImageBackground>
                    </View>
                    <View style={styles.txtContainer}>
                        <Text style={styles.gigNameStyle}>{gigPost.Gig_Name}</Text>
                        <View style={[gigPost.gigStatus === 'Available' ? [styles.gigStatusGreen, styles.addressContainer] :
                            gigPost.gigStatus === 'Cancel' ? [styles.gigStatusRed, styles.addressContainer] :
                                gigPost.gigStatus === 'On-going' ? [styles.gigStatusYellow, styles.addressContainer] :
                                    gigPost.gigStatus === 'Done' ? [styles.gigStatusGreen, styles.addressContainer] :
                                        [styles.gigStatusGray, styles.addressContainer]]}>
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
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '35%',
        borderRadius: 10,
        paddingVertical: 2
    },
    gigContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        height: '9%',
        borderRadius: 10,
        // alignItems: 'center'
    },
    gigNameStyle: {
        color: 'white',
        width: '95%',
        marginBottom: '2%',
        fontWeight: 'bold'
    },
    gigStatusStyle: {
        color: 'white',
        fontWeight: 'bold',
        padding: 2
    },
    // container: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-evenly',
    // },
    // renderStyle: {
    //     marginHorizontal: 2,
    // },
    // titleStyle: {
    //     color: 'white',
    //     fontSize: 13,
    //     fontWeight: 'bold',
    //     width: '107%'
    // },
    // titleContainer: {
    //     margin: 2
    // },
    // txtContainer: {
    //     width: '60%',
    // },
    // imgContainer: {
    //     height: '70%',
    //     width: '30%',
    //     borderRadius: 10,
    //     overflow: 'hidden',
    // },
    // imgStyle: {
    //     width: '100%',
    //     height: 70,
    // },
    txtStyle: {
        color: 'white',
        fontSize: 11,
        padding: 5,
        borderRadius: 10,
        overflow: 'hidden',
        fontWeight: 'bold'
    },
    renderStyle: {
        marginHorizontal: 2,
    },
    titleStyle: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        width: '107%',
        borderWidth: 2,
        borderColor: 'red'
    },
    titleContainer: {
        margin: 2
    },
    txtContainer: {
        width: '60%',
        marginLeft: 10
    },
    imgContainer: {
        height: '90%',
        width: '30%',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#0EB080',
        alignSelf: 'center'
    },
    imgStyle: {
        width: '100%',
        height: 70,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 1350
    },
});