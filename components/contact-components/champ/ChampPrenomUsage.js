import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"

const ChampPrenomUsage = ({paramPrenomUsage, onChangePrenomUsage}) => {

    return (

            <TextInput

                style={styles.input}
                label = "Prénom d'usage"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => onChangePrenomUsage(text)}
                value={paramPrenomUsage} />

    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20
    }
    
    
})


export default ChampPrenomUsage