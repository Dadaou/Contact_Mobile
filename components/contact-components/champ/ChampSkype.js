import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native"

const ChampSkype = ({paramSkype, onChangeSkype}) => {

    const [skype, setSkype] = useState(paramSkype)

    useEffect(() => {
        setSkype(paramSkype)
    }, [paramSkype])

    const ecouterChangementValeur = (valeur) => {
        setSkype(valeur)
        onChangeSkype(valeur)
    }

    return (

        <View style = {styles.input}>

            <Image source={require('../../../assets/Skype.png')} style={{ width: 30, height: 30  }} /> 
            <TextInput

                style={{fontSize : 16, paddingLeft : 10}}
                placeholder="Skype"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={skype} />

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
        borderRadius : 7,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
    }
    
    
})


export default ChampSkype