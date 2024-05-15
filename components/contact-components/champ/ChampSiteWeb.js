import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"
import { blanc, bleu } from "../../utils/Constant"

const ChampSiteWeb = ({ paramSiteWeb, sourceId, onChangeSiteWeb }) => {

    return (

        <TextInput

            style={styles.input}
            label="Site web"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangeSiteWeb(text)}
            value={paramSiteWeb}
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


export default ChampSiteWeb