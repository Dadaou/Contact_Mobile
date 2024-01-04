import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import TousLesContacts from '../contact-components/menu/TousLesContacts'
import ContactFavori from '../contact-components/menu/ContactFavori'
import ContactPersonnel from '../contact-components/menu/ContactPersonnel'

const Drawer = createDrawerNavigator()

const MenuCoulissant = ({ route }) => {

  const { showModal } = route.params || {}

  //console.log('Eto', showModal)

  return (

    <Drawer.Navigator screenOptions={{ headerShown: false }}>

      <Drawer.Screen name="Tous les contats">
        {(props) => <TousLesContacts {...props} showModal={showModal} />}
      </Drawer.Screen>

      <Drawer.Screen name="Contacts Favoris" component={ContactFavori} />
      <Drawer.Screen name="Contacts Personnels" component={ContactPersonnel} />

    </Drawer.Navigator>

  )

}

export default MenuCoulissant