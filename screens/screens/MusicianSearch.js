import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, ImageBackground, Modal, } from 'react-native'
import React from 'react'
import { db } from '../../firebase'
import { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { Appbar } from 'react-native-paper';
import Header from '../components/Header'
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import FindMusicians from '../components/FindMusicians'
import { MaterialIcons } from '@expo/vector-icons';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const MusicianSearch = () => {

    const [musician, setMusician] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigation = useNavigation();

    const [gigModalVisible, setGigModalVisible] = useState(false)
    const showGigModal = () => setGigModalVisible(true);
    const hideGigModal = () => setGigModalVisible(false);
    const [matchedMusicians, setMatchedMusicians] = useState([]);
    const [musicians, setMusicians] = useState([]);
    const [musicianGenre, setMusicianGenre] = useState([])
    const [musicianInstruments, setMusicianInstrument] = useState([])
    const [musicianGender, setMusicianGender] = useState();
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedInstruments, setSelectedInstruments] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false);

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



    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);


    const handleItemPress = (key) => {

        setSelectedItem(key);
        // showModal();
        navigation.navigate('MusicianProfile', { userId: key });
    };


    //reference to musician 
    useEffect(() => {
        const musicianRef = ref(db, 'users/musician/')
        onValue(musicianRef, (snapshot) => {
            let musicianData = [];
            snapshot.forEach((child) => {
                musicianData.push({
                    key: child.key,
                    firstName: child.val().first_name,
                    lastName: child.val().lname,
                    address: child.val().address,
                    profilePic: child.val().profile_pic,
                    uid: child.val().uid,
                    instruments: child.val().instruments
                })
            })

            setMusician(musicianData);
        })
    }, [])

    //this is for find gig
    useEffect(() => {
        const musicianRef = ref(db, 'users/musician/')
        let musicianDetails = [];
        onValue(musicianRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                musicianDetails.push({
                    key: childSnapshot.key,
                    firstName: childSnapshot.val().first_name,
                    lastName: childSnapshot.val().lname,
                    address: childSnapshot.val().address,
                    profilePic: childSnapshot.val().profile_pic,
                    uid: childSnapshot.val().uid,
                    instruments: childSnapshot.val().instruments,
                    genre: childSnapshot.val().genre,
                    gender: childSnapshot.val().gender
                })
            });

            const musicianScore = musicianDetails.map((musician) => {
                const instrumentsMusician = musician.instruments;
                const genreMusician = musician.genre;
                const genderMusician = musician.gender;


                setMusicianGenre(genreMusician);
                setMusicianInstrument(instrumentsMusician);
                setMusicianGender(genderMusician);

                // Check for gender match
                const genderMatch = selectedGender === genderMusician ? 1 : 0;

                const totalItem = genderMatch + selectedInstruments.length + selectedGenres.length;

                const matchedGenre = genreMusician.filter((genre) => selectedGenres.includes(genre));
                const matchedInstruments = instrumentsMusician.filter((instrument) => selectedInstruments.includes(instrument));

                const calculatePercentage = ((matchedGenre.length + matchedInstruments.length + genderMatch) / totalItem) * 100;

                return { ...musician, calculatePercentage };

            });
            // Remove musicians with NaN or 0 percentage
            const validMusicians = musicianScore.filter((musician) => !isNaN(musician.calculatePercentage) && musician.calculatePercentage > 0);

            // Sort the musicians in descending order of percentage
            const musicianSorted = validMusicians.sort((a, b) => b.calculatePercentage - a.calculatePercentage);

            // Take the top 5 musicians
            const topMusicians = musicianSorted.slice(0, 5);

            setMatchedMusicians(topMusicians);
        });

    }, [selectedGenres, selectedGender, selectedInstruments])


    const props = {
        userId: selectedItem
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleItemPress(item.uid)}>
                <View style={styles.renderContainer}>
                    <View style={styles.imgContainer}>
                        <ImageBackground source={{ uri: item.profilePic }} style={styles.imgStyle}></ImageBackground>
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameStyle}>{item.firstName} {item.lastName}</Text>
                        </View>

                        <View style={styles.addressContainer}>
                            <EvilIcons name="location" size={15} color="#0EB080" />
                            <Text style={styles.addressText}>
                                {item.address}
                            </Text>
                        </View>

                        <View style={styles.instrumentsContainer}>
                            <Text style={styles.instrumentStyle}>{item.instruments[0]}</Text>
                            <Text style={styles.instrumentStyle}>{item.instruments[1]}</Text>
                            <Text style={styles.instrumentStyle}>{item.instruments[2]}</Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderMusician = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleItemPress(item.uid)}>
                <View style={styles.renderContainer}>
                    <View style={styles.imgContainer}>
                        <ImageBackground source={{ uri: item.profilePic }} style={styles.imgStyle}></ImageBackground>
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameStyle}>{item.firstName} {item.lastName} <Text style={{ color: "#0EB080" }}>{Math.round(item.calculatePercentage)}%</Text></Text>
                        </View>

                        <View style={styles.addressContainer}>
                            <EvilIcons name="location" size={15} color="#0EB080" />
                            <Text style={styles.addressText}>
                                {item.address}
                            </Text>
                        </View>

                        <View style={styles.instrumentsContainer}>
                            <Text style={styles.instrumentStyle}>{item.instruments[0]}</Text>
                            <Text style={styles.instrumentStyle}>{item.instruments[1]}</Text>
                            <Text style={styles.instrumentStyle}>{item.instruments[2]}</Text>
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


    return (
        <View style={styles.root}>
            <Header />

            <View style={styles.flatlistContainer}>
                {isFilterApplied ? (
                    // Render matched gigs
                    <View>
                        <FlatList
                            data={matchedMusicians}
                            renderItem={renderMusician}
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
                        data={musician}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.key}
                        ItemSeparatorComponent={renderSeparator}
                    />
                )}
                <TouchableOpacity style={styles.btnContainer} onPress={showGigModal}>
                    <Ionicons name="search-circle-sharp" size={70} color="#0EB080" />
                </TouchableOpacity>
            </View>

            <Modal
                visible={gigModalVisible}
                animationType='slide'
                onRequestClose={hideGigModal}
            >
                <Appbar.Header style={styles.appBarStyle}>
                    <Appbar.BackAction onPress={hideGigModal} color='white' />
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Find Musician</Text>
                </Appbar.Header>

                <FindMusicians
                    selectedGender={selectedGender}
                    setSelectedGender={setSelectedGender}
                    selectedInstruments={selectedInstruments}
                    setSelectedInstruments={setSelectedInstruments}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    closeModal={closeGigModal} />
            </Modal>


        </View>
    )
}

export default MusicianSearch

const styles = StyleSheet.create({
    appBarStyle: {
        backgroundColor: '#151414'
    },
    btnContainer: {
        padding: 5,
        bottom: screenHeight / 3.5,
        width: '25%',
        left: 250,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appBarHeader: {
        backgroundColor: '#151414',
        justifyContent: 'space-between',
    },
    addressText: {
        color: 'white',
        fontSize: 10
    },
    instrumentStyle: {
        borderWidth: 1,
        borderColor: '#0EB080',
        marginHorizontal: 5,
        fontSize: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        color: 'white',
    },
    instrumentsContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer: {
        marginBottom: 5
    },
    imgStyle: {
        width: '100%',
        height: 70,
    },
    imgContainer: {
        height: '95%',
        width: '25%',
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#0EB080',

    },
    textContainer: {
        marginLeft: 15,
        width: '73%'
    },
    nameStyle: {
        color: 'white',
        fontWeight: 'bold'
    },
    flatlistContainer: {
        height: '100%',
        width: '100%',
        bottom: screenHeight / 5,
        padding: 20,

    },
    renderContainer: {

        backgroundColor: '#1E1E1E',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20

    },
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        width: screenWidth,
    },


})