import React from 'react'
import { Modal, StyleSheet, Text, View} from 'react-native' 
import { AntDesign } from '@expo/vector-icons'

const Toast = ({ title, isVisible }) => {

    return (

        <View style={styles.modalContainer}>

            <Modal animationType='fade' transparent={true} visible={isVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <AntDesign name="checkcircleo" size={24} color="#FEFFFF" />
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
        backgroundColor: '#228B22',
        borderRadius: 10,
        opacity : 0.8,
        padding : 5
    },

    textStyle: {
        
        color: 'white',
        fontSize: 18,
        marginLeft: 8
    }
});

export default Toast