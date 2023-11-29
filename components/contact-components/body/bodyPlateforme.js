import Icon from 'react-native-vector-icons/FontAwesome'
import {    View, 
            TextInput,
            Text,
            Button,
            TouchableOpacity,
            StyleSheet
        } from "react-native";

const BodyPlateforme = () => {
    
    return (
        <>
            <View  style={styles.container}>
                <Text>Plateforme</Text>
            </View>
        </>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 30,
        backgroundColor: '#FEFFFF'
    },

})

export default BodyPlateforme;