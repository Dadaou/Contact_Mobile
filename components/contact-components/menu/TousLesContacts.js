import { View, StyleSheet,  } from "react-native"
import ListContact from '../ListContact'
import BoutonAjoutContact from '../BoutonAjoutContact'
import HeaderPrincipal from "../HeaderPrincipal"
import TitrePage from "../TitrePage"
import ChampRechercheContact from '../champ/ChampRechercheContact'
import { blanc } from "../../../Utils/constant"


const TousLesContacts = () => {

    const titre = "Tous les contacts"

    return (

        <View style={styles.container}>

            <HeaderPrincipal titre={titre} />
            <ChampRechercheContact />
            <ListContact/>
            <BoutonAjoutContact />
           
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent : "center",
        //backgroundColor : blanc
    }

})

export default TousLesContacts

/* <TitrePage titre={titre} /> 
            <HeaderPrincipal infoUtilisateur={infoUtilisateur} />
            
            <ChampRechercheContact />*/