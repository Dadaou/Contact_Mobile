import {    View, 
            TextInput,
            Text,
            Button,
            TouchableOpacity,
            StyleSheet
        } from "react-native"

const TitrePage = ({titre}) => {
    
    return (
        <>
            <View  style={styles.container}>
                <Text style={styles.titre}>{titre}</Text>
            </View>
        </>
    )
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FCD83A' //jaune
    },

    titre : {

        textAlign : 'center',
        color : '#FEFFFF',
        fontSize : 20,
        fontWeight : 'bold'
    }

})

export default TitrePage;