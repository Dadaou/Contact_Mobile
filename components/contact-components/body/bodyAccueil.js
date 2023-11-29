import NouveauContact from "../../ajoutNouveauContact";
import {    View, 
            TextInput,
            Text,
            Button,
            TouchableOpacity,
            StyleSheet
        } from "react-native";

const BodyAccueil = () => {
    
    return (
        <>
            <View  style={styles.container}>
                <NouveauContact />
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

export default BodyAccueil;