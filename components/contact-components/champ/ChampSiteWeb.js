import { useState, useEffect } from "react"
import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"

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

            <TextInput

                style={styles.input}
                label = "Site web"
                mode='outlined'
                activeOutlineColor = "#005F9D"
                onChangeText={(text) => ecouterChangementValeur(text)}
                value={siteWeb} />
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