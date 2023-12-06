import React from 'react'
import { View, StyleSheet } from "react-native"
import HeaderContact from "../headerContact"
import TitrePage from "../titrePage"
import RechercherContact from "../rechercherContact"
import FooterContact from '../footerContact'

const OptionContactpersonnel = () => {

    const titre = "Contacts personnels"

    return (
        <>
            <View style={styles.container}>

              <HeaderContact />
              <TitrePage titre={titre}/>
              <RechercherContact />
              <FooterContact />

            </View>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }

})

export default OptionContactpersonnel