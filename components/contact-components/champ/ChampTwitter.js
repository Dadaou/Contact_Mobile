import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native"

const ChampTwitter = ({paramTwitter, onChangeTwitter}) => {


    const [twitter, setTwitter] = useState(paramTwitter)

    useEffect(() => {
        setTwitter(paramTwitter)
    }, [paramTwitter])

    const ecouterChangementValeur = (valeur) => {
        setTwitter(valeur)
        onChangeTwitter(valeur)
    }

    return (

        <View style = {styles.input}>

            <Image source={require('../../../assets/x.jpg')} style={{ width: 30, height: 30  }} />

            <TextInput

                style={{fontSize : 16, paddingLeft : 10}}
                placeholder="Twitter"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={twitter} />

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


export default ChampTwitter