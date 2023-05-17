import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const SearchInput = () => {
    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <View style={styles.plusContainer}>
                    <TouchableOpacity>
                        <AntDesign name="pluscircleo" size={24} color="green" />
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}

export default SearchInput

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    container: {
        height: '100%',
        width: '95%',
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 25
    },
    plusContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '3%'
    }
})