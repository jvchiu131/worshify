import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'


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
            if (selectedInstruments.length < 3) {
                setSelectedInstruments([...selectedInstruments, instrument]);
            } else {
                // Show a warning or notify the user that they can only select three instruments
                // You can use an alert or any other user-friendly message to inform the user.
                alert("You can only select up to three instruments.")
            }
        }
    };

    const handleGenreSelection = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((item) => item !== genre));
        } else {
            if (selectedGenres.length < 3) {
                setSelectedGenres([...selectedGenres, genre]);
            } else {
                // Show a warning or notify the user that they can only select three genres
                // You can use an alert or any other user-friendly message to inform the user.
                // console.log('You can only select up to three genres.');
                alert("You can only select up to three genres.")
            }
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

    // useEffect(() => {
    //     console.log(selectedGender)
    //     console.log(selectedGenres)
    //     console.log(selectedInstruments)
    // }, [])



    return (
        <View style={styles.root}>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.typeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Gender</Text>
                        <Text>What are you looking for?</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btnStyle, isGenderSelected('Male') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleGenderSelection('Male')}>
                            <Text style={styles.btnTxt}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyle, isGenderSelected('Female') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleGenderSelection('Female')}>
                            <Text style={styles.btnTxt}>Female</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyle, isGenderSelected('Anyone') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleGenderSelection('Anyone')}>
                            <Text style={styles.btnTxt}>Anyone</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.typeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Instruments</Text>
                        <Text>Select <Text style={{ color: '#0EB080', fontWeight: 'bold' }}>three</Text> instruments that you play</Text>

                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btnStyles, isInstrumentSelected('Guitar') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleInstrumentSelection('Guitar')}>
                            <Text style={styles.btnTxt}>Guitar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyles, isInstrumentSelected('Bass') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleInstrumentSelection('Bass')}>
                            <Text style={styles.btnTxt}>Bass</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyles, isInstrumentSelected('Keyboard') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleInstrumentSelection('Keyboard')}>
                            <Text style={styles.btnTxt}>Keyboard</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btnStyles, isInstrumentSelected('Drums') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleInstrumentSelection('Drums')}>
                            <Text style={styles.btnTxt}>Drums</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyles, isInstrumentSelected('Vocals') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleInstrumentSelection('Vocals')}>
                            <Text style={styles.btnTxt}>Vocals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyles, isInstrumentSelected('Violin') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleInstrumentSelection('Violin')}>
                            <Text style={styles.btnTxt}>Violin</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btnStyles, isInstrumentSelected('Hand Drums') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleInstrumentSelection('Hand Drums')}>
                            <Text style={styles.btnTxt}>Hand Drums</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyles, isInstrumentSelected('Saxophone') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleInstrumentSelection('Saxophone')}>
                            <Text style={styles.btnTxt}>Saxophone</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyles, isInstrumentSelected('Trumphet') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleInstrumentSelection('Trumphet')}>
                            <Text style={styles.btnTxt}>Trumphet</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.typeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Genre</Text>
                        <Text>Select the genres that you play</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Pop') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleGenreSelection('Pop')}>
                            <Text style={styles.btnTxt}>Pop</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Rock') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleGenreSelection('Rock')}>
                            <Text style={styles.btnTxt}>Rock</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Country') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleGenreSelection('Country')}>
                            <Text style={styles.btnTxt}>Country</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Christian Jazz') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleGenreSelection('Christian Jazz')}>
                            <Text style={styles.btnTxt}>Christian Jazz</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Gospel Blues') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleGenreSelection('Gospel Blues')}>
                            <Text style={styles.btnTxt}>Gospel Blues</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Christian Reggae') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleGenreSelection('Christian Reggae')}>
                            <Text style={styles.btnTxt}>Christian Reggae</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('R&B') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleGenreSelection('R&B')}>
                            <Text style={styles.btnTxt}>R&B</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Electronic') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleGenreSelection('Electronic')}>
                            <Text style={styles.btnTxt}>Electronic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStyles, isGenreSelected('Classical') && { backgroundColor: '#0EB080' }]}
                            onPress={() => handleGenreSelection('Classical')}>
                            <Text style={styles.btnTxt}>Classical</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.typeContainer}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnStyles} onPress={handleReset}>
                            <Text style={styles.btnTxt}>Reset</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnStyles, { backgroundColor: '#0EB080' }]} onPress={closeModal}>
                            <Text style={styles.btnTxt}>Find Match</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default FindMusician

const styles = StyleSheet.create({
    selectedButton: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#0EB080',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 450,
    },
    btnStyles: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#0EB080",
        borderRadius: 25,
        width: '30%',
        alignItems: 'center'
    },
    btnTxt: {
        fontSize: 15
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    btnStyle: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#0EB080",
        borderRadius: 25,
        width: '27%',
        alignItems: 'center'
    },
    titleContainer: {
        marginBottom: 5
    },
    root: {
        height: screenHeight,
        width: screenWidth
    },
    container: {
        height: '100%',
        width: '100%'
    },
    typeContainer: {
        marginTop: 35,
        padding: 10
    }
})