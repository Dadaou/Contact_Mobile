import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native"

const ChampFonction = ({onChangeFonction}) => {


    const [fonction, setFonction] = useState('')

    const ecouterChangementValeur = (valeur) => {
        setFonction(valeur)
        onChangeFonction(valeur)
    }

    return (

        <View style = {{flex : 1}}>

            <TextInput

                style={{ ...styles.input, marginBottom: 25 }}
                placeholder="Fonction"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={fonction} />

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


export default ChampFonction