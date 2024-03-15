import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"

const ChampFonction = ({paramFonction, onChangeFonction}) => {

    return (

            <TextInput

                style={{ ...styles.input, marginBottom: 25 }}
                label = "Fonction"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => onChangeFonction(text)}
                value={paramFonction} />
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