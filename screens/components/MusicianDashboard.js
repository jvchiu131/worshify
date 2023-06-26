import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import FeaturedGig from './FeaturedGig';
import RecommendedGigs from './RecommendedGigs';
import AdCard from './AdCard';

const { height: screenHeight } = Dimensions.get("screen");
const { width: screenWidth } = Dimensions.get("screen");

const MusicianDashboard = () => {
    return (
        <View style={styles.root}>

            <View style={styles.container}>
                <View style={styles.featuredContainer}>
                    <View style={styles.txtContainer}>
                        <Text style={styles.txtStyle}>FEATURED GIGS</Text>
                    </View>

                    <FeaturedGig />

                </View>


                <View style={styles.recommendedContainer}>
                    <View style={styles.txtContainer}>
                        <Text style={styles.txtStyle}>
                            RECOMMENDED GIGS
                        </Text>
                    </View>
                    <View style={styles.recCardContainer}>
                        <RecommendedGigs />
                    </View>
                </View>
            </View>


        </View>
    )
}

export default MusicianDashboard

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        justifyContent: 'flex-start',

    },
    container: {
        height: "100%",
        bottom: screenHeight / 4.9,
    },
    featuredContainer: {
        width: screenWidth,
        height: '23%',
    },
    recommendedContainer: {
        height: '35%',
        top: screenHeight / 20,
        width: '100%',

    },
    txtContainer: {
        width: '50%',
        height: '15%',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 10,
        margin: 10,
        paddingTop: 10,

    },
    recCardContainer: {
        height: '85%',
        width: '100%',
    },
    txtStyle: {
        color: "white",
        fontWeight: '800',
        fontSize: 14
    },
    adContainer: {
        alignItems: 'center',
        height: screenHeight / 10,
        top: screenHeight / 10
    }
})