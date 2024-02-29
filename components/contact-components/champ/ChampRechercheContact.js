import { View, StyleSheet } from "react-native"
import { useState } from "react"
import { Searchbar } from 'react-native-paper'

const ChampRechercheContact = () => {

    const [searchQuery, setSearchQuery] = useState("")

    return (

            <Searchbar
                style = {styles.input}
                placeholder="Rechercher un contact"
                onChangeText={setSearchQuery}
                value={searchQuery}
                elevation={5}
            />

    )
}


const styles = StyleSheet.create({

    input: {
        
        margin: 12,
        backgroundColor : "#FEFFFF",

    },

})

export default ChampRechercheContact