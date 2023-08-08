import { StyleSheet, Text, View, Animated, Dimensions, Image, Platform, ScrollView } from 'react-native'
import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import GenreInst from './GenreInst'
import { storage } from '../../firebase'
import { ref as ref_storage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Pressable } from 'react-native'
import uuid from 'uuid';




//Screen dimensions
const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get("screen");

const AddGigModal = () => {

    const [image, setImage] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const ContentValue = useState(new Animated.Value(-600))[0]
    const [GigName, setGigName] = useState();
    const [GigAddress, setGigAddress] = useState();
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [EventType, setEventType] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Church Service', value: 'Church Service' },
        { label: 'Convention', value: 'Convention' },
        { label: 'Youth Event', value: 'Youth Event' },
        { label: 'Worship Concert', value: 'Worship Concert' },
        { label: 'Wedding', value: 'Wedding' }
    ]);
    const [MusicianType, setMusicianType] = useState(null);
    const [opentype, setOpenType] = useState(false);
    const [itemsType, setItemsType] = useState([
        { label: 'Solo', value: 'Solo' },
        { label: 'Band', value: 'Band' }
    ]);
    const [gender, setGender] = useState(null);
    const [opengender, setOpenGender] = useState(false);
    const [itemsGender, setItemsGender] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Anyone', value: 'Anyone' }
    ]);
    const [startVisible, setStartVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);
    const [imgUploaded, setImgUploaded] = useState(false)
    const [showPicker, setShowPicker] = useState(false);
    const [isAllInputsFilled, setIsAllInputsFilled] = useState(false);



    const handleBtn = () => {
        // Check if the selected gig date is in the future
        const currentDate = new Date();
        if (date < currentDate) {
            alert(
                "The selected gig date is invalid. Please input an appropriate date.",
                [{ text: "OK", onPress: () => { } }]
            );
        } else {
            Animated.timing(ContentValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
            setIsClicked(true);
        }
    };
    const checkInputsFilled = () => {
        if (
            GigName &&
            GigAddress &&
            date instanceof Date &&
            startTime instanceof Date &&
            endTime instanceof Date &&
            EventType &&
            MusicianType &&
            gender &&
            image
        ) {
            setIsAllInputsFilled(true);
        } else {
            setIsAllInputsFilled(false);
        }
    };

    useEffect(() => {
        checkInputsFilled();
    }, [GigName, GigAddress, date, startTime, endTime, EventType, MusicianType, gender, image]);

    //handles image upload
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
        const storageRef = ref_storage(storage, `gigPosts/` + `/image-${uniqueId}`);
        const result = await uploadBytes(storageRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        return await getDownloadURL(storageRef);
    }


    const props = {
        gigName: GigName, gigAddress: GigAddress, gigDate: date,
        StartTime: startTime, EndTime: endTime, eventType: EventType, img: image,
        gender: gender, musicianType: MusicianType
    };

    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    };

    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(new Date(currentDate));

            if (Platform.OS === 'android') {
                toggleDatepicker()
                // setDate(currentDate.toDateString());
                setDate(new Date(currentDate))
            } else if (Platform.OS === 'ios') {
                toggleDatepicker()
                // setDate(currentDate.toDateString());
                setDate(new Date(currentDate))
            }

        } else {
            toggleDatepicker();
        }
    };


    const toggleTimepickerStart = () => {
        setStartVisible(!startVisible)
    };

    const onChangeStartTime = ({ type }, selectedTime) => {
        if (type == 'set') {
            const currentTime = new Date(selectedTime);
            setStartTime(currentTime);

            if (Platform.OS === 'android') {
                toggleTimepickerStart()
                // setStartTime(formatTime(currentTime));
                setStartTime(new Date(currentTime));
            } else if (Platform.OS === 'ios') {
                toggleTimepickerStart()
                // setStartTime(formatTime(currentTime));
                setStartTime(new Date(currentTime));
            }

        } else {
            toggleTimepickerStart();
        }
    };

    const toggleTimepickerEnd = () => {
        setEndVisible(!endVisible)
    };

    const onChangeEndTime = ({ type }, selectedTime) => {
        if (type == 'set') {
            const currentTime = new Date(selectedTime);
            setEndTime(currentTime);

            if (Platform.OS === 'android') {
                toggleTimepickerEnd()
                setEndTime(new Date(currentTime));
            } else if (Platform.OS === 'ios') {
                toggleTimepickerStart()
                // setStartTime(formatTime(currentTime));
                setStartTime(new Date(currentTime));
            }

        } else {
            toggleTimepickerEnd();
        }
    };

    const formatTime = (rawTime) => {
        let time = new Date(rawTime);
        let hours = time.getHours();
        let minutes = time.getMinutes();

        return `${hours}:${minutes}`;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.root}>

                {isClicked ? (
                    <Animated.View
                        style={{ right: ContentValue }}>
                        {isClicked ? (
                            <GenreInst {...props} />
                        ) : null}
                    </Animated.View>
                ) : (

                    <View style={styles.container}>

                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Create A <Text style={{ color: '#0EB080' }}>Gig</Text></Text>
                        </View>


                        <View style={styles.GigNameContainer}>
                            <Text style={styles.txtStyles}>Gig Title</Text>
                            <TextInput style={styles.inputStyle}
                                value={GigName}
                                placeholder='Enter gig name'
                                onChangeText={text => setGigName(text)} />
                        </View>

                        <View style={styles.GigNameContainer}>
                            <Text style={styles.txtStyles}>Gig Address</Text>
                            <TextInput style={styles.inputStyle}
                                value={GigAddress}
                                placeholder='Enter gig address'
                                onChangeText={text => setGigAddress(text)} />
                        </View>
                        <View style={styles.GigNameContainer}>

                            <Text style={styles.txtStyles}>Date</Text>
                            {!showPicker && (
                                <Pressable
                                    onPress={toggleDatepicker} style={styles.pressableContainer}>
                                    <View style={styles.inputContainer}>
                                        <MaterialIcons name="date-range" size={24} color="#1E1E1E" style={styles.dateIcon} />
                                        <TextInput
                                            placeholder='Choose Gig Date'
                                            placeholderTextColor='#11182744'
                                            value={date instanceof Date ? date.toDateString() : ''}
                                            onChangeText={setDate}
                                            editable={false}
                                            style={styles.txtTime}
                                        />
                                    </View>
                                </Pressable>

                            )}


                            {showPicker && (
                                <DateTimePicker
                                    mode='date'
                                    display='spinner'
                                    value={date}
                                    onChange={onChange}
                                    is24Hour={false}
                                />
                            )}

                        </View>
                        <View style={styles.timeContainer}>
                            {!startVisible ? (
                                <Pressable onPress={toggleTimepickerStart} style={styles.timePickerContainer}>
                                    <Text style={styles.txtStyles}>Time Start:</Text>
                                    <TextInput
                                        placeholder='Choose Start Time'
                                        placeholderTextColor='#11182744'
                                        value={startTime instanceof Date ? formatTime(startTime) : ''}
                                        onChangeText={setStartTime}
                                        editable={false}
                                        style={styles.timeStyle}
                                    />
                                    <MaterialIcons name="access-time" size={24} color="#1E1E1E" style={styles.pickerIcon} />
                                </Pressable>
                            ) : (
                                <DateTimePicker
                                    mode='time'
                                    display='compact'
                                    value={startTime}
                                    onChange={onChangeStartTime}
                                    is24Hour={false}
                                />
                            )}

                            {!endVisible ? (
                                <Pressable onPress={toggleTimepickerEnd} style={styles.timePickerContainer}>
                                    <Text style={styles.txtStyles}>Time End:</Text>
                                    <TextInput
                                        placeholder='Choose End Time'
                                        placeholderTextColor='#11182744'
                                        value={endTime instanceof Date ? formatTime(endTime) : ''}
                                        onChangeText={setEndTime}
                                        editable={false}
                                        style={styles.timeStyle}

                                    />
                                    <MaterialIcons name="access-time" size={24} color="#1E1E1E" style={styles.pickerIcon} />
                                </Pressable>
                            ) : (
                                <DateTimePicker
                                    mode='time'
                                    display='compact'
                                    value={endTime}
                                    onChange={onChangeEndTime}
                                    is24Hour={false}
                                />
                            )}
                        </View>




                        <View style={styles.eventContainer}>
                            <Text style={styles.txtStyles}>Event Type</Text>
                            <DropDownPicker
                                open={open}
                                value={EventType}
                                items={items}
                                setOpen={setOpen}
                                setValue={setEventType}
                                setItems={setItems}
                                style={styles.eventStyle}
                                dropDownDirection='TOP'
                                dropDownStyle={styles.dropDownStyle}
                            />
                        </View>


                        <View style={styles.rowContainer}>
                            <View style={styles.musicianContainer}>
                                <Text style={styles.txtStyles}>Musician Type</Text>
                                <DropDownPicker
                                    open={opentype}
                                    value={MusicianType}
                                    items={itemsType}
                                    setOpen={setOpenType}
                                    setValue={setMusicianType}
                                    setItems={setItemsType}
                                    style={styles.eventStyle}
                                    dropDownStyle={styles.dropDownStyle}
                                    dropDownDirection='TOP'
                                />
                            </View>

                            <View style={styles.genderContainer}>
                                <Text style={styles.txtStyles}>Gender</Text>
                                <DropDownPicker
                                    open={opengender}
                                    value={gender}
                                    items={itemsGender}
                                    setOpen={setOpenGender}
                                    setValue={setGender}
                                    setItems={setItemsGender}
                                    style={styles.eventStyle}
                                    dropDownStyle={styles.dropDownStyle}
                                    dropDownDirection='TOP'
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.imgContainer} onPress={pickImage}>

                            {imgUploaded ? (
                                image && <Image source={{ uri: image }} style={styles.imgStyle} />

                            ) : (
                                <>
                                    <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                                    <Text>
                                        Add Photo
                                    </Text>
                                </>
                            )}

                        </TouchableOpacity>


                        <View>
                            <TouchableOpacity style={styles.btnContainer} onPress={handleBtn} disabled={!isAllInputsFilled}>
                                <View style={[styles.button, !isAllInputsFilled && { opacity: 0.5 }]}>
                                    <Text style={[styles.txtStyle, { color: 'white', fontWeight: 'bold' }]}>Next</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>



                )}


            </View>
        </ScrollView>
    )
}

