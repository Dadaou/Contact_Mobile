import { View, TextInput, StyleSheet, Image } from "react-native"

const ChampSkype = ({paramSkype, onChangeSkype}) => {

    return (

        <View style = {styles.input}>

            <Image source={require('../../../assets/Skype.png')} style={{ width: 30, height: 30  }} /> 
            <TextInput

                style={{fontSize : 16, paddingLeft : 10}}
                placeholder="Skype"
                onChangeText={(text) => onChangeSkype(text)}
                value={paramSkype} />

        </View>

    )

}


const styles = StyleSheet.create({

    input: {
        flex : 1, 
        flexDirection: "row",  
        alignItems: 'center',
        height: 50,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 5,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
    }
    
    
})


export default ChampSkype