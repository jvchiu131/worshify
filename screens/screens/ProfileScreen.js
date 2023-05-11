import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'




const ProfileScreen = () => {

    const navigation = useNavigation();


    return (

        <View style={styles.root} >
            <Image
                style={styles.image}
                source={'jvimage'} />
        </View>


    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151414',
        height: '100%',
        width: '100%'
    },
    image: {
        height: '100%',
        width: '100%'
    }
})