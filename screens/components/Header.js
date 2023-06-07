import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('screen');
const { height: screenHeight } = Dimensions.get('screen');

const Header = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const currentHeaderTitle = route.name;


    return (
        <SafeAreaView>
            <View style={styles.container}>


                <TouchableOpacity style={styles.image} onPress={() => { navigation.navigate('Profile') }}>
                    <View >
                    </View>
                </TouchableOpacity>

                <View>
                    <Text style={styles.textStyle}>{currentHeaderTitle}</Text>
                </View>

                <TouchableOpacity onPress={() => { navigation.navigate('Notification') }}>
                    <Ionicons name="notifications" size={24} color="white" />
                </TouchableOpacity>


            </View>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    image: {
        backgroundColor: 'green',
        height: '45%',
        width: '9%',
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 25
    },
    container: {
        borderColor: '#50575F',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        width: screenWidth,
        flexDirection: 'row',
        paddingHorizontal: '5%'
    },
    textStyle: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700'
    }
})