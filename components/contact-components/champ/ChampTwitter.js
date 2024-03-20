import { StyleSheet } from "react-native"
import { TextInput } from 'react-native-paper'
import { blanc, bleu } from "../../../Utils/constant"

const ChampTwitter = ({paramTwitter, onChangeTwitter}) => {

    return (

        <TextInput

            style={{ ...styles.input }}
            label = "Twitter"
            mode='outlined'
            activeOutlineColor = {bleu}
            onChangeText={(text) => onChangeTwitter(text)}
            value={paramTwitter} 
            left={<TextInput.Icon icon="twitter" color={"#00AFF0"} size={35}/>}/>
    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : blanc,
        marginBottom: 20
    }
    
    
})


export default ChampTwitter