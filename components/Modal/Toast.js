import React from 'react'
import { Modal, StyleSheet, View, Image} from 'react-native' 
import { Text } from 'react-native-paper'
import { blanc } from '../../Utils/constant';

const Toast = ({ title, isVisible }) => {

    return (

        <View style={styles.modalContainer}>

            <Modal animationType='fade' transparent={true} visible={isVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Image source={require("../../assets/logo-contacts.png")} style={styles.logo} />
                        <Text style={styles.textStyle}>{title}</Text>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({

    modalContainer: {

        alignItems: 'center',
        position: 'absolute',
        height: '100%', 
        width: '100%',
        marginTop : 490
    },

    modalView: {

        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        top: 100,
        width: 200, 
        height: 40,
        backgroundColor: blanc,
        borderRadius: 30,
        opacity : 0.9,
        padding : 5
    },

    textStyle: {
        fontWeight : 'bold',
        marginLeft: 8
    },

    logo: {
        width: 25,
        height: 20,
    }
});

export default Toast