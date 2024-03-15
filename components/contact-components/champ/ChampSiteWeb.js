import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"

const ChampSiteWeb = ({paramSiteWeb, onChangeSiteWeb}) => {

    return (

            <TextInput

                style={styles.input}
                label = "Site web"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => onChangeSiteWeb(text)}
                value={paramSiteWeb} />
    )

}

const styles = StyleSheet.create({

    input: {

        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 20
    }
    
    
})


export default ChampSiteWeb