import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');



const InstGenre = () => {

    const [selectedInstruments, setSelectedInstruments] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const ContentValue = useState(new Animated.Value(-600))[0]
    const [isClicked, SetIsClicked] = useState(false);


    const handleInstrumentsClick = (buttonId) => {
        const isInstrumentSelected = selectedInstruments.includes(buttonId);

        if (isInstrumentSelected) {
            //Remove the button from the selected instruments array
            setSelectedInstruments(selectedInstruments.filter((id) => id !== buttonId));
        } else {
            //Add the button to the selected buttons array
            setSelectedInstruments([...selectedInstruments, buttonId]);

        }
    }


    const handleGenresClick = (GenreId) => {
        const isGenreSelected = selectedGenres.includes(GenreId);

        if (isGenreSelected) {
            //Remove the button from the selected instruments array
            setSelectedGenres(selectedGenres.filter((id) => id !== GenreId));
        } else {
            //Add the button to the selected buttons array
            setSelectedGenres([...selectedGenres, GenreId]);

        }
    }





    const handleClick = () => {
        Animated.timing(ContentValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
        SetIsClicked(true);

    }



    return (

        <View style={styles.container}>
            {isClicked ? (
                <Animated.View
                    style={{ right: ContentValue }}>
                    {isClicked ? (
                        <>
                            <View style={styles.headerContainer}>
                                <Text style={styles.header}>Choose <Text style={{ color: '#0EB080' }}>Genre</Text></Text>
                                <Text style={styles.subheaderTxt}>Select your preferred music genre below</Text>
                            </View>

                            <View style={styles.btnContainer}>

                                <View style={styles.row}>
                                    <View style={styles.column}>
                                        <TouchableOpacity
                                            style={[
                                                styles.btnStyle,
                                                selectedGenres.includes(1) ? styles.selectedButton : null,
                                            ]}
                                            onPress={() => handleGenresClick(1)}>

                                            <Entypo name="vinyl" size={24} color="black" />
                                            <Text>Worship Pop</Text>

                                        </TouchableOpacity>

                                    </View>

                                    <View style={styles.column}>
                                        <TouchableOpacity
                                            style={[
                                                styles.btnStyle,
                                                selectedGenres.includes(2) ? styles.selectedButton : null,
                                            ]}
                                            onPress={() => handleGenresClick(2)}>

                                            <Entypo name="vinyl" size={24} color="black" />
                                            <Text>Christian Rock</Text>

                                        </TouchableOpacity>

                                    </View>

                                    <View style={styles.column}>
                                        <TouchableOpacity
                                            style={[
                                                styles.btnStyle,
                                                selectedGenres.includes(3) ? styles.selectedButton : null,
                                            ]}
                                            onPress={() => handleGenresClick(3)}>

                                            <Entypo name="vinyl" size={24} color="black" />
                                            <Text>Country</Text>

                                        </TouchableOpacity>

                                    </View>

                                </View>

                                <View style={styles.row}>
                                    <View style={styles.column}>
                                        <TouchableOpacity
                                            style={[
                                                styles.btnStyle,
                                                selectedGenres.includes(4) ? styles.selectedButton : null,
                                            ]}
                                            onPress={() => handleGenresClick(4)}>

                                            <Entypo name="vinyl" size={24} color="black" />
                                            <Text>Christian Jazz</Text>

                                        </TouchableOpacity>

                                    </View>

                                    <View style={styles.column}>
                                        <TouchableOpacity
                                            style={[
                                                styles.btnStyle,
                                                selectedGenres.includes(5) ? styles.selectedButton : null,
                                            ]}
                                            onPress={() => handleGenresClick(5)}>

                                            <Entypo name="vinyl" size={24} color="black" />
                                            <Text>Gospel Blues</Text>

                                        </TouchableOpacity>

                                    </View>

                                    <View style={styles.column}>
                                        <TouchableOpacity
                                            style={[
                                                styles.btnStyle,
                                                selectedGenres.includes(6) ? styles.selectedButton : null,
                                            ]}
                                            onPress={() => handleGenresClick(6)}>

                                            <Entypo name="vinyl" size={24} color="black" />
                                            <Text>Reggae</Text>

                                        </TouchableOpacity>

                                    </View>


                                </View>

                                <View style={styles.row}>
                                    <View style={styles.column}>
                                        <TouchableOpacity
                                            style={[
                                                styles.btnStyle,
                                                selectedGenres.includes(7) ? styles.selectedButton : null,
                                            ]}
                                            onPress={() => handleGenresClick(7)}>

                                            <Entypo name="vinyl" size={24} color="black" />
                                            <Text>Christian R&B</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.column}>
                                        <TouchableOpacity
                                            style={[
                                                styles.btnStyle,
                                                selectedGenres.includes(8) ? styles.selectedButton : null,
                                            ]}
                                            onPress={() => handleGenresClick(8)}>

                                            <Entypo name="vinyl" size={24} color="black" />
                                            <Text>Electronic</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.column}>
                                        <TouchableOpacity
                                            style={[
                                                styles.btnStyle,
                                                selectedGenres.includes(9) ? styles.selectedButton : null,
                                            ]}
                                            onPress={() => handleGenresClick(9)}>

                                            <Entypo name="vinyl" size={24} color="black" />
                                            <Text>Classical</Text>

                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.BtnRow}>
                                    <TouchableOpacity>
                                        <View style={styles.button}>
                                            <Text style={styles.txtStyle}>Sign up</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </>
                    ) : null}
                </Animated.View>
            ) : (

                <>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Choose <Text style={{ color: '#0EB080' }}>Instruments</Text></Text>
                        <Text style={styles.subheaderTxt}>Select the instruments you play</Text>
                    </View>

                    <View style={styles.btnContainer}>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <TouchableOpacity
                                    style={[
                                        styles.btnStyle,
                                        selectedInstruments.includes(1) ? styles.selectedButton : null,
                                    ]}
                                    onPress={() => handleInstrumentsClick(1)}>

                                    <MaterialCommunityIcons name="guitar-pick-outline" size={24} color="black" />
                                    <Text>Guitar</Text>

                                </TouchableOpacity>

                            </View>

                            <View style={styles.column}>
                                <TouchableOpacity
                                    style={[
                                        styles.btnStyle,
                                        selectedInstruments.includes(2) ? styles.selectedButton : null,
                                    ]}
                                    onPress={() => handleInstrumentsClick(2)}>

                                    <MaterialCommunityIcons name="guitar-pick-outline" size={24} color="black" />
                                    <Text>Bass</Text>

                                </TouchableOpacity>

                            </View>

                            <View style={styles.column}>
                                <TouchableOpacity
                                    style={[
                                        styles.btnStyle,
                                        selectedInstruments.includes(3) ? styles.selectedButton : null,
                                    ]}
                                    onPress={() => handleInstrumentsClick(3)}>

                                    <MaterialCommunityIcons name="piano" size={24} color="black" />
                                    <Text>Keyboard</Text>

                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <TouchableOpacity
                                    style={[
                                        styles.btnStyle,
                                        selectedInstruments.includes(4) ? styles.selectedButton : null,
                                    ]}
                                    onPress={() => handleInstrumentsClick(4)}>

                                    <FontAwesome5 name="drum" size={24} color="black" />
                                    <Text>Drums</Text>

                                </TouchableOpacity>

                            </View>

                            <View style={styles.column}>
                                <TouchableOpacity
                                    style={[
                                        styles.btnStyle,
                                        selectedInstruments.includes(5) ? styles.selectedButton : null,
                                    ]}
                                    onPress={() => handleInstrumentsClick(5)}>

                                    <Entypo name="modern-mic" size={24} color="black" />
                                    <Text>Vocals</Text>

                                </TouchableOpacity>

                            </View>

                            <View style={styles.column}>
                                <TouchableOpacity
                                    style={[
                                        styles.btnStyle,
                                        selectedInstruments.includes(6) ? styles.selectedButton : null,
                                    ]}
                                    onPress={() => handleInstrumentsClick(6)}>

                                    <MaterialCommunityIcons name="violin" size={24} color="black" />
                                    <Text>Violin</Text>

                                </TouchableOpacity>

                            </View>


                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <TouchableOpacity
                                    style={[
                                        styles.btnStyle,
                                        selectedInstruments.includes(7) ? styles.selectedButton : null,
                                    ]}
                                    onPress={() => handleInstrumentsClick(7)}>

                                    <MaterialCommunityIcons name="hand-back-left-outline" size={24} color="black" />
                                    <Text>Hand Drums</Text>

                                </TouchableOpacity>
                            </View>
                            <View style={styles.column}>
                                <TouchableOpacity
                                    style={[
                                        styles.btnStyle,
                                        selectedInstruments.includes(8) ? styles.selectedButton : null,
                                    ]}
                                    onPress={() => handleInstrumentsClick(8)}>

                                    <MaterialCommunityIcons name="saxophone" size={24} color="black" />
                                    <Text>Saxophone</Text>

                                </TouchableOpacity>
                            </View>
                            <View style={styles.column}>
                                <TouchableOpacity
                                    style={[
                                        styles.btnStyle,
                                        selectedInstruments.includes(9) ? styles.selectedButton : null,
                                    ]}
                                    onPress={() => handleInstrumentsClick(9)}>

                                    <MaterialCommunityIcons name="trumpet" size={24} color="black" />
                                    <Text>Trumpet</Text>

                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.BtnRow}>
                            <TouchableOpacity onPress={handleClick}>
                                <View style={styles.button}>
                                    <Text style={styles.txtStyle}>Next</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </>
            )}
        </View >
    )
}

export default InstGenre

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flex: 1
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 5
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20
    },
    subheaderTxt: {
        marginVertical: 5
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        width: '100%'
    },
    column: {
        flex: 1
    },
    btnContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        height: screenHeight / 2
    },
    btnStyle: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 20,
    },
    button: {
        borderWidth: 1,
        borderColor: '#0EB080',
        backgroundColor: '#0EB080',
        width: screenWidth / 1.5,
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 10
    },
    BtnRow: {
        alignItems: 'center',
        marginTop: 8,
        width: screenWidth,
    },
    txtStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
    },
    selectedButton: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0EB080',
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#0EB080',
    }
})