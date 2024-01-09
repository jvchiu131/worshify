import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const FindMusician = ({ selectedGender,
    setSelectedGender,
    selectedInstruments,
    setSelectedInstruments,
    selectedGenres,
    setSelectedGenres,
    closeModal
}) => {

    // const [selectedGender, setSelectedGender] = useState(null);
    // const [selectedInstruments, setSelectedInstruments] = useState([]);
    // const [selectedGenres, setSelectedGenres] = useState([]);


    const handleGenderSelection = (gender) => {
        setSelectedGender(gender === selectedGender ? null : gender);
    };

    const handleInstrumentSelection = (instrument) => {
        if (selectedInstruments.includes(instrument)) {
            setSelectedInstruments(selectedInstruments.filter((item) => item !== instrument));
        } else {
            setSelectedInstruments([...selectedInstruments, instrument]);
        }
    };

    const handleGenreSelection = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((item) => item !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };
    const handleReset = () => {
        setSelectedGender(null);
        setSelectedInstruments([]);
        setSelectedGenres([]);
    };

    const isGenderSelected = (gender) => selectedGender === gender;
    const isInstrumentSelected = (instrument) => selectedInstruments.includes(instrument);
    const isGenreSelected = (genre) => selectedGenres.includes(genre);

    const handleFindMatch = () => {
        // Check if any selection has been made
        if (!selectedGender && selectedInstruments.length === 0 && selectedGenres.length === 0) {
            alert(
                "No Selection",
                "Please select at least one option to find a match.",
                [{ text: "OK", onPress: () => { } }]
            );
        } else {
            closeModal(); // Close the modal if any selection has been made
        }
    };




    return (
        <View style={styles.root}>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.typeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>Gender</Text>
                        <Text style={{ textAlign: 'center', padding: 5 }}>What are you looking for?</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[
                                styles.btnStyle,
                                isGenderSelected('Male') && styles.selectedBtn,
                            ]}
                            onPress={() => handleGenderSelection('Male')}
                        >
                            <Ionicons
                                name="md-male"
                                style={[
                                    styles.icon,
                                    isGenderSelected('Male') && { color: 'white' },
                                ]}
                            />
                            <Text style={[styles.btnTxt, isGenderSelected('Male') && { color: 'white' }]}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.btnStyle,
                                isGenderSelected('Female') && styles.selectedBtn,
                            ]}
                            onPress={() => handleGenderSelection('Female')}
                        >
                            <Ionicons
                                name="md-female"
                                style={[
                                    styles.icon,
                                    isGenderSelected('Female') && { color: 'white' },
                                ]}
                            />
                            <Text style={[styles.btnTxt, isGenderSelected('Female') && { color: 'white' }]}>Female</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.btnStyle,
                                isGenderSelected('Anyone') && styles.selectedBtn,
                            ]}
                            onPress={() => handleGenderSelection('Anyone')}
                        >
                            <Feather
                                name="minus-circle"
                                style={[
                                    styles.icon,
                                    isGenderSelected('Anyone') && { color: 'white' },
                                ]}
                            />
                            <Text style={[styles.btnTxt, isGenderSelected('Anyone') && { color: 'white' }]}>Anyone</Text>
                        </TouchableOpacity>
                    </View>
                </View>



                <View style={styles.typeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>Instruments</Text>
                        <Text style={{ textAlign: 'center', padding: 5 }}>Select instruments that you play</Text>

                        <View style={styles.btnContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.btnStyles,
                                    isInstrumentSelected('Guitar') && styles.selectedBtn,
                                ]}
                                onPress={() => handleInstrumentSelection('Guitar')}
                            >
                                <MaterialCommunityIcons
                                    name="guitar-pick"
                                    style={[
                                        styles.icon,
                                        isInstrumentSelected('Guitar') && { color: 'white' },
                                    ]}
                                />
                                <Text
                                    style={[
                                        styles.btnTxt,
                                        isInstrumentSelected('Guitar') && { color: 'white' },
                                    ]}
                                >
                                    Guitar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.btnStyles,
                                    isInstrumentSelected('Bass') && styles.selectedBtn,
                                ]}
                                onPress={() => handleInstrumentSelection('Bass')}
                            >
                                <MaterialCommunityIcons
                                    name="guitar-pick"
                                    style={[
                                        styles.icon,
                                        isInstrumentSelected('Bass') && { color: 'white' },
                                    ]}
                                />
                                <Text
                                    style={[
                                        styles.btnTxt,
                                        isInstrumentSelected('Bass') && { color: 'white' },
                                    ]}
                                >
                                    Bass
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.btnStyles,
                                    isInstrumentSelected('Keyboard') && styles.selectedBtn,
                                ]}
                                onPress={() => handleInstrumentSelection('Keyboard')}
                            >
                                <MaterialCommunityIcons
                                    name="piano"
                                    style={[
                                        styles.icon,
                                        isInstrumentSelected('Keyboard') && { color: 'white' },
                                    ]}
                                />
                                <Text
                                    style={[
                                        styles.btnTxt,
                                        isInstrumentSelected('Keyboard') && { color: 'white' },
                                    ]}
                                >
                                    Keyboard
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[
                                styles.btnStyles,
                                isInstrumentSelected('Drums') && styles.selectedBtn,
                            ]}
                            onPress={() => handleInstrumentSelection('Drums')}
                        >
                            <FontAwesome5
                                name="drum"
                                style={[
                                    styles.icon,
                                    isInstrumentSelected('Drums') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isInstrumentSelected('Drums') && { color: 'white' },
                                ]}
                            >
                                Drums
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.btnStyles,
                                isInstrumentSelected('Vocals') && styles.selectedBtn,
                            ]}
                            onPress={() => handleInstrumentSelection('Vocals')}
                        >
                            <Entypo
                                name="modern-mic"
                                style={[
                                    styles.icon,
                                    isInstrumentSelected('Vocals') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isInstrumentSelected('Vocals') && { color: 'white' },
                                ]}
                            >
                                Vocals
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.btnStyles,
                                isInstrumentSelected('Violin') && styles.selectedBtn,
                            ]}
                            onPress={() => handleInstrumentSelection('Violin')}
                        >
                            <MaterialCommunityIcons
                                name="violin"
                                style={[
                                    styles.icon,
                                    isInstrumentSelected('Violin') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isInstrumentSelected('Violin') && { color: 'white' },
                                ]}
                            >
                                Violin
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[
                                styles.btnStyles,
                                isInstrumentSelected('Hand Drums') && styles.selectedBtn,
                            ]}
                            onPress={() => handleInstrumentSelection('Hand Drums')}
                        >
                            <MaterialCommunityIcons
                                name="hand-back-left-outline"
                                style={[
                                    styles.icon,
                                    isInstrumentSelected('Hand Drums') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isInstrumentSelected('Hand Drums') && { color: 'white', },
                                ]}
                            >
                                Hand Drums
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.btnStyles,
                                isInstrumentSelected('Saxophone') && styles.selectedBtn,
                            ]}
                            onPress={() => handleInstrumentSelection('Saxophone')}
                        >
                            <MaterialCommunityIcons
                                name="saxophone"
                                style={[
                                    styles.icon,
                                    isInstrumentSelected('Saxophone') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isInstrumentSelected('Saxophone') && { color: 'white' },
                                ]}
                            >
                                Saxophone
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.btnStyles,
                                isInstrumentSelected('Trumpet') && styles.selectedBtn,
                            ]}
                            onPress={() => handleInstrumentSelection('Trumpet')}
                        >
                            <MaterialCommunityIcons
                                name="trumpet"
                                style={[
                                    styles.icon,
                                    isInstrumentSelected('Trumpet') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isInstrumentSelected('Trumpet') && { color: 'white' },
                                ]}
                            >
                                Trumpet
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.typeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>Genre</Text>
                        <Text style={{ textAlign: 'center', padding: 5 }}>Select the genres that you play</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Worship Pop') && styles.selectedBtn,
                        ]}
                            onPress={() => handleGenreSelection('Worship Pop')}
                        >
                            <Entypo
                                name="vinyl"
                                style={[
                                    styles.icon,
                                    isGenreSelected('Worship Pop') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isGenreSelected('Worship Pop') && { color: 'white', },
                                ]}
                            >
                                Worship Pop
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Christian Rock') && styles.selectedBtn,
                        ]}
                            onPress={() => handleGenreSelection('Christian Rock')}
                        >
                            <Entypo
                                name="vinyl"
                                style={[
                                    styles.icon,
                                    isGenreSelected('Christian Rock') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isGenreSelected('Christian Rock') && { color: 'white', },
                                ]}
                            >
                                Christian Rock
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Country') && styles.selectedBtn,
                        ]}
                            onPress={() => handleGenreSelection('Country')}
                        >
                            <Entypo
                                name="vinyl"
                                style={[
                                    styles.icon,
                                    isGenreSelected('Country') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isGenreSelected('Country') && { color: 'white', },
                                ]}
                            >
                                Country
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Christian Jazz') && styles.selectedBtn,
                        ]}
                            onPress={() => handleGenreSelection('Christian Jazz')}
                        >
                            <Entypo
                                name="vinyl"
                                style={[
                                    styles.icon,
                                    isGenreSelected('Christian Jazz') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isGenreSelected('Christian Jazz') && { color: 'white', },
                                ]}
                            >
                                Christian Jazz
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Gospel Blues') && styles.selectedBtn,
                        ]}
                            onPress={() => handleGenreSelection('Gospel Blues')}
                        >
                            <Entypo
                                name="vinyl"
                                style={[
                                    styles.icon,
                                    isGenreSelected('Gospel Blues') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isGenreSelected('Gospel Blues') && { color: 'white', },
                                ]}
                            >
                                Gospel Blues
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Christian Reggae') && styles.selectedBtn,
                        ]}
                            onPress={() => handleGenreSelection('Christian Reggae')}
                        >
                            <Entypo
                                name="vinyl"
                                style={[
                                    styles.icon,
                                    isGenreSelected('Christian Reggae') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isGenreSelected('Christian Reggae') && { color: 'white', },
                                ]}
                            >
                                Christian Reggae
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Christian R&B') && styles.selectedBtn,
                        ]}
                            onPress={() => handleGenreSelection('Christian R&B')}
                        >
                            <Entypo
                                name="vinyl"
                                style={[
                                    styles.icon,
                                    isGenreSelected('Christian R&B') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isGenreSelected('Christian R&B') && { color: 'white', },
                                ]}
                            >
                                Christian R&B
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Electronic') && styles.selectedBtn,
                        ]}
                            onPress={() => handleGenreSelection('Electronic')}
                        >
                            <Entypo
                                name="vinyl"
                                style={[
                                    styles.icon,
                                    isGenreSelected('Electronic') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isGenreSelected('Electronic') && { color: 'white', },
                                ]}
                            >
                                Electronic
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Classical') && styles.selectedBtn,
                        ]}
                            onPress={() => handleGenreSelection('Classical')}
                        >
                            <Entypo
                                name="vinyl"
                                style={[
                                    styles.icon,
                                    isGenreSelected('Classical') && { color: 'white' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.btnTxt,
                                    isGenreSelected('Classical') && { color: 'white', },
                                ]}
                            >
                                Classical
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.typeContainer}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btnStyles, { backgroundColor: '#FC1313', height: 45, width: 120, paddingVertical: 12 }]} onPress={handleReset}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>Reset</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyles, { backgroundColor: '#0EB080', height: 45, width: 120, paddingVertical: 12 }]} onPress={closeModal}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>Find Match</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default FindMusician

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 450,
    },
    titleContainer: {
        marginBottom: 10,
        alignItems: 'center',

    },
    titleTxt: {
        color: '#0EB080',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    btnStyles: {
        padding: 5,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        width: '25%',
        alignItems: 'center',
        backgroundColor: 'white',
        ...Platform.select({
            android: {
                elevation: 5,
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
        }),
    },
    btnTxt: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 500,
        color: '#504A4B'
    },

    btnStyle: {
        padding: 3,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        width: '22%',
        alignItems: 'center',
        backgroundColor: 'white',
        ...Platform.select({
            android: {
                elevation: 6,
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
        }),
    },
    selectedBtn: {
        backgroundColor: '#2ECC9D',
        borderColor: '#2ECC9D',
    },
    icon: {
        fontSize: 20,
        marginRight: 8,
        color: '#0EB080',
    },

    icon: {
        color: '#0EB080',
        padding: 5,
        fontSize: 20,

    },
    titleContainer: {
        marginBottom: 5,
    },
    root: {
        height: screenHeight,
        width: screenWidth
    },
    container: {
        borderWidth: 2,
        height: '100%',
        width: '100%'
    },
    typeContainer: {
        marginTop: 5,
        padding: 10
    }
})