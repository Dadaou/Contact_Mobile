import { StyleSheet } from "react-native"
import { TextInput } from 'react-native-paper'
import { blanc, bleu } from "../../utils/Constant"

const ChampSkype = ({ paramSkype, sourceId, onChangeSkype }) => {

    return (

        <TextInput

            style={{ ...styles.input }}
            label="Skype"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangeSkype(text)}
            value={paramSkype}
            disabled={sourceId === 1 || sourceId === undefined ? false : true}
            left={<TextInput.Icon icon="skype" color={"#00AFF0"} size={35} />} />
    )

}


const styles = StyleSheet.create({


    input: {

        width: 300,
        backgroundColor: blanc,
        marginBottom: 20
    }


})


export default ChampSkype