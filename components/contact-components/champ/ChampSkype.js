import { StyleSheet} from "react-native"
import { TextInput } from 'react-native-paper'

const ChampSkype = ({paramSkype, onChangeSkype}) => {

    return (

        <TextInput

            style={{ ...styles.input }}
            label = "Skype"
            mode='outlined'
            activeOutlineColor = "#005F9D"
            onChangeText={(text) => onChangeSkype(text)}
            value={paramSkype} 
            left={<TextInput.Icon icon="skype" color={"#00AFF0"} size={35}/>}/>
    )

}


const styles = StyleSheet.create({


    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20
    }
    
    
})


export default ChampSkype