import { useState, useEffect } from "react"
import { TextInput } from 'react-native-paper'
import { StyleSheet, View } from "react-native"

const ChampNom = ({paramNom, onChangeNom}) => {

    const [nom, setNom] = useState(paramNom)

    useEffect(() => {
        setNom(paramNom)
    }, [paramNom])

    const ecouterChangementValeur = (valeur) => {
        setNom(valeur)
        onChangeNom(valeur)
    }

    return (


            <TextInput
                style={styles.input}
                label = "Nom"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={nom} />
    )

}


const styles = StyleSheet.create({

    input: {
        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20,
    }

})


export default ChampNom