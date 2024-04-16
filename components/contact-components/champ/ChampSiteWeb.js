import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"
import { blanc, bleu } from "../../Utils/constant"

const ChampSiteWeb = ({ paramSiteWeb, onChangeSiteWeb }) => {

    return (

        <TextInput

            style={styles.input}
            label="Site web"
            mode='outlined'
            activeOutlineColor={bleu}
            onChangeText={(text) => onChangeSiteWeb(text)}
            value={paramSiteWeb} />
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