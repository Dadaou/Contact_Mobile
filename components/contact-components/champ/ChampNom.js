import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"

const ChampNom = ({paramNom, onChangeNom}) => {

    return (

            <TextInput
                style={styles.input}
                label = "Nom"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => onChangeNom(text)}
                value={paramNom} />
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