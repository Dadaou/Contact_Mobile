import React from 'react'
import { View, StyleSheet } from "react-native"
import HeaderContact from "../headerContact"
import TitrePage from "../titrePage"
import RechercherContact from "../rechercherContact"
import NouveauContact from "../ajoutNouveauContact"

const OptionTousLesContacts = () => {

  const titre = "Tous les contacts"

    return (
        <>
            <View style={styles.container}>
                <HeaderContact />
                <TitrePage titre={titre}/>
                <RechercherContact />
                <NouveauContact />
            </View>
        </>
    )
}

const styles = StyleSheet.create({

  container: {
      flex: 1
  }

})

export default OptionTousLesContacts