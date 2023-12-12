import React from 'react'
import { View, StyleSheet } from "react-native"
import HeaderContact from "../HeaderContact"
import TitrePage from "../TitrePage"
import RechercherContact from "../RechercherContact"


const ContactPersonnel = () => {

    const titre = "Contacts personnels"

    return (
       
            <View style={styles.container}>

              <HeaderContact />
              <TitrePage titre={titre}/>
              <RechercherContact />
              
            </View>
       
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }

})

export default ContactPersonnel