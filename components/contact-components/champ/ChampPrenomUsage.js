import { useState, useEffect } from "react"
import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"

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

            <TextInput

                style={styles.input}
                label = "Prénom d'usage"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={prenomUsage} />

    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20
    }
    
    
})


export default ChampPrenomUsage