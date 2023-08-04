import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Animated } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ref as ref_storage, uploadBytes, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import { storage } from '../../firebase';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import InstGenre from './InstGenre';

import { Feather } from '@expo/vector-icons';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const MusicianProfilePic = ({ fname, lname, email, bday, age, address, password, gender }) => {


    const [image, setImage] = useState(null);
    const [imgUploaded, setImgUploaded] = useState(false)
    const ContentValue = useState(new Animated.Value(-600))[0]
    const [isClicked, setIsClicked] = useState(false);


    const props = { fname: fname, lname: lname, email: email, bday: bday, age: age, address: address, password: password, img: image, gender: gender }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            const uploadURL = await uploadImageAsync(result.assets[0].uri);
            setImage(uploadURL);
            setImgUploaded(false);

        }
        setImgUploaded(true);

    };

    async function uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        const uniqueId = uuid.v4()
        const storageRef = ref_storage(storage, `userProfilePic/` + `/image-${uniqueId}`);
        const result = await uploadBytes(storageRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        return await getDownloadURL(storageRef);
    }

    const handleNextBtn = () => {
        Animated.timing(ContentValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
        setIsClicked(true);
    }





    return (
        <>
            {isClicked ? (
                <Animated.View style={{ right: ContentValue }}>
                    {isClicked ? (
                        <InstGenre {...props} />
                    ) : null}
                </Animated.View>
            ) : (
                <>
                    <View style={styles.root}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.headerTitleTxt}>Please Upload Your <Text style={{ color: '#0EB080' }}>Photo</Text></Text>
                            <Text style={styles.subHeaderTitleTxt}>Choose a photo for your profile</Text>
                        </View>

                        <TouchableOpacity style={styles.imgContainer} onPress={pickImage}>
                            {imgUploaded ? (
                                image && <Image source={{ uri: image }} style={styles.imgStyle} />

                            ) : (
                                <>
                                    <Feather name="camera" size={24} color="black" />
                                    <Text>Set Profile Photo</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnContainer} onPress={handleNextBtn}>
                            <Text style={styles.btnTxt}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </>

            )}
        </>

    )

}


export default MusicianProfilePic

const styles = StyleSheet.create({
    imgStyle: {
        height: '100%',
        width: '100%',
        borderRadius: 200
    },
    btnTxt: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15
    },
    btnContainer: {
        backgroundColor: '#0EB080',
        width: '50%',
        height: '8%',
        marginTop: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgContainer: {
        borderWidth: 2,
        borderColor: '#0EB080',
        width: '55%',
        height: '40%',
        marginTop: 50,
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center'

    },
    root: {

        height: '100%',
        width: screenWidth,
        alignItems: 'center'
    },
    headerStyle: {

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,

    },
    headerTitleTxt: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    subHeaderTitleTxt: {
        marginTop: 15
    }

})