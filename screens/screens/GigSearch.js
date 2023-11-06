import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native'
import { auth, db } from '../../firebase';
import { DataSnapshot, child, onValue, ref, set } from 'firebase/database';
import { useState } from 'react';
import { useEffect } from 'react';
import ClientGigSearch from '../components/ClientGigSearch';
import MusicianGigSearch from '../components/MusicianGigSearch';
import Header from '../components/Header';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const GigSearch = () => {


    const [isMusician, setIsMusician] = useState(false);
    const [accountType, setAccountType] = useState();
    const user = auth.currentUser;
    const uid = user.uid;


    //handles account type identification
    useEffect(() => {
        const userType = ref(db, 'users/' + '/accountType/' + uid + '/accountType');
        onValue(userType, (DataSnapshot) => {
            const accType = DataSnapshot.val();
            setAccountType(accType);
        });

        if (accountType === 'Musician') {
            console.log(user.email + " is musician")
            console.log(accountType);
            setIsMusician(true);
        } else if (accountType === "Client") {
            console.log(user.email + " is client")
            console.log(accountType);
            setIsMusician(false);
        }
    }, [accountType]);


    return (
        <View style={styles.root}>
            <Header />

            <View>
                {isMusician || user.isAnonymous ? (
                    <MusicianGigSearch />
                ) : (
                    <ClientGigSearch />
                )}

            </View>
            <Toast
                type='success'
                visibilityTime={6000}
            />
        </View>
    )
}




export default GigSearch

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#151414',
        height: screenHeight,
        alignItems: 'center',
        width: screenWidth,

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
        width: '16%',
        left: 340,

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