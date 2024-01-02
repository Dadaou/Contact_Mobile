import { View, StyleSheet } from "react-native"
import HeaderContact from "../HeaderContact"
import TitrePage from "../TitrePage"
//import ChampRechercheContact from "../champ/ChampRechercheContact"

const ContactFavori = () => {

    const titre = "Contacts favoris"

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

export default ContactFavori