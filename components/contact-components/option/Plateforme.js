import React from 'react'
import { View, StyleSheet } from "react-native"
import HeaderContact from "../headerContact"
import BodyPlateforme from '../body/bodyPlateforme'

const OptionPlateforme = () => {

    return (
        <>
            <View style={styles.container}>
              <HeaderContact />
              <BodyPlateforme />
            </View>
        </>
    )
}

const styles = StyleSheet.create({

  container: {
      flex: 1
  }

})

export default OptionPlateforme