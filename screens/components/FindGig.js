import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'


const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const FindGig = () => {
    return (
        <View style={styles.root}>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.typeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Gender</Text>
                        <Text>What are you looking for?</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnStyle}>
                            <Text style={styles.btnTxt}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnStyle}>
                            <Text style={styles.btnTxt}>Female</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnStyle}>
                            <Text style={styles.btnTxt}>Anyone</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.typeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Instruments</Text>
                        <Text>Select the instruments that you play</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Guitar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Bass</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Keyboard</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Drums</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Vocal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Violin</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Hand Drums</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Saxophone</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnStyles}>
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
                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Pop</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Rock</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Country</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Christian Jazz</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Gospel Blues</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Christian Reggae</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>R&B</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Electronic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Classical</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.typeContainer}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Rest</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnStyles}>
                            <Text style={styles.btnTxt}>Find Match</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default FindGig

const styles = StyleSheet.create({
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
        borderWidth: 2,
        borderColor: 'red',
        height: '100%',
        width: '100%'
    },
    typeContainer: {
        marginTop: 35,
        padding: 10
    }
})