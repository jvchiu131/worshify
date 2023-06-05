import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');



const InstGenre = () => {



    const ContentValue = useState(new Animated.Value(-600))[0]
    const [isClicked, SetIsClicked] = useState(false);


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
                                        <TouchableOpacity>
                                            <View style={styles.btnStyle}>
                                                <Entypo name="vinyl" size={24} color="black" />
                                                <Text>Worship Pop</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>

                                    <View style={styles.column}>
                                        <TouchableOpacity>
                                            <View style={styles.btnStyle}>
                                                <Entypo name="vinyl" size={24} color="black" />
                                                <Text>Christian Rock</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>

                                    <View style={styles.column}>
                                        <TouchableOpacity>
                                            <View style={styles.btnStyle}>
                                                <Entypo name="vinyl" size={24} color="black" />
                                                <Text>Country</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>

                                </View>

                                <View style={styles.row}>
                                    <View style={styles.column}>
                                        <TouchableOpacity>
                                            <View style={styles.btnStyle}>
                                                <Entypo name="vinyl" size={24} color="black" />
                                                <Text>Christian Jazz</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>

                                    <View style={styles.column}>
                                        <TouchableOpacity>
                                            <View style={styles.btnStyle}>
                                                <Entypo name="vinyl" size={24} color="black" />
                                                <Text>Gospel Blues</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>

                                    <View style={styles.column}>
                                        <TouchableOpacity>
                                            <View style={styles.btnStyle}>
                                                <Entypo name="vinyl" size={24} color="black" />
                                                <Text>Reggae</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>


                                </View>

                                <View style={styles.row}>
                                    <View style={styles.column}>
                                        <TouchableOpacity>
                                            <View style={styles.btnStyle}>
                                                <Entypo name="vinyl" size={24} color="black" />
                                                <Text>Christian R&B</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.column}>
                                        <TouchableOpacity>
                                            <View style={styles.btnStyle}>
                                                <Entypo name="vinyl" size={24} color="black" />
                                                <Text>Electronic</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.column}>
                                        <TouchableOpacity>
                                            <View style={styles.btnStyle}>
                                                <Entypo name="vinyl" size={24} color="black" />
                                                <Text>Classical</Text>
                                            </View>
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
                                <TouchableOpacity>
                                    <View style={styles.btnStyle}>
                                        <MaterialCommunityIcons name="guitar-pick-outline" size={24} color="black" />
                                        <Text>Guitar</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={styles.column}>
                                <TouchableOpacity>
                                    <View style={styles.btnStyle}>
                                        <MaterialCommunityIcons name="guitar-pick-outline" size={24} color="black" />
                                        <Text>Bass</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={styles.column}>
                                <TouchableOpacity>
                                    <View style={styles.btnStyle}>
                                        <MaterialCommunityIcons name="piano" size={24} color="black" />
                                        <Text>Keyboard</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <TouchableOpacity>
                                    <View style={styles.btnStyle}>
                                        <FontAwesome5 name="drum" size={24} color="black" />
                                        <Text>Drums</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={styles.column}>
                                <TouchableOpacity>
                                    <View style={styles.btnStyle}>
                                        <Entypo name="modern-mic" size={24} color="black" />
                                        <Text>Vocals</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={styles.column}>
                                <TouchableOpacity>
                                    <View style={styles.btnStyle}>
                                        <MaterialCommunityIcons name="violin" size={24} color="black" />
                                        <Text>Violin</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>


                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <TouchableOpacity>
                                    <View style={styles.btnStyle}>
                                        <MaterialCommunityIcons name="hand-back-left-outline" size={24} color="black" />
                                        <Text>Hand Drums</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.column}>
                                <TouchableOpacity>
                                    <View style={styles.btnStyle}>
                                        <MaterialCommunityIcons name="saxophone" size={24} color="black" />
                                        <Text>Saxophone</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.column}>
                                <TouchableOpacity>
                                    <View style={styles.btnStyle}>
                                        <MaterialCommunityIcons name="trumpet" size={24} color="black" />
                                        <Text>Trumpet</Text>
                                    </View>
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
        marginTop: '5%'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20
    },
    subheaderTxt: {
        marginVertical: '5%'
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
        marginHorizontal: '10%',
        paddingVertical: '20%',
    },
    button: {
        borderWidth: 1,
        borderColor: '#0EB080',
        backgroundColor: '#0EB080',
        width: screenWidth / 1.5,
        alignItems: 'center',
        paddingVertical: '2%',
        borderRadius: 10
    },
    BtnRow: {
        alignItems: 'center',
        marginTop: '8%',
        width: screenWidth,
    },
    txtStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
    }
})