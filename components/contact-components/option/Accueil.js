import React from 'react'
import { View, StyleSheet } from "react-native"
import HeaderContact from "../headerContact"
import BodyAccueil from "../body/bodyAccueil"

const OptionAccueil = () => {

    return (
        <>
            <View style={styles.container}>
              <HeaderContact />
              <BodyAccueil />
            </View>
        </>
    )
}

const styles = StyleSheet.create({

  container: {
      flex: 1
  }

})

export default OptionAccueil