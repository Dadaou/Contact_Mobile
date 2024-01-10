import React, { useEffect, useState }  from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import TousLesContacts from '../contact-components/menu/TousLesContacts'
import ContactFavori from '../contact-components/menu/ContactFavori'
import ContactPersonnel from '../contact-components/menu/ContactPersonnel'
import Toast from '../contact-components/Toast'

const Drawer = createDrawerNavigator()

const MenuCoulissant = ({ navigation, route }) => {

  const { showModal } = route.params || {}

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
                navigation.setParams({ showModal: false })
            }
        
        })

        return () => listener()

    }, [showModal, navigation])


  return (

    <>

      <Drawer.Navigator screenOptions={{ headerShown: false }}>

        <Drawer.Screen name="Tous les contats">
          {(props) => <TousLesContacts {...props} showModal={showModal} />}
        </Drawer.Screen>

        <Drawer.Screen name="Contacts Favoris" component={ContactFavori} />
        <Drawer.Screen name="Contacts Personnels" component={ContactPersonnel} />

      </Drawer.Navigator>

      <Toast title='Contact enregistré' isVisible={isModalVisible} />

    </>


  
  )

}

export default MenuCoulissant