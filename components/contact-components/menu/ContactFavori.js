import { View, StyleSheet } from "react-native"
import TitrePage from "../TitrePage"
import ChampRechercheContact from "../champ/ChampRechercheContact"
import HeaderPrincipal from "../HeaderPrincipal"
import ListFavori from "../ListFavori"
//import ChampRechercheContact from "../champ/ChampRechercheContact"

const ContactFavori = () => {

    const titre = "Contacts favoris"

    return (

        <View style={styles.container}>
            <HeaderPrincipal titre={titre}/>
            <ChampRechercheContact />
            <ListFavori />
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent : "center"
    }

})

export default ContactFavori