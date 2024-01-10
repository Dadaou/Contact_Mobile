import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from "react-native"
import ListContact from '../ListContact'
import BoutonAjoutContact from '../BoutonAjoutContact'
import HeaderContact from "../HeaderContact"
import TitrePage from "../TitrePage"
import ChampRechercheContact from '../champ/ChampRechercheContact'


const TousLesContacts = ({ navigation, showModal }) => {

    const titre = "Tous les contacts"

    return (

        <View style={styles.container}>

            <HeaderContact />
            <TitrePage titre={titre} />
            <ChampRechercheContact />
            <ListContact/>
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