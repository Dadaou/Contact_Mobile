import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native"

const ChampPrenomUsage = ({paramPrenomUsage, onChangePrenomUsage}) => {

    const [prenomUsage, setPrenomUsage] = useState(paramPrenomUsage)

    useEffect(() => {
        setPrenomUsage(paramPrenomUsage)
    }, [paramPrenomUsage])

    const ecouterChangementValeur = (valeur) => {
        setPrenomUsage(valeur)
        onChangePrenomUsage(valeur)
    }

    return (

        <View style = {{flex : 1}}>

            <TextInput

                style={styles.input}
                placeholder="Prénom d'usage"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={prenomUsage} />

        </View>

    )

}


const styles = StyleSheet.create({

    input: {

        height: 50,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 7,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        fontSize : 16
    }
    
    
})


export default ChampPrenomUsage