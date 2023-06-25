import { StyleSheet, Text, View, ImageBackground, Dimensions, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { child, onValue, ref, remove, update } from 'firebase/database';
import { db, auth } from '../../firebase';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-paper';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const ClientGigDetails = ({ postID }) => {

    const [postDetails, setPostDetails] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [applied, setApplied] = useState([]);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState([]);
    const user = auth.currentUser;
    const uid = user.uid;

    useEffect(() => {
        const dbRef = ref(db, 'gigPosts/' + postID);
        onValue(dbRef, (snapshot) => {
            const gigData = {
                key: snapshot.key,
                Event_Type: snapshot.val().Event_Type,
                GigAddress: snapshot.val().Gig_Address,
                postID: snapshot.val().postID,
                GigName: snapshot.val().Gig_Name,
                uid: snapshot.val().uid,
                GenreNeeded: snapshot.val().Genre_Needed,
                StartTime: snapshot.val().Gig_Start,
                EndTime: snapshot.val().Gig_End,
                InstrumentsNeeded: snapshot.val().Instruments_Needed,
                GigImage: snapshot.val().Gig_Image,
                GigDate: snapshot.val().Gig_Date
            };

            setPostDetails(gigData);
        });

    }, [postID])

    useEffect(() => {
        const pathRef = child(ref(db), 'gigPosts/' + postID + '/Instruments_Needed')
        onValue(pathRef, (snapshot) => {
            let data = [];
            snapshot.forEach((child) => {
                data.push(child.val());
            })
            setInstruments(data);
        })
    }, [])

    useEffect(() => {
        const pathRef = child(ref(db), 'gigPosts/' + postID + '/Genre_Needed')
        onValue(pathRef, (snapshot) => {
            let data = [];
            snapshot.forEach((child) => {
                data.push(child.val());
            })
            setGenre(data);
        })
    }, [])



    const applyGig = async () => {
        setLoading(true);
        const dbRef = ref(db, 'gigPosts/' + postID + '/usersApplied')
        await update(dbRef, {
            user: uid
        }).then(() => {
            setLoading(false)
        })

    }

    const deleteGig = async () => {
        setLoading(true);
        const dbRef = ref(db, 'gigPosts/' + postID + '/usersApplied/' + 'user')
        await remove(dbRef)
            .then(() => { setLoading(false) })
            .catch((error) => console.log(error))
    }





    return (
        <View style={styles.root}>
            <View style={styles.imgContainer}>
                <ImageBackground source={{ uri: postDetails.GigImage }} style={styles.imgStyle}></ImageBackground>
            </View>

            <View style={styles.detailContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}>{postDetails.GigName}</Text>
                </View>

                <View style={styles.dateTimeContainer}>
                    <View>
                        <FontAwesome5 name="calendar-alt" size={45} color="#0EB080" />
                    </View>

                    <View style={styles.dateContainer}>
                        <Text style={styles.dateTxt}>{postDetails.GigDate}</Text>
                        <Text style={styles.timeTxt}>{postDetails.StartTime} - {postDetails.EndTime}</Text>
                    </View>
                </View>

                <View style={styles.AddressContainer}>
                    <View>
                        <Entypo name="location" size={45} color="#0EB080" />
                    </View>

                    <View style={styles.LocationContainer}>
                        <Text style={styles.AddressTxt}>{postDetails.GigAddress}</Text>
                    </View>
                </View>

                <View>
                    {/* This is the state */}
                </View>
            </View>


            <View style={styles.btnContainer}>
                <Button mode='elevated'
                    onPress={() => applyGig()}
                    loading={loading}
                    buttonColor='#0EB080'
                    textColor='white'
                    style={styles.btnStyle}>
                    Apply Gig
                </Button>

                <Button mode='elevated'
                    onPress={() => deleteGig()}
                    loading={loading}
                    buttonColor='#0EB080'
                    textColor='white'
                    style={styles.btnStyle}>
                    delete
                </Button>
            </View>
        </View>
    )
}

export default ClientGigDetails

const styles = StyleSheet.create({
    btnTxtStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    btnStyle: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    AddressTxt: {
        fontWeight: 'bold'
    },
    LocationContainer: {
        justifyContent: 'center',
        marginLeft: 10
    },
    AddressContainer: {
        flexDirection: 'row',
        paddingLeft: 25,
        alignItems: 'center',
        marginTop: 20
    },
    dateTxt: {
        fontWeight: 'bold'
    },
    timeTxt: {
        color: '#747688',
        fontSize: 12
    },
    dateContainer: {
        justifyContent: 'center',
        marginLeft: 10
    },
    dateTimeContainer: {
        flexDirection: 'row',
        paddingLeft: 25,
        alignItems: 'center',
        marginTop: 10
    },
    root: {
        height: screenHeight,
        width: screenWidth,
    },
    detailContainer: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        height: '50%',
        zIndex: 2,
        top: -15,
        backgroundColor: 'white',
    },
    imgContainer: {
        height: '25%',
        width: '100%',
    },
    imgStyle: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        justifyContent: 'center',
        textAlign: 'left',
        padding: 25
    },
    titleStyle: {
        color: "#0EB080",
        fontWeight: 'bold',
        fontSize: 17,
    }
})