import { FontAwesome } from '@expo/vector-icons'
import {    View, 
            TextInput,
            Text,
            Button,
            TouchableOpacity,
            StyleSheet
        } from "react-native";

const NouveauContact = () => {
    
    /*return (
        <>
            <View  style={styles.container}>
                <TouchableOpacity style={styles.plusIcon}>
                    <FontAwesome
                        name='plus-circle'
                        size={50}
                        color= '#1685E7' 
                        />
                </TouchableOpacity>
           
            </View>
        </>
    )*/

    return (
        <>
            <View  style={styles.container}>
                <Text>Hellooooooooooooooo</Text>
            </View>
        </>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FEFFFF'
    },

    plusIcon : {
        //backgroundColor: '#1685E7'
        position : 'absolute',
        width : 100,
        height : 100,
        alignItems : 'center',
        justifyContent  : 'center',
        right : 50,
        bottom : 60
    }

})

export default NouveauContact;