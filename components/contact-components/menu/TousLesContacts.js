import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from "react-native"
import ListContact from '../ListContact'
import BoutonAjoutContact from '../BoutonAjoutContact'
import HeaderContact from "../HeaderContact"
import TitrePage from "../TitrePage"
import ChampRechercheContact from '../champ/ChampRechercheContact'

import Toast from '../Toast'

const TousLesContacts = ({ navigation, showModal }) => {

    const titre = "Tous les contacts"

    const [isModalVisible, setModalVisible] = useState(false)

    //console.log(isModalVisible)

    const toggleModal = () => {

        setModalVisible(true)
        setTimeout(() => {
          setModalVisible(false)
        }, 1500)

    }

    useEffect(() => {

        const listener = navigation.addListener('focus', () => {

            if (showModal && showModal !== undefined) {
                toggleModal()
            }
        
        })

        return () => listener()

    }, [showModal, navigation])


    return (

        <View style={styles.container}>

            <HeaderContact />
            <TitrePage titre={titre} />
            <ChampRechercheContact />
            <ListContact/>
            <BoutonAjoutContact />
            <Toast title='Contact enregistré' isVisible={isModalVisible} />

        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }

})

export default TousLesContacts