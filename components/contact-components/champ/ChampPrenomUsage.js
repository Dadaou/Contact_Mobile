import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"
import { blanc, bleu } from "../../../Utils/constant"

const ChampPrenomUsage = ({paramPrenomUsage, onChangePrenomUsage}) => {

    return (

            <TextInput

                style={styles.input}
                label = "Prénom d'usage"
                mode='outlined'
                activeOutlineColor = {bleu}
                onChangeText={(text) => onChangePrenomUsage(text)}
                value={paramPrenomUsage} />

    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : blanc,
        marginBottom: 20
    }
    
    
})


export default ChampPrenomUsage