import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db, auth } from '../../firebase';
import { ref, onValue, child } from 'firebase/database';


const MusicianDetails = () => {

    const user = auth.currentUser;
    const uid = user.uid;

    const [instruments, setInstruments] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const pathRef = child(ref(db), 'users/logged_users/' + uid + '/instruments')
        onValue(pathRef, (snapshot) => {
            let data = [];
            snapshot.forEach((child) => {
                data.push(child.val());
                console.log(child.val())
            })

            setInstruments(data);
        })

        console.log(instruments);
    }, [])

    useEffect(() => {
        const pathRef = child(ref(db), 'users/logged_users/' + uid + '/genre')
        onValue(pathRef, (snapshot) => {
            let data = [];
            snapshot.forEach((child) => {
                data.push(child.val());
                console.log(child.val())
            })

            setGenre(data);
        })

        console.log(genre)
    }, [])




    return (
        <View>
            <Text>MusicianDetails</Text>
        </View>
    )
}

export default MusicianDetails

const styles = StyleSheet.create({})