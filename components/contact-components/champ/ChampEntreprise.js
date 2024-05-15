import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"
import { blanc, bleu } from '../../utils/Constant'

const ChampEntreprise = ({ paramEntreprise, sourceId, onChangeEntreprise }) => {

    return (

        <TextInput

            style={styles.input}
            label="Entreprise"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangeEntreprise(text)}
            value={paramEntreprise}
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


export default ChampEntreprise