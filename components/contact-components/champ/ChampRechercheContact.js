import { StyleSheet } from "react-native"
import { useState } from "react"
import { Searchbar } from 'react-native-paper'
import { blanc } from "../../../Utils/constant"

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
        
        margin: 10,
        backgroundColor : "#F2F3F4",

    },

})

export default ChampRechercheContact