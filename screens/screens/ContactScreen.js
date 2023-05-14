import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';


const { height: ScreenHeight } = Dimensions.get('screen');
const { width: ScreenWidth } = Dimensions.get('screen');


const ContactScreen = () => {

    const navigation = useNavigation();




    return (

        <View style={styles.root}>
            <Header />
            <View style={styles.container}>
                <TouchableOpacity style={styles.listContainer}
                    onPress={() => { navigation.navigate('Chat') }}>
                    <View style={styles.elementContainer}>
                        <View style={styles.imageStyle}>

                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textName}>Shaira Cango</Text>
                            <Text style={styles.textStyle}>Hi! I'm good.</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listContainer}
                    onPress={() => { navigation.navigate('Chat') }}>
                    <View style={styles.elementContainer}>
                        <View style={styles.imageStyle}>

                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textName}>JV Chiu</Text>
                            <Text style={styles.textStyle}>Din ka kas?.</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>


    )
}

export default ContactScreen

const styles = StyleSheet.create({
    elementContainer: {
        flexDirection: 'row'
    },
    root: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#151414',
        height: ScreenHeight,
        width: ScreenWidth,
    },
    container: {
        width: ScreenWidth,
        top: ScreenHeight / 15,
        borderWidth: 2,
        borderColor: 'red'
    },
    listContainer: {
        paddingHorizontal: '5%',
        marginVertical: '3%',
    },
    imageStyle: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    textContainer: {
        color: 'white',
        justifyContent: 'center',
        marginLeft: '5%',
    },
    textStyle: {
        color: 'white',
    },
    textName: {
        fontWeight: 'bold',
        color: 'white',
        marginVertical: '5%'
    }


})