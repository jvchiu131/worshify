import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, ImageBackground, Modal, } from 'react-native'
import React from 'react'
import { db } from '../../firebase'
import { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { EvilIcons } from '@expo/vector-icons';
import GigDetails from './GigDetails'
import { Ionicons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import FindGig from './FindGig'


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const MusicianGigSearch = () => {

    const [gigData, setGigData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const [gigModalVisible, setGigModalVisible] = useState(false)
    const showGigModal = () => setGigModalVisible(true);
    const hideGigModal = () => setGigModalVisible(false);

    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedInstruments, setSelectedInstruments] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [matchedGigs, setMatchedGigs] = useState([]);
    const [gigGender, setGigGender] = useState();
    const [gigGenre, setGigGenre] = useState([])
    const [gigInstrument, setGigInstrument] = useState([])
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [childData, setChildData] = useState();

    const handleItemPress = (key) => {
        setSelectedItem(key);
        showModal();
    };

    const closeGigModal = () => {
        setGigModalVisible(false);
        setIsFilterApplied(true);
    };

    // Function to handle selected gender
    const handleGenderSelection = (gender) => {
        setSelectedGender(gender);
    };

    // Function to handle selected instruments
    const handleInstrumentSelection = (instruments) => {
        setSelectedInstruments(instruments);
    };

    // Function to handle selected genres
    const handleGenreSelection = (genres) => {
        setSelectedGenres(genres);
    };





    const props = { postID: selectedItem };



    useEffect(() => {

        const dbRef = ref(db, 'gigPosts');

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
                    GigStatus: childSnapshot.val().gigStatus,
                    gigSched: childSnapshot.val().schedule

                })
            })
            // setGigData(gigDetails)
        });

        const filteredGigs = gigData.filter((gig) => {
            const excludedStatuses = ['Done', 'Cancel', 'On-going', 'Close'];
            return !excludedStatuses.includes(gig.GigStatus);
        });


        filteredGigs.forEach((gig) => {
            if (gig.gigSched && gig.gigSched.length > 0) {
                // Get the last set's date
                const lastSetDate = new Date(gig.gigSched[gig.gigSched.length - 1].date);
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

        setGigData(filteredGigs)

    }, [])

    useEffect(() => {
        const gigRef = ref(db, 'gigPosts');
        let gigDetails = [];
        onValue(gigRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                setGigInstrument(childSnapshot.val().Instruments_Needed)
            })
        })
    }, [])


    //this is for find gig
    useEffect(() => {
        const gigRef = ref(db, 'gigPosts');
        let gigDetails = [];
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
                    gigGender: childSnapshot.val().gender,
                    GigStatus: childSnapshot.val().gigStatus,
                    gigSched: childSnapshot.val().sched
                });
            });

            const filteredGigs = gigDetails.filter((gig) => {
                const excludedStatuses = ['Done', 'Cancel', 'On-going', 'Close'];
                return !excludedStatuses.includes(gig.GigStatus);
            });


            filteredGigs.forEach((gig) => {
                if (gig.gigSched && gig.gigSched.length > 0) {
                    // Get the last set's date
                    const lastSetDate = new Date(gig.gigSched[gig.gigSched.length - 1].date);
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
                const instrumentsGig = gig.InstrumentsNeeded;
                const genreGig = gig.GenreNeeded;
                const genderGig = gig.gigGender;

                // console.log(genderGig)
                // console.log(selectedGender);

                setGigGenre(genreGig);
                setGigInstrument(instrumentsGig);
                setGigGender(genderGig);

                // Check for gender match
                const genderMatch = selectedGender === genderGig ? 1 : 0;

                const totalItem = genderMatch + selectedInstruments.length + selectedGenres.length;
                const matchedGenre = genreGig.filter((genre) => selectedGenres.includes(genre));
                const matchedInstruments = gigInstrument.filter((instrument) => selectedInstruments.includes(instrument));
                const calculatePercentage = ((matchedGenre.length + matchedInstruments.length + genderMatch) / totalItem) * 100;

                console.log(calculatePercentage)

                return { ...gig, calculatePercentage };

            });
            // Remove musicians with NaN or 0 percentage
            const validGigs = gigScore.filter((gig) => !isNaN(gig.calculatePercentage) && gig.calculatePercentage > 0);
            const gigSorted = validGigs.sort((a, b) => b.calculatePercentage - a.calculatePercentage);
            const topGigs = gigSorted.slice(0, 5);
            setMatchedGigs(topGigs)
        });
    }, [selectedGenres, selectedGender, selectedInstruments])

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
                            {isFilterApplied ? (
                                <Text style={{ fontWeight: 'bold', color: "#0EB080" }}>{Math.round(item.calculatePercentage)}%</Text>)
                                : null}

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


    const handleModal = (data) => {
        setModalVisible(data)
    }


    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <Text style={styles.availGigs}>Available Gigs</Text>
            </View>

            <Modal
                visible={modalVisible}
                animationType='slide'
                onRequestClose={hideModal}
            >
                <Appbar.Header style={styles.appBarStyle}>
                    <Appbar.BackAction onPress={hideModal} color='white' />
                </Appbar.Header>

                <GigDetails {...props} handleModal={handleModal} />
            </Modal>



            {isFilterApplied ? (
                // Render matched gigs
                <View>
                    <FlatList
                        data={matchedGigs}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={renderSeparator}
                    />
                    <TouchableOpacity onPress={() => setIsFilterApplied(false)}>
                        <MaterialIcons name="cancel" size={70} color="#0EB080" />
                    </TouchableOpacity>
                </View>
            ) : (
                // Render original gigs
                <FlatList
                    data={gigData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    ItemSeparatorComponent={renderSeparator}
                />
            )}



            <Modal
                visible={gigModalVisible}
                animationType='slide'
                onRequestClose={hideGigModal}
            >
                <Appbar.Header style={styles.appBarStyle}>
                    <Appbar.BackAction onPress={hideGigModal} color='white' />
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Find Gig</Text>
                </Appbar.Header>

                <FindGig
                    selectedGender={selectedGender}
                    setSelectedGender={setSelectedGender}
                    selectedInstruments={selectedInstruments}
                    setSelectedInstruments={setSelectedInstruments}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    closeModal={closeGigModal}
                />
            </Modal>

            <TouchableOpacity style={styles.btnContainer} onPress={showGigModal}>
                <Ionicons name="search-circle-sharp" size={70} color="#0EB080" />
            </TouchableOpacity>

        </View>
    )
}

export default MusicianGigSearch

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
    btnContainer: {
        padding: 5,
        alignItems: 'flex-end',
        bottom: screenHeight / 3.5,
        width: '20%',
        left: 280,
        zIndex: 1
    },
    appBarStyle: {
        backgroundColor: '#151414',
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
        fontWeight: 'bold',
        width: '100%'
    },
    root: {
        height: screenHeight / 1.2,
        width: screenWidth,
        bottom: screenHeight / 5,

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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
    },
    imgStyle: {
        width: '100%',
        height: 70,
    }

})