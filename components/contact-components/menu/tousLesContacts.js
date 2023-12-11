import React from 'react'
import { View, StyleSheet } from "react-native"
import ListContact from '../ListContact'
import BoutonAjoutContact from '../BoutonAjoutContact'
import HeaderContact from "../HeaderContact"
import TitrePage from "../TitrePage"
import RechercherContact from "../RechercherContact"

const TousLesContacts = () => {

    const titre = "Tous les contacts"

    return (

        <View style={styles.container}>

            <HeaderContact />
            <TitrePage titre={titre} />
            <RechercherContact />
            <ListContact />
            <BoutonAjoutContact />

        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }

})

export default TousLesContacts