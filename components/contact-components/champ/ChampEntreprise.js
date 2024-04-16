import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"
import { blanc, bleu } from '../../Utils/constant'

const ChampEntreprise = ({ paramEntreprise, onChangeEntreprise }) => {

    return (


        <TextInput

            style={styles.input}
            label="Entreprise"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangeEntreprise(text)}
            value={paramEntreprise} />
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