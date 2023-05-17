import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import CriteriaChip from '../components/CriteriaChip';


const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const GigSearch = () => {
    return (
        <View style={styles.root}>
            <Header />
            <View style={styles.seachContainer}>
                <SearchInput />
            </View>

            <View style={styles.criteriaContainer}>
                <CriteriaChip />
            </View>
        </View>
    )
}

export default GigSearch

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        alignItems: 'center'
    },
    seachContainer: {
        width: screenWidth,
        bottom: screenHeight / 5,
        height: '6.5%',
    },
    criteriaContainer: {
        width: screenWidth,
        bottom: screenHeight / 6,
        height: '20%'
    }
})