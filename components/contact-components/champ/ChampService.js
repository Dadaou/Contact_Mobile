import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native"

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

        <View style = {{flex : 1}}>

            <TextInput

                style={styles.input}
                placeholder="Service"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={service} />

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


export default ChampService