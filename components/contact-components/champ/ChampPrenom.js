import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native"

const ChampPrenom = ({onChangePrenom}) => {


    const [prenom, setPrenom] = useState('')

    const ecouterChangementValeur = (valeur) => {
        setPrenom(valeur)
        onChangePrenom(valeur)
    }

    return (

        <View style = {{flex : 1}}>

            
            <TextInput

                style={styles.input}
                placeholder="Prénom"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={prenom} />

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


export default ChampPrenom