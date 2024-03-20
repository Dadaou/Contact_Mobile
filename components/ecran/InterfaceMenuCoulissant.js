import { useEffect, useState } from 'react'
import { BackHandler, Alert } from 'react-native'
import AppDrawer from './Drawer'
import Toast from '../Modal/Toast'

const MenuCoulissant = ({ navigation, route }) => {

  const { showModal, infoUtilisateur } = route.params || {}
  const [isModalVisible, setModalVisible] = useState(false)

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
      <AppDrawer />
      <Toast title='Contact enregistré' isVisible={isModalVisible} />
    </>



  )

}

export default MenuCoulissant


/*

   <Drawer.Screen name="Contacts Favoris" component={ContactFavori} />
        <Drawer.Screen name="Contacts Personnels" component={ContactPersonnel} />
*/