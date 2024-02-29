import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native"

const ChampLinkedin = ({paramLinkedin, onChangeLinkedin}) => {


    const [linkedin, setLinkedin] = useState(paramLinkedin)

    useEffect(() => {
        setLinkedin(paramLinkedin)
    }, [paramLinkedin])

    const ecouterChangementValeur = (valeur) => {
        setLinkedin(valeur)
        onChangeLinkedin(valeur)
    }

    return (

        <View style = {styles.input}>

            <Image source={require('../../../assets/LinkedIn.png')} style={{ width: 30, height: 30 }} />

            <TextInput

                style={{fontSize : 16, paddingLeft : 10}}
                placeholder="Linkedin"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={linkedin} />

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
        backgroundColor : "#FEFFFF"
    }
    
    
})


export default ChampLinkedin