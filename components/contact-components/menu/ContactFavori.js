import { View, StyleSheet } from "react-native"
import HeaderContact from "../HeaderContact"
import TitrePage from "../TitrePage"
import RechercherContact from "../RechercherContact"

const ContactFavori = () => {

    const titre = "Contacts favoris"

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

export default ContactFavori