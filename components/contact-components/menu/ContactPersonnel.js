import React from 'react'
import { View, StyleSheet } from "react-native"
import HeaderContact from "../HeaderContact"
import TitrePage from "../TitrePage"
//import ChampRechercheContact from '../champ/ChampRechercheContact'

const ContactPersonnel = () => {

    const titre = "Contacts personnels"

    return (
       
            <View style={styles.container}>

              <HeaderContact />
              <TitrePage titre={titre}/>
              
              
            </View>
       
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }

})

export default ContactPersonnel