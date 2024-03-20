import { View, Text, StyleSheet } from "react-native"
import { blanc, bleu } from "../../Utils/constant";

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
        flex : 0.1, 
        backgroundColor: bleu
        // backgroundColor: '#F4C430' //jaune
    },

    titre : {

        textAlign : 'center',
        color : blanc,
        fontSize : 20,
        fontWeight : 'bold'
    }

})

export default TitrePage;