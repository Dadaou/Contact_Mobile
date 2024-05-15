import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"
import { blanc, bleu } from "../../utils/Constant"

const ChampNote = ({ paramNote, sourceId, onChangeNote }) => {

    return (

        <TextInput
            style={styles.input}
            label="Notes"
            mode='outlined'
            activeOutlineColor={bleu}
            multiline={true}
            numberOfLines={8}
            onChangeText={(text) => onChangeNote(text)}
            value={paramNote}
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


export default ChampNote