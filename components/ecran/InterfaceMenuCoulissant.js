import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { BackHandler, Alert } from 'react-native'

import TousLesContacts from '../contact-components/menu/TousLesContacts'
import ContactFavori from '../contact-components/menu/ContactFavori'
import ContactPersonnel from '../contact-components/menu/ContactPersonnel'
import Toast from '../Modal/Toast'

const Drawer = createDrawerNavigator()

const MenuCoulissant = ({ navigation, route }) => {

  const { showModal, infoUtilisateur } = route.params || {}

  const [isModalVisible, setModalVisible] = useState(false)

  //console.log(isModalVisible)

  const toggleModal = () => {

    setModalVisible(true)
    setTimeout(() => {
      setModalVisible(false)
    }, 1500)

  }

  const backAction = () => {

    Alert.alert("Attention!", "Vous êtes sur le point de quitter l'application, continuer?", [
      {
        text: 'NON',
        onPress: () => null
      },
      { text: 'OUI', onPress: () => BackHandler.exitApp() },
    ])
    return true
  }

  useEffect(() => {

    const listener = navigation.addListener('focus', () => {

      if (showModal && showModal !== undefined) {
        toggleModal()
        navigation.setParams({ showModal: false })
      }

    })

    return () => listener()

  }, [showModal, navigation])


  /*useEffect(() => {

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
 
    return () => backHandler.remove()
  }, [])*/


  return (

    <>

      <Drawer.Navigator screenOptions={{ headerShown: false }}>

        <Drawer.Screen name="Tous les contats">
          {(props) => <TousLesContacts {...props} infoUtilisateur={infoUtilisateur} />}
        </Drawer.Screen>


      </Drawer.Navigator>

      <Toast title='Contact enregistré' isVisible={isModalVisible} />

    </>



  )

}

export default MenuCoulissant


/*

   <Drawer.Screen name="Contacts Favoris" component={ContactFavori} />
        <Drawer.Screen name="Contacts Personnels" component={ContactPersonnel} />
*/