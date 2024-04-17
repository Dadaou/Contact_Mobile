import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { blanc } from "../../utils/Constant";

const EtatContact = ({ paramEtat, onChangeEtat }) => {

  const handleActif = () => {
    onChangeEtat(true)
  }

  const handleInactif = () => {
    onChangeEtat(false)
  }


  return (

    <View style={styles.container}>

      <Text style={styles.text}>Etat :</Text>

      <View style={{ flexDirection: "row", paddingLeft: 15 }}>

        <TouchableOpacity
          onPress={handleActif}
          style={paramEtat ? styles.actif : styles.buton}>

          <Text style={paramEtat ? styles.selectedText : styles.text}>Actif</Text>

        </TouchableOpacity>

        <TouchableOpacity

          onPress={handleInactif}
          style={!paramEtat ? styles.inactif : styles.buton}>

          <Text style={!paramEtat ? styles.selectedText : styles.text}>Inactif</Text>

        </TouchableOpacity>

      </View>

    </View>
  )
};

const buttonSize = 80

const styles = StyleSheet.create({

  container: {

    backgroundColor: "#B2BEB5",
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },

  text: {

    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "bold"

  },


  selectedText: {

    textAlign: "center",
    color: blanc,
    fontSize: 20,
    fontWeight: "bold"
  },

  buton: {

    width: buttonSize,
    height: 40,
    backgroundColor: blanc,
    alignItems: "center",
    justifyContent: "center"

  },

  actif: {

    width: buttonSize,
    height: 40,
    backgroundColor: "#228B22",
    alignItems: "center",
    justifyContent: "center"

  },

  inactif: {

    width: buttonSize,
    height: 40,
    backgroundColor: "#D2042D",
    alignItems: "center",
    justifyContent: "center"

  }

})

export default EtatContact