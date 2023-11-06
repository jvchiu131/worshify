import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import { auth } from '../../firebase';

const { width: screenWidth } = Dimensions.get('screen');
const { height: screenHeight } = Dimensions.get('screen');

const Header = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const currentHeaderTitle = route.name;
    const user = auth.currentUser;


    return (
        <SafeAreaView>
            <View style={styles.container}>
                {
                    user && !user.isAnonymous && (
                        <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                            <FontAwesome name="user-circle-o" size={24} color="white" />
                        </TouchableOpacity>
                    )
                }

                {user && user.isAnonymous && (
                    <View>
                        <Text style={styles.textStyle}>Welcome <Text style={{ ...styles.textStyle, color: '#0EB080' }}>Guest!</Text></Text>
                    </View>
                )}

                <View>
                    <Text style={styles.textStyle}>{currentHeaderTitle}</Text>
                </View>

                {user && !user.isAnonymous && (
                    <TouchableOpacity onPress={() => { navigation.navigate('Notification') }}>
                        <Ionicons name="notifications" size={24} color="white" />
                    </TouchableOpacity>
                )}


            </View>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    drawerSectionStyle: {
        height: screenHeight,
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: 'white',
    },
    image: {
        height: '45%',
        width: '50%',
        // #0EB080
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