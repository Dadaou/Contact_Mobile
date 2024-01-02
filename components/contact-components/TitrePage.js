import { View, Text, StyleSheet } from "react-native"

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
        backgroundColor: '#F4C430' //jaune
    },

    titre : {

        textAlign : 'center',
        color : '#FEFFFF',
        fontSize : 20,
        fontWeight : 'bold'
    }

})

export default TitrePage;