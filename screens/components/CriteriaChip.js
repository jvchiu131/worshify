import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CriteriaChip = () => {
    return (
        <View style={styles.root}>
            <View>
                <Text style={styles.textStyle}>Genre</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.textStyle}>Blues</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.textStyle}>Pop</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.textStyle}>Rock</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.textStyle}>Country</Text>
                    </TouchableOpacity>


                </View>
            </View>

            <View>
                <Text style={styles.textStyle}>Instruments</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.textStyle}>Guitar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.textStyle}>Drums</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.textStyle}>Keyboard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnStyle}>
                        <Text style={styles.textStyle}>Vocal</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.typeGenderContainer}>

                <View style={styles.typeContainer}>
                    <Text style={styles.textStyle}>Type</Text>
                    <View style={styles.typeGenderbtnContainer}>
                        <TouchableOpacity style={styles.typeGenderbtn}>
                            <Text style={styles.textStyle}>Solo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.typeGenderbtn}>
                            <Text style={styles.textStyle}>Band</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.genderContainer}>
                    <Text style={styles.textStyle}>Gender</Text>
                    <View style={styles.typeGenderbtnContainer}>
                        <TouchableOpacity style={styles.typeGenderbtn}>
                            <Text style={styles.textStyle}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.typeGenderbtn}>
                            <Text style={styles.textStyle}>Female</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default CriteriaChip

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    textStyle: {
        color: 'white'
    },
    btnContainer: {
        flexDirection: 'row',
        height: '47%',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    btnStyle: {
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 20,
        height: '100%',
        width: '23%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    typeGenderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    typeGenderbtnContainer: {
        flexDirection: 'row',
        height: '47%',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    genderContainer: {
        width: '50%'
    },
    typeContainer: {
        width: '50%',
    },
    typeGenderbtn: {
        width: '45%',
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})