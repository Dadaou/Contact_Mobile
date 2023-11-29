import Icon from 'react-native-vector-icons/FontAwesome'
import {    View, 
            TextInput,
            Text,
            Button,
            TouchableOpacity,
            StyleSheet
        } from "react-native";

const BodyContactFavori = () => {
    
    return (
        <>
            <View  style={styles.container}>
                <Text>Contact favori</Text>
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

export default BodyContactFavori;