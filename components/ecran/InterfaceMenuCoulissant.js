import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import TousLesContacts from '../contact-components/menu/TousLesContacts'
import ContactFavori from '../contact-components/menu/ContactFavori'
import ContactPersonnel from '../contact-components/menu/ContactPersonnel'

const Drawer = createDrawerNavigator()

const MenuCoulissant = () => {

  return (

    <Drawer.Navigator screenOptions={{ headerShown: false }}>

      <Drawer.Screen name="Tous les contats" component={TousLesContacts} />
      <Drawer.Screen name="Contacts Favoris" component={ContactFavori} />
      <Drawer.Screen name="Contacts Personnels" component={ContactPersonnel} />

    </Drawer.Navigator>

  )

}

export default MenuCoulissant