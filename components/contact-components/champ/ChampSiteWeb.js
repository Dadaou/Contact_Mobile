import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native"

const ChampSiteWeb = ({paramSiteWeb, onChangeSiteWeb}) => {

    const [siteWeb, setSiteWeb] = useState(paramSiteWeb)

    useEffect(() => {
        setSiteWeb(paramSiteWeb)
    }, [paramSiteWeb])

    const ecouterChangementValeur = (valeur) => {
        setSiteWeb(valeur)
        onChangeSiteWeb(valeur)
    }

    return (

        <View style = {{flex : 1}}>

            <TextInput

                style={styles.input}
                placeholder="Site web"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={siteWeb} />

        </View>

    )

}

const styles = StyleSheet.create({

    input: {

        height: 50,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 7,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        fontSize : 16
    }
    
    
})


export default ChampSiteWeb