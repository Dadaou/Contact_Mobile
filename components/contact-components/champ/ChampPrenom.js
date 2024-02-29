import { useState, useEffect } from "react";
import { TextInput } from 'react-native-paper';
import { View, StyleSheet } from "react-native"

const ChampPrenom = ({paramPrenom, onChangePrenom}) => {

    const [prenom, setPrenom] = useState(paramPrenom)

    useEffect(() => {
        setPrenom(paramPrenom)
    }, [paramPrenom])

    const ecouterChangementValeur = (valeur) => {
        setPrenom(valeur)
        onChangePrenom(valeur)
    }

    return (

            <TextInput

                style={styles.input}
                label = "Prénom"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={prenom} />
    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20,
    }
    
    
})


export default ChampPrenom