export default AddGigModal

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    root: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',

    },
    container: {
        marginTop: 60,
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    GigNameContainer: {
        margin: 6,
        width: '90%'

    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        alignItems: 'center',
    },

    inputStyle: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        padding: 5,
        marginLeft: 3,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        marginTop: 5,
        padding: 2,
        color: 'black',

    },


    timePickerContainer: {
        flex: 1,
        alignItems: 'center',

    },
    pickerPressable: {
        alignItems: 'center',
    },


    pickerInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        width: '80%',
        height: 36,
    },
    pickerIcon: {
        position: 'absolute',
        left: 30,
        paddingTop: 30,
    },
    eventContainer: {
        margin: 20,


    },



    btnContainer: {
        borderWidth: 5,
        borderColor: '#0EB080',
        backgroundColor: '#0EB080',
        borderRadius: 10,
        top: screenHeight / 50
    },
    button: {
        borderWidth: 1,
        borderColor: '#0EB080',
        backgroundColor: '#0EB080',
        width: screenWidth / 1.5,
        alignItems: 'center',
        paddingVertical: 2,
        borderRadius: 10
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        height: '5%',
        marginBottom: 25,
        margin: 5,
        flexDirection: 'row',

    },
    timePickerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    txtStyles: {
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    timeStyle: {
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        width: '80%',
        height: 36,
        fontSize: 16,
        color: '#111827',
        paddingLeft: 50

    },

    imgContainer: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#0EB080',
        width: '80%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    imgStyle: {
        borderRadius: 15,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateIcon: {
        margin: 5,
    },
    txtTime: {
        color: 'black',
    },


    dropDownContainerStyle: {
        backgroundColor: '#FFFFFF',
        borderColor: '#0EB080',
        borderWidth: 1,
    },
    eventContainer: {
        marginHorizontal: 20,
        marginTop: 10
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    musicianContainer: {
        flex: 1,
        marginHorizontal: 20,
    },
    genderContainer: {
        flex: 1,
        marginHorizontal: 20,
    },
    eventStyle: {
        borderColor: '#0EB080',
        borderWidth: 1,
    },


});
