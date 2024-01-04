import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const EtatContact = ({ paramEtat, onChangeEtat }) => {

  const [etat, setEtat] = useState(paramEtat)

  useEffect(() => {
    setEtat(paramEtat)
  }, [paramEtat])

  const handleActif = () => {
    setEtat(true)
    onChangeEtat(true)
  }

  const handleInactif = () => {
    setEtat(false)
    onChangeEtat(false)
  }


  return (

        <View style={styles.container}>

            <Text style={styles.text}>État :</Text>

            <View style={{ flexDirection: "row", paddingLeft : 15 }}>

                <TouchableOpacity
                    onPress={handleActif}
                    style={etat ? styles.actif : styles.buton}>

                    <Text style={etat ? styles.selectedText : styles.text}>Actif</Text>
                
                </TouchableOpacity>

                <TouchableOpacity

                    onPress={handleInactif}
                    style={!etat ? styles.inactif : styles.buton}>
                    
                    <Text style={!etat ? styles.selectedText : styles.text}>Inactif</Text>

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

  text : { 

    textAlign: "center", 
    color: "black", 
    fontSize: 20, 
    fontWeight: "bold"

   },


  selectedText: {

    textAlign: "center",
    color: "#FEFFFF",
    fontSize: 20,
    fontWeight: "bold"
  },

  buton: {

    width: buttonSize,
    height: 40,
    backgroundColor: "#FEFFFF",
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