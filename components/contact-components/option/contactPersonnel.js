import React from 'react'
import { View, StyleSheet } from "react-native"
import HeaderContact from "../headerContact";
import BodyContactPersonnel from '../body/bodyContactPersonnel';

const OptionContactpersonnel = () => {

    return (
        <>
            <View style={styles.container}>
              <HeaderContact />
              <BodyContactPersonnel/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

  container: {
      flex: 1
  }

})

export default OptionContactpersonnel;