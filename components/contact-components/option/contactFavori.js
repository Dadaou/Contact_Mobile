import React from 'react'
import { View, StyleSheet } from "react-native"
import HeaderContact from "../headerContact"
import BodyContactFavori from '../body/bodyContactFavori'

const OptionContactFavori = () => {

    return (
        <>
            <View style={styles.container}>
              <HeaderContact />
              <BodyContactFavori />
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