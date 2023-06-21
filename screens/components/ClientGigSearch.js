import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react'
import AddGigModal from './AddGigModal';
const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const ClientGigSearch = () => {


    const animValue = useState(new Animated.Value(-600))[0]
    const [showModal, setShowModal] = useState(false);

    const moveModal = () => {
        setShowModal(true)
        Animated.timing(animValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start()

    }

    const moveBack = () => {
        Animated.timing(animValue, {
            toValue: -600,
            duration: 300,
            useNativeDriver: false,

        }).start()
        setTimeout(() => {
            setShowModal(false)
        }, 300)

    }


    return (
        <View style={styles.root}>

            <View>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPressOut={moveBack}>
                        <Animated.View
                            style={{ bottom: animValue }}
                            behavior='padding'>
                            {showModal ? (
                                <View style={styles.containerField}>
                                    <AddGigModal />
                                </View>
                            ) : (<></>
                            )}
                        </Animated.View>
                    </TouchableWithoutFeedback >


                    <TouchableOpacity style={styles.btnContainer} onPress={moveModal}>
                        <Ionicons name="add-circle-sharp" size={70} color="#0EB080" />
                    </TouchableOpacity>


                </View>
            </View>



        </View>
    )
}

export default ClientGigSearch

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        alignItems: 'center',

    },
    container: {
        height: '100%',
        width: screenWidth,
        bottom: screenHeight / 5,
    },
    btnContainer: {
        padding: 5,
        alignItems: 'flex-end',
        top: screenHeight / 1.7,
        width: '20%',
        left: 270,
    },
    containerField: {
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight,
        position: 'absolute',
        backgroundColor: '#F9F9F9',


    },

})