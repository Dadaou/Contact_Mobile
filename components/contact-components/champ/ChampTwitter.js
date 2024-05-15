import { StyleSheet } from "react-native"
import { TextInput } from 'react-native-paper'
import { blanc, bleu } from "../../utils/Constant"

const ChampTwitter = ({ paramTwitter, sourceId, onChangeTwitter }) => {

    return (

        <TextInput

            style={{ ...styles.input }}
            label="Twitter"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangeTwitter(text)}
            value={paramTwitter}
            disabled={sourceId === 1 || sourceId === undefined ? false : true}
            left={<TextInput.Icon icon="twitter" color={"#00AFF0"} size={35} />} />
    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor: blanc,
        marginBottom: 20
    }


})


export default ChampTwitter