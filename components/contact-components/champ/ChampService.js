import { useState, useEffect } from "react"
import { TextInput } from 'react-native-paper'
import { View, StyleSheet } from "react-native"

const ChampService = ({paramServie, onChangeService}) => {

    const [service, setService] = useState(paramServie)

    useEffect(() => {
        setService(paramServie)
    }, [paramServie])

    const ecouterChangementValeur = (valeur) => {
        setService(valeur)
        onChangeService(valeur)
    }

    return (

            <TextInput

                style={styles.input}
                label = "Service"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={service} />
    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20
    }
    
    
})


export default ChampService