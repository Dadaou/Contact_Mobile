import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native"

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

        <View style={{ flex: 1 }}>

            <TextInput

                style={styles.input}
                placeholder="Entreprise"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={entreprise} />

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
        borderRadius: 7,
        borderColor: "#808080",
        backgroundColor: "#FEFFFF",
        fontSize: 16,
        marginTop : 25
    }


})


export default ChampEntreprise