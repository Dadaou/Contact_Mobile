import { TextInput } from 'react-native-paper'
import {  StyleSheet } from "react-native"

const ChampNote = ({paramNote, onChangeNote}) => {

    return (

            <TextInput
                style={styles.input}
                label = "Notes"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                multiline={true}
                numberOfLines={8} 
                onChangeText={(text) => onChangeNote(text)} 
                value={paramNote} />           
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