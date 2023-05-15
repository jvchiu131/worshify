import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'



const { height: screenHeight } = Dimensions.get('screen');



const ProfileScreen = () => {

    const navigation = useNavigation();


    return (

        <View style={styles.root} >
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <TouchableOpacity style={styles.btnField}
                        onPress={() => { navigation.navigate('Edit') }}>
                        <View >
                            <Text style={styles.btn}>Edit Profile</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>

                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textName}>John David Donguines</Text>
                        <Text style={styles.textEmail}>jddongs@gmail.com</Text>
                        <Text style={styles.textAdd}>Capiz, Western Visayas, Philippines</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnStyle}>Guitar</Text>
                        <Text style={styles.btnStyle}>Blues</Text>
                    </View>
                </View>
            </View>



        </View>


    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    btnField: {
        position: 'relative',
        bottom: screenHeight / 8,
        left: '30%'
    },
    btn: {
        borderWidth: 2,
        paddingHorizontal: '4%',
        borderRadius: 10,
        textAlign: 'center'
    },
    btnStyle: {
        width: '25%',
        textAlign: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: '3%'
    },
    btnContainer: {
        flexDirection: 'row',
        bottom: screenHeight / 5,
    },
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151414',
        height: '100%',
        width: '100%'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '65%',
        width: '100%',
        backgroundColor: '#F9F9F9',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
    modalContainer: {
        justifyContent: 'flex-end',
        height: '100%',
        width: '100%'
    },
    textContainer: {
        alignItems: 'center',
        bottom: screenHeight / 4,
    },
    imageContainer: {
        backgroundColor: 'green',
        borderRadius: 200,
        height: '25%',
        width: '32%',
        bottom: screenHeight / 3.8
    },
    textName: {
        fontWeight: 'bold',
        color: 'green',
        fontSize: '20%'
    },
    textEmail: {
        fontWeight: '200'
    },
    textAdd: {
        fontWeight: 'normal'
    }


})