import React from 'react'
import { View, StyleSheet } from "react-native"
import HeaderContact from "../headerContact"
//import BodyContactFavori from '../body/bodyContactFavori'

import MyTabs from '../bottomContact'

import TitrePage from "../titrePage"
import RechercherContact from "../rechercherContact";

const OptionContactFavori = () => {

    const titre = "Contacts favoris"

    return (

        <>
            <View style={styles.container}>

                <HeaderContact />
                <TitrePage titre={titre}/>
                <RechercherContact />
                <MyTabs />

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