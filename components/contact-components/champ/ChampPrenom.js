import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"

const ChampPrenom = ({paramPrenom, onChangePrenom}) => {

    return (

            <TextInput

                style={styles.input}
                label = "Prénom"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => onChangePrenom(text)}
                value={paramPrenom} />
    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20,
    }
    
    
})


export default ChampPrenom