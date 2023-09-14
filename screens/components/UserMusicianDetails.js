import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Modal, FlatList, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue, child, exists, hasChildren, once } from 'firebase/database';
import { EvilIcons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import AddPortfolio from './AddPortfolio';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { signOut } from "firebase/auth";


const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const UserMusicianDetails = () => {

    const user = auth.currentUser;
    const uid = user.uid;
    const [instruments, setInstruments] = useState([]);
    const [genre, setGenre] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [childrenExist, setChildrenExist] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [review, setReview] = useState([]);
    const [counter, setCounter] = useState(0);
    const [revUsers, setRevUsers] = useState([]);




    // const handleSignOut = () => {
    //     signOut(auth).then(() => {
    //         // Sign-out successful.

    //       }).catch((error) => {
    //         // An error happened.
    //       });
    // }

    useEffect(() => {
        const interval = setInterval(() => {
            // Update the count every second
            setCounter(prevCount => prevCount + 1);
        }, 500);

        console.log(counter)
        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, []);

    //handles extraction of review and ratings of the user to the musician
    useEffect(() => {
        const reviewRef = ref(db, 'users/musicianRatings/' + uid);

        onValue(reviewRef, (snapshot) => {
            let musicianRev = [];
            snapshot.forEach((child) => {
                const reviewMusician = child.val().review;
                const ratingMusician = child.val().rating;
                const userId = child.key;
                const userFirst = child.val().userName;
                const userLast = child.val().userLname;
                const userPic = child.val().userPic;
                musicianRev.push({
                    userId,
                    review: reviewMusician,
                    rating: ratingMusician,
                    userFirst,
                    userLast,
                    userPic
                });
                setReview(musicianRev);

            })

        })
    }, [counter])


    useEffect(() => {
        const pathRef = child(ref(db), 'users/logged_users/' + uid + '/instruments')
        onValue(pathRef, (snapshot) => {
            let data = [];
            snapshot.forEach((child) => {
                data.push(child.val());
            })

            setInstruments(data);
        })


    }, [])

    useEffect(() => {
        const pathRef = child(ref(db), 'users/logged_users/' + uid + '/genre')
        onValue(pathRef, (snapshot) => {
            let data = [];
            snapshot.forEach((child) => {
                data.push(child.val());
            })

            setGenre(data);
        })


    }, [])


    useEffect(() => {
        const portRef = child(ref(db), 'users/logged_users/' + uid + '/portfolioPic')

        onValue(portRef, (snapshot) => {
            let data = []
            if (snapshot.exists() && snapshot.hasChildren()) {
                setChildrenExist(true);
            }
            snapshot.forEach((child) => {
                data.push(child.val())
            })
            setPortfolio(data);
        })

    }, [])


    const renderItem = ({ item }) => {
        return (
            <View style={styles.portfolioViewContainer}>
                <ImageBackground source={{ uri: item }} style={styles.portfolioImgStyle} >
                </ImageBackground>
            </View>
        )
    }

    const renderSeparator = () => {
        return (
            <View style={{
                marginHorizontal: 10,
                height: 0.5
            }} />

        )
    }




    return (

        <View style={styles.root}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.genreContainer}>
                    <View style={styles.titleContainer}>
                        <Text>Genre</Text>
                    </View>
                    <View style={styles.listContainer}>
                        <Text style={styles.txtStyle}>{genre[0]}</Text>
                        <Text style={styles.txtStyle}>{genre[1]}</Text>
                        <Text style={styles.txtStyle}>{genre[2]}</Text>
                    </View>
                </View>

                <View style={styles.instrumentsContainer}>
                    <View style={styles.titleContainer}>
                        <Text>Instruments</Text>
                    </View>
                    <View style={styles.listContainer}>
                        <Text style={styles.txtStyle}>{instruments[0]}</Text>
                        <Text style={styles.txtStyle}>{instruments[1]}</Text>
                        <Text style={styles.txtStyle}>{instruments[2]}</Text>
                    </View>

                </View>

                <View style={styles.portfolioContainer}>
                    <View style={styles.titleContainer}>
                        <Text>Portfolio</Text>
                    </View>

                    <View style={styles.portfolioStyle}>
                        {childrenExist ? (
                            <View>
                                <FlatList
                                    data={portfolio}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.key}
                                    ItemSeparatorComponent={renderSeparator}
                                    horizontal
                                />
                            </View>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.portfolioSaveStyle} onPress={showModal}>
                                    <EvilIcons name="image" size={24} color="black" />
                                    <Text> Add Images</Text>
                                </TouchableOpacity>
                                <Modal
                                    visible={modalVisible}
                                    animationType='slide'
                                    onRequestClose={hideModal}
                                >
                                    <Appbar.Header>
                                        <Appbar.BackAction onPress={hideModal} style={styles.appBarStyle} />
                                    </Appbar.Header>
                                    <AddPortfolio />

                                </Modal>
                            </>

                        )}
                    </View>

                    <View>
                        <View style={{ ...styles.titleContainer, marginTop: 20 }}>
                            <Text>Reviews</Text>
                        </View>
                        {/* style the review and feedback of the user to client and musician */}
                        <ScrollView style={styles.rootContainer} horizontal={true} contentContainerStyle={styles.scrollViewContents}>
                            {review.map((rev) => {
                                return (
                                    <View key={rev.userId} style={styles.revRootContainer}>
                                        <View style={styles.reviewContainer}>
                                            <View style={styles.imgContainer}>
                                                <ImageBackground source={{ uri: rev.userPic }} style={{ height: '100%', width: '100%' }}>
                                                </ImageBackground>
                                            </View>
                                            <View style={styles.txtContainer}>
                                                <Text>
                                                    {rev.userFirst} {rev.userLast}
                                                </Text>

                                                <AirbnbRating
                                                    reviews={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
                                                    count={5}
                                                    defaultRating={rev.rating}
                                                    showRating={false}
                                                    size={10}
                                                    isDisabled={true}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.revContainer}>
                                            <Text>
                                                {rev.review}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>


                        {/* <View>
                            <TouchableOpacity>
                                <Text>Sign Out</Text>
                            </TouchableOpacity>
                        </View> */}

                    </View>
                </View>
            </ScrollView>

        </View>

    )
}

export default UserMusicianDetails

const styles = StyleSheet.create({
    revRootContainer: {
        width: '60%',
        marginRight: 20,
        height: 100,
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    scrollViewContents: {
        flexGrow: 1,
        paddingRight: 500
    },
    revContainer: {
        width: '60%'
    },
    rootContainer: {
        width: screenWidth
    },
    txtContainer: {
        width: '100%',
        alignItems: 'flex-start'
    },
    imgContainer: {
        height: '100%',
        width: '30%'
    },
    reviewContainer: {
        flexDirection: 'row',
        height: 50,
        marginRight: 50,
        width: '75%'
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 750,
    },
    portfolioViewContainer: {
        borderWidth: 2,
        borderColor: '#0EB080',
        width: 250,
        height: '100%',
        borderRadius: 15,
        overflow: 'hidden'
    },
    portfolioImgStyle: {
        height: '100%',
        width: '100%',
    },
    portfolioSaveStyle: {
        borderWidth: 2,
        borderColor: '#0EB080',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '55%'
    },
    portfolioStyle: {
        alignItems: 'center',
        height: '80%'
    },
    txtStyle: {
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 5,
        color: '#0EB080',
        marginHorizontal: 10,
        fontSize: 10
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    genreContainer: {
        borderTopWidth: 0.5,
        borderTopColor: '#000000',
        padding: 20
    },
    instrumentsContainer: {
        borderTopWidth: 0.5,
        borderTopColor: '#000000',
        padding: 20
    },
    portfolioContainer: {
        borderTopWidth: 0.5,
        borderTopColor: '#000000',
        padding: 15,


    },
    titleContainer: {
        marginBottom: 5
    }
})