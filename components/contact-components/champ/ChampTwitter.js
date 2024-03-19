import { StyleSheet } from "react-native"
import { TextInput } from 'react-native-paper'

const ChampTwitter = ({paramTwitter, onChangeTwitter}) => {

    return (

        <TextInput

            style={{ ...styles.input }}
            label = "Twitter"
            mode='outlined'
            activeOutlineColor = "#005F9D"
            onChangeText={(text) => onChangeTwitter(text)}
            value={paramTwitter} 
            left={<TextInput.Icon icon="twitter" color={"#00AFF0"} size={35}/>}/>
    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20
    }
    
    
})


export default ChampTwitter