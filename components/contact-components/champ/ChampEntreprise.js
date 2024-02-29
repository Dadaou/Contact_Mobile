import { useState, useEffect } from "react"
import { TextInput } from 'react-native-paper'
import { View, StyleSheet } from "react-native"

const ChampEntreprise = ({paramEntreprise, onChangeEntreprise}) => {

    const [entreprise, setEntreprise] = useState(paramEntreprise)

    useEffect(() => {
        setEntreprise(paramEntreprise)
    }, [paramEntreprise])


    const ecouterChangementValeur = (valeur) => {
        setEntreprise(valeur)
        onChangeEntreprise(valeur)
    }

    return (


            <TextInput

                style={styles.input}
                label = "Entreprise"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={entreprise} />
    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20
    }


})


export default ChampEntreprise