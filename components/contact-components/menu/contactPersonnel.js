import React from 'react'
import { View, StyleSheet } from "react-native"
import HeaderContact from "../headerContact"
import TitrePage from "../titrePage"

const OptionContactpersonnel = () => {

    const titre = "Contacts personnels"

    return (
        <>
            <View style={styles.container}>

              <HeaderContact />
              <TitrePage titre={titre}/>

            </View>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }

})

export default OptionContactpersonnel