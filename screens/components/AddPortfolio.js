import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db, auth } from '../../firebase'
import { ref as db_ref, onValue, set } from 'firebase/database'
import { ref as ref_storage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'
import uuid from 'uuid';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';


const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');


const AddPortfolio = () => {

    const [firstImgUploaded, setFirstImgUploaded] = useState(false)
    const [secondImgUploaded, setSecondImgUploaded] = useState(false)
    const [thirdImgUploaded, setThirdImgUploaded] = useState(false);
    const [firstImage, setFirstImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [thirdImage, setThirdImage] = useState(null);

    const user = auth.currentUser
    const uid = user.uid




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
        const storageRef = ref_storage(storage, `userPortfolio/` + `/image-${uniqueId}`);
        const result = await uploadBytes(storageRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        return await getDownloadURL(storageRef);
    }



    //handles image upload
    const pickFirstImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            const uploadURL = await uploadImageAsync(result.assets[0].uri);
            setFirstImage(uploadURL);
            setFirstImgUploaded(false);

        }
        setFirstImgUploaded(true);

    };

    const pickSecondImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            const uploadURL = await uploadImageAsync(result.assets[0].uri);
            setSecondImage(uploadURL);
            setSecondImgUploaded(false);

        }
        setSecondImgUploaded(true);

    };


    const pickThirdImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            const uploadURL = await uploadImageAsync(result.assets[0].uri);
            setThirdImage(uploadURL);
            setThirdImgUploaded(false);

        }
        setThirdImgUploaded(true);

    };

    const handleAddPortfolio = () => {

        //Generates GigPost Key

        const UserPortfolioRef = db_ref(db, 'users/' + '/musician/' + uid + '/portfolio');
        const PortfolioRef = db_ref(db, 'users/' + '/logged_users/' + uid + '/portfolioPic');

        set(UserPortfolioRef, {
            FirstImage: firstImage,
            SecondImage: secondImage,
            ThirdImage: thirdImage
        });


        set(PortfolioRef, {
            FirstImage: firstImage,
            SecondImage: secondImage,
            ThirdImage: thirdImage
        });


    }



    return (
        <View style={styles.root}>
            <View style={styles.container}>

                <Text>Pick <Text style={{ color: '#0EB080' }}>three images</Text> for your portfolio!</Text>


                <View style={styles.imgRoot} >
                    <TouchableOpacity style={styles.imgContainer} onPress={pickFirstImage}>

                        {firstImgUploaded ? (
                            firstImgUploaded && <Image source={{ uri: firstImage }} style={styles.imgStyle} />

                        ) : (
                            <>
                                <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                                <Text>
                                    Add Photo
                                </Text>
                            </>
                        )}

                    </TouchableOpacity>
                </View>

                <View style={styles.imgRoot} >
                    <TouchableOpacity style={styles.imgContainer} onPress={pickSecondImage}>

                        {secondImgUploaded ? (
                            secondImgUploaded && <Image source={{ uri: secondImage }} style={styles.imgStyle} />

                        ) : (
                            <>
                                <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                                <Text>
                                    Add Photo
                                </Text>
                            </>
                        )}

                    </TouchableOpacity>
                </View>


                <View style={styles.imgRoot} >
                    <TouchableOpacity style={styles.imgContainer} onPress={pickThirdImage}>

                        {thirdImgUploaded ? (
                            thirdImgUploaded && <Image source={{ uri: thirdImage }} style={styles.imgStyle} />

                        ) : (
                            <>
                                <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                                <Text>
                                    Add Photo
                                </Text>
                            </>
                        )}

                    </TouchableOpacity>
                </View>


                <TouchableOpacity onPress={handleAddPortfolio} style={styles.btnContainer}>
                    <View>
                        <Text style={{ color: 'white', fontWeight: '600' }}>
                            Confirm
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default AddPortfolio

const styles = StyleSheet.create({

    btnContainer: {
        backgroundColor: '#0EB080',
        width: '50%',
        height: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    root: {
        height: screenHeight,
        width: screenWidth,
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    imgRoot: {
        borderWidth: 2,
        borderColor: '#0EB080',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
        width: '80%',
        marginVertical: 15
    },
    imgStyle: {
        height: '100%',
        width: '100%'
    },
    container: {
        width: screenWidth,
        height: '100%',
        alignItems: 'center'
    }
})