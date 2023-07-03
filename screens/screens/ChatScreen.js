import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const ChatScreen = () => {

    const navigation = useNavigation()
    const route = useRoute()

    const { userId } = route.params


    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={navigation.goBack} />
                </Appbar.Header>
                <Text>{userId}</Text>
            </View>
        </View>

    )
}

export default ChatScreen

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151414',
        height: screenHeight,
        width: screenWidth
    },
    container: {
        width: screenWidth,
        height: screenHeight,
        top: screenHeight / 15,
        borderWidth: 2,
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: 'white'
    }
})