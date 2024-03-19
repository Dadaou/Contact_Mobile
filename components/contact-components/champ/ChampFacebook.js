import { StyleSheet } from "react-native"
import { TextInput } from 'react-native-paper'

const ChampFacebook = ({paramFacebook, onChangeFacebook}) => {


    return (

        <TextInput

            style={{ ...styles.input }}
            label = "Facebook"
            mode='outlined'
            activeOutlineColor = "#005F9D"
            onChangeText={(text) => onChangeFacebook(text)}
            value={paramFacebook} 
            left={<TextInput.Icon icon="facebook" color={"#1877F2"} size={35}/>}/>
    )
}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20
    }
    
    
})


export default ChampFacebook