import { TextInput } from 'react-native-paper'
import { View, StyleSheet } from "react-native"

const ChampService = ({paramServie, onChangeService}) => {

    return (

            <TextInput

                style={styles.input}
                label = "Service"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => onChangeService(text)}
                value={paramServie} />
    )

}


const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20
    }
    
    
})


export default ChampService