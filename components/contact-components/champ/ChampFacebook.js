import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native"

const ChampFacebook = ({paramFacebook, onChangeFacebook}) => {


    const [facebook, setFacebook] = useState(paramFacebook)

    useEffect(() => {
        setFacebook(paramFacebook)
    }, [paramFacebook])


    const ecouterChangementValeur = (valeur) => {
        setFacebook(valeur)
        onChangeFacebook(valeur)
    }

    return (

        <View style = {styles.input}>

            <Image source={require('../../../assets/Facebook.png')} style={{ width: 30, height: 30  }} />

            <TextInput

                style={{fontSize : 16, paddingLeft : 10}}
                placeholder="Facebook"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={facebook} />

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


export default ChampFacebook