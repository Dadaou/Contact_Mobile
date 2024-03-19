import { StyleSheet } from "react-native"
import { TextInput } from 'react-native-paper'

const ChampLinkedin = ({paramLinkedin, onChangeLinkedin}) => {

    return (

        <TextInput

            style={{ ...styles.input }}
            label = "Linkedin"
            mode='outlined'
            activeOutlineColor = "#005F9D"
            onChangeText={(text) => onChangeLinkedin(text)}
            value={paramLinkedin} 
            left={<TextInput.Icon icon="linkedin" color={"#0077b5"} size={35}/>}/>
    )


}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20
    }
    
    
})


export default ChampLinkedin