import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"
import { blanc, bleu } from "../../utils/Constant"

const ChampPrenomUsage = ({ paramPrenomUsage, sourceId, onChangePrenomUsage }) => {

    return (

        <TextInput

            style={styles.input}
            label="Prénom d'usage"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangePrenomUsage(text)}
            value={paramPrenomUsage}
            disabled={sourceId === 1 || sourceId === undefined ? false : true} />

    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor: blanc,
        marginBottom: 20
    }


})


export default ChampPrenomUsage