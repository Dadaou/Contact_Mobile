import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native"

const ChampNote = (onChangeNote) => {


    const [note, setNote] = useState('')

    const ecouterChangementValeur = (valeur) => {
        setNote(valeur)
        onChangeNote(valeur)
    }

    return (

        <View style = {{flex : 1}}>


            <TextInput
                style={styles.input}
                placeholder="Notes"
                multiline={true}
                numberOfLines={10} 
                onChangeText={(text) => ecouterChangementValeur(text)} 
                value={note} />           

        </View>

    )

}

const styles = StyleSheet.create({

    input: {

        height:200,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 7,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        fontSize : 16,
        textAlignVertical: 'top'
    }
    
    
})


export default ChampNote