import { useState, useEffect } from "react"
import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"

const ChampFonction = ({paramFonction, onChangeFonction}) => {


    const [fonction, setFonction] = useState(paramFonction)

    useEffect(() => {
        setFonction(paramFonction)
    }, [paramFonction])


    const ecouterChangementValeur = (valeur) => {
        setFonction(valeur)
        onChangeFonction(valeur)
    }

    return (

            <TextInput

                style={{ ...styles.input, marginBottom: 25 }}
                label = "Fonction"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={fonction} />
    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20
    }
    
    
})


export default ChampFonction