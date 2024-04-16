import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"
import { blanc, bleu } from "../../Utils/constant"

const ChampNom = ({ paramNom, onChangeNom }) => {

    return (

        <TextInput
            style={styles.input}
            label="Nom"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangeNom(text)}
            value={paramNom} />
    )

}


const styles = StyleSheet.create({

    input: {
        width: 300,
        backgroundColor: blanc,
        marginBottom: 20,
    }

})


export default ChampNom