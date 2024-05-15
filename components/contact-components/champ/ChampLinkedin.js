import { StyleSheet } from "react-native"
import { TextInput } from 'react-native-paper'
import { blanc, bleu } from "../../utils/Constant"

const ChampLinkedin = ({ paramLinkedin, sourceId, onChangeLinkedin }) => {

    return (

        <TextInput

            style={{ ...styles.input }}
            label="Linkedin"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangeLinkedin(text)}
            value={paramLinkedin}
            disabled={sourceId === 1 || sourceId === undefined ? false : true}
            left={<TextInput.Icon icon="linkedin" color={"#0077b5"} size={35} />} />
    )


}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor: blanc,
        marginBottom: 20
    }


})


export default ChampLinkedin