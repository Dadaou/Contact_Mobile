import { TextInput } from 'react-native-paper'
import { View, StyleSheet } from "react-native"

const ChampEntreprise = ({paramEntreprise, onChangeEntreprise}) => {

    return (


            <TextInput

                style={styles.input}
                label = "Entreprise"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => onChangeEntreprise(text)}
                value={paramEntreprise} />
    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20
    }


})


export default ChampEntreprise