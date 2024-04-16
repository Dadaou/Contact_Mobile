import { TextInput } from 'react-native-paper'
import { View, StyleSheet } from "react-native"
import { blanc, bleu } from "../../Utils/constant"

const ChampService = ({ paramServie, onChangeService }) => {

    return (

        <TextInput

            style={styles.input}
            label="Service"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangeService(text)}
            value={paramServie} />
    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor: blanc,
        marginBottom: 20
    }


})


export default ChampService