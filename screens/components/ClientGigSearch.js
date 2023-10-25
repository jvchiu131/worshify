import Toast from 'react-native-toast-message';
import {
    StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated,
    TouchableWithoutFeedback, FlatList, ImageBackground, RefreshControl,
    Modal
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Ionicons } from '@expo/vector-icons';
import AddGigModal from './AddGigModal';
import { db } from '../../firebase';
import { ref as db_ref, onValue } from 'firebase/database';
import { auth } from '../../firebase';
import { EvilIcons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ClientGigDetails from './ClientGigDetails';
import { useNavigation } from '@react-navigation/native';

//Screen dimensions
const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');



const ClientGigSearch = () => {


    const animValue = useState(new Animated.Value(-600))[0];
    const [showModal, setShowModal] = useState(false);
    const [gigData, setGigData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [banPoints, setBanPoints] = useState(null);
    const [banned, setBanned] = useState(false);
    const user = auth.currentUser;
    const uid = user.uid;
    const navigation = useNavigation()


    useEffect(() => {
        const dbRef = db_ref(db, 'users/client/' + uid);
        onValue(dbRef, (snapshot) => {
            setBanPoints(snapshot.val().banningPoints || null);
        });
    }, [])

    // const showAddGig = () => {
    //     setShowModal(true)
    // };
    const showAddGig = () => {
        // const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
        // const currentDate = new Date();

        // Check if the user has 3 or more ban points and is within the ban duration (1 week)
        if (banPoints >= 3) {
            Toast.show({
                type: 'error',
                text1: 'Account is banned. Please contact support.'
            });
        } else {
            setShowModal(true);
        }
    };

    const toastHandle = () => {
        Toast.show({
            type: 'success',
            text1: 'Your gig has been successfully created!'
        })
    }

    const handleGigOverview = (data) => {
        setShowModal(data);

    };

    const hideAddGig = () => setShowModal(false);


    const showGigModal = () => setModalVisible(true);
    const hideGigModal = () => {
        setModalVisible(false)
        setSelectedItem(null)
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000)
    }, [])


    const handleItemPress = (key) => {
        setSelectedItem(key);
        showGigModal();

    };

    const props = { postID: selectedItem };

    useEffect(() => {

        const dbRef = db_ref(db, 'users/client/' + uid + '/gigs');

        onValue(dbRef, (snapshot) => {
            let gigDetails = [];
            snapshot.forEach((childSnapshot) => {
                gigDetails.push({
                    key: childSnapshot.key,
                    Event_Type: childSnapshot.val().Event_Type,
                    postID: childSnapshot.val().postID,
                    GigName: childSnapshot.val().Gig_Name,
                    uid: childSnapshot.val().uid,
                    GenreNeeded: childSnapshot.Genre_Needed,
                    InstrumentsNeeded: childSnapshot.val().Instruments_Needed,
                    GigImage: childSnapshot.val().Gig_Image,
                    GigStatus: childSnapshot.val().gigStatus
                })
            })
            setGigData(gigDetails)
        });

    }, [])


    const renderItem = ({ item }) => {

        let gigStatusStyle = styles.gigStatusGray; // Default gray color

        if (item.GigStatus === 'Available') {
            gigStatusStyle = styles.gigStatusGreen;
        } else if (item.GigStatus === 'Cancel') {
            gigStatusStyle = styles.gigStatusRed;
        } else if (item.GigStatus === 'On-going') {
            gigStatusStyle = styles.gigStatusYellow;
        } else if (item.GigStatus === 'Done') {
            gigStatusStyle = styles.gigStatusGreen;
        }

        return (
            <TouchableOpacity style={styles.renderStyle} onPress={() => handleItemPress(item.postID)}>
                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <ImageBackground source={{ uri: item.GigImage }} style={styles.imgStyle}>
                        </ImageBackground>
                    </View>
                    <View style={styles.txtContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleStyle}>{item.GigName}</Text>
                        </View>
                        <View style={styles.addressContainer}>

                            <Text style={[styles.txtStyle, gigStatusStyle]}>{item.GigStatus}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }


    const renderSeparator = () => {
        return (
            <View style={{
                marginTop: 20,
                height: 0.5
            }} />
        )
    }

    const isWithinOneWeek = (gigDate) => {
        const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
        const today = new Date();
        const gigDateMillis = new Date(gigDate).getTime();
        return gigDateMillis - today.getTime() <= oneWeekInMillis;
    };


    const handleEditBtn = () => {
        if (selectedItem && isWithinOneWeek(gigData.GigDate)) {
            Alert.alert(
                'Editing Gig within 1 Week',
                'You are editing a gig that is within 1 week from the current date. Are you sure you want to proceed?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Proceed',
                        onPress: () => navigation.navigate('EditGig', { ...props })
                    }
                ]
            );
        } else {
            hideGigModal();
            navigation.navigate('EditGig', { ...props });
        }
    };


    const handleClose = (data) => {
        setModalVisible(data);
    }


    return (
        <View style={styles.root}>

            <View style={styles.header}>
                <Text style={styles.availGigs}>My Gigs</Text>
            </View>

            <FlatList
                data={gigData}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                ItemSeparatorComponent={renderSeparator}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor='white' />
                } />

            <View style={{ zIndex: 20 }}>

                <Modal
                    visible={showModal}
                    animationType='slide'
                    onRequestClose={hideAddGig}
                    onDismiss={() => setShowModal(false)}>
                    <Appbar.Header style={styles.appBarStyle}>
                        <Appbar.BackAction onPress={hideAddGig} color='white' />
                    </Appbar.Header>
                    <AddGigModal handleModal={handleGigOverview} />
                </Modal>

                <Modal
                    visible={modalVisible}
                    animationType='slide'
                    onRequestClose={hideGigModal}
                    onDismiss={() => {
                        setSelectedItem(null)
                        setModalVisible(false)
                    }}
                >
                    <Appbar.Header style={styles.appBarStyle}>
                        <Appbar.BackAction onPress={hideGigModal} color='white' />

                        <TouchableOpacity onPress={() => handleEditBtn()}>
                            <FontAwesome5 name="edit" size={24} color="white" style={{ padding: 15 }} />
                        </TouchableOpacity>
                    </Appbar.Header>

                    <ClientGigDetails {...props} handleBtnClose={handleClose} />
                </Modal>
            </View >

            <TouchableOpacity onPress={() => showAddGig()} style={styles.btnContainer}>
                <Ionicons name="add-circle-sharp" size={70} color="#0EB080" />
            </TouchableOpacity>



            <Toast
                type='success'
                visibilityTime={6000}
            />

        </View >
    )
}

export default ClientGigSearch

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
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        width: screenWidth,
        bottom: screenHeight / 4.4,
        padding: 15,

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#222222',
        borderRadius: 20,
        padding: 10
    },
    btnContainer: {
        padding: 5,
        alignItems: 'flex-end',
        bottom: screenHeight / 3.5,
        width: '20%',
        left: 280,
        zIndex: 1
    },
    containerField: {
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight,
        position: 'absolute',
        backgroundColor: '#F9F9F9',
    },

    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',

    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        margin: 15
    },
    availGigs: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold'
    },
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5
    },
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
        width: '107%'
    },
    titleContainer: {
        margin: 2
    },
    txtContainer: {
        width: '60%',
    },
    imgContainer: {
        height: '100%',
        width: '30%',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#0EB080'
    },
    imgStyle: {
        width: '100%',
        height: 70,
    }

})