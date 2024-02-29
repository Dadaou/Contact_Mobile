import { useState, useEffect } from "react";
import { TextInput } from 'react-native-paper'
import {  StyleSheet } from "react-native"

const ChampNote = ({paramNote, onChangeNote}) => {

    const [note, setNote] = useState(paramNote)

    useEffect(() => {
        setNote(paramNote)
    }, [paramNote])


    const ecouterChangementValeur = (valeur) => {
        setNote(valeur)
        onChangeNote(valeur)
    }

    return (



            <TextInput
                style={styles.input}
                label = "Notes"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                multiline={true}
                numberOfLines={8} 
                onChangeText={(text) => ecouterChangementValeur(text)} 
                value={note} />           
    )

}

const styles = StyleSheet.create({

    input: {
 
        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 5
    }
    
    
})


export default ChampNote