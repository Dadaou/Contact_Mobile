import React from 'react'
import { View, Text,StyleSheet, ScrollView } from "react-native"
import HeaderContact from "../headerContact"
//import BodyContactFavori from '../body/bodyContactFavori'
import ListeContact from '../listeContact'
import TitrePage from "../titrePage"
import RechercherContact from "../rechercherContact"
import FooterContact from '../footerContact'

const OptionContactFavori = () => {

    const titre = "Contacts favoris"

    return (

        <>
            <View style={styles.container}>

                <HeaderContact />
                <TitrePage titre={titre}/>
                <RechercherContact />
                <ListeContact />
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

export default OptionContactFavori