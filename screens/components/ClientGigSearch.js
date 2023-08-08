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
    const user = auth.currentUser;
    const uid = user.uid;
    const navigation = useNavigation()

    const showAddGig = () => setShowModal(true);
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
    useEffect(() => {
        console.log(modalVisible)
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
                    GigAddress: childSnapshot.val().Gig_Address,
                    postID: childSnapshot.val().postID,
                    GigName: childSnapshot.val().Gig_Name,
                    uid: childSnapshot.val().uid,
                    GenreNeeded: childSnapshot.Genre_Needed,
                    StartTime: childSnapshot.val().Gig_Start,
                    EndTime: childSnapshot.val().Gig_End,
                    InstrumentsNeeded: childSnapshot.val().Instruments_Needed,
                    GigImage: childSnapshot.val().Gig_Image,
                    GigDate: childSnapshot.val().Gig_Date
                })
            })
            setGigData(gigDetails)
        });

    }, [])



    const renderItem = ({ item }) => {

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
                            <EvilIcons name="location" size={15} color="#0EB080" />
                            <Text style={styles.txtStyle}>{item.GigAddress}</Text>
                        </View>

                        <View style={styles.dateContainer}>
                            <View style={styles.dateTimeContainer}>
                                <MaterialIcons name="date-range" size={15} color="#0EB080" style={{ marginRight: 5 }} />
                                <Text style={styles.txtStyle}>{item.GigDate}</Text>
                            </View>
                            <View style={styles.dateTimeContainer}>
                                <FontAwesome5 name="clock" size={15} color="#0EB080" style={{ marginRight: 5 }} />
                                <Text style={styles.txtStyle}>{item.StartTime} - {item.EndTime}</Text>
                            </View>
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
                    <AddGigModal />
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

                        <TouchableOpacity onPress={handleEditBtn}>
                            <FontAwesome5 name="edit" size={24} color="white" style={{ padding: 15 }} />
                        </TouchableOpacity>
                    </Appbar.Header>

                    <ClientGigDetails {...props} handleBtnClose={handleClose} />
                </Modal>
            </View >

            <TouchableOpacity onPress={() => showAddGig()} style={styles.btnContainer}>
                <Ionicons name="add-circle-sharp" size={70} color="#0EB080" />
            </TouchableOpacity>




        </View >
    )
}

export default ClientGigSearch

const styles = StyleSheet.create({
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
        fontSize: 11
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