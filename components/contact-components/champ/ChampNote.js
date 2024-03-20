import { TextInput } from 'react-native-paper'
import {  StyleSheet } from "react-native"
import { blanc, bleu } from "../../../Utils/constant"

const ChampNote = ({paramNote, onChangeNote}) => {

    return (

            <TextInput
                style={styles.input}
                label = "Notes"
                mode='outlined'
                activeOutlineColor = {bleu}
                multiline={true}
                numberOfLines={8} 
                onChangeText={(text) => onChangeNote(text)} 
                value={paramNote} />           
    )

}

const styles = StyleSheet.create({

    input: {
 
        width: 300,
        backgroundColor : blanc,
        marginBottom: 5
    }
    
    
})


export default ChampNote