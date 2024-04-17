import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"
import { blanc, bleu } from "../../utils/Constant"

const ChampPrenom = ({ paramPrenom, onChangePrenom }) => {

    return (

        <TextInput

            style={styles.input}
            label="Prénom"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangePrenom(text)}
            value={paramPrenom} />
    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor: blanc,
        marginBottom: 20,
    }


})


export default ChampPrenom