import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"
import { blanc, bleu } from '../../utils/Constant'

const ChampFonction = ({ paramFonction, sourceId, onChangeFonction }) => {

    return (

        <TextInput

            style={{ ...styles.input, marginBottom: 25 }}
            label="Fonction"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangeFonction(text)}
            value={paramFonction}
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


export default ChampFonction