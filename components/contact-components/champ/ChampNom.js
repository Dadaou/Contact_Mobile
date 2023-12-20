import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native"

const ChampNom = ({onChangeNom}) => {


    const [nom, setNom] = useState('')

    const ecouterChangementValeur = (valeur) => {
        setNom(valeur)
        onChangeNom(valeur)
    }

    return (

        <View style = {{flex : 1}}>

            <TextInput

                style={styles.input}
                placeholder="Nom"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={nom} />

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


export default ChampNom