import { StyleSheet } from "react-native"
import { TextInput } from 'react-native-paper'
import { blanc, bleu } from "../../utils/Constant"

const ChampFacebook = ({ paramFacebook, sourceId, onChangeFacebook }) => {


    return (

        <TextInput

            style={{ ...styles.input }}
            label="Facebook"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangeFacebook(text)}
            value={paramFacebook}
            disabled={sourceId === 1 || sourceId === undefined ? false : true}
            left={<TextInput.Icon icon="facebook" color={"#1877F2"} size={35} />} />
    )
}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor: blanc,
        marginBottom: 20
    }


})


export default ChampFacebook