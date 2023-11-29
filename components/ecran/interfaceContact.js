import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import ContactFavori from '../contact-components/menu/contactFavori'
import TousLesContacts from '../contact-components/menu/tousLesContacts'
import ContactPersonnel from '../contact-components/menu/contactPersonnel'

const Drawer = createDrawerNavigator()

const ListeOption = () => {

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Contacts Favoris" component={ContactFavori} />
      <Drawer.Screen name="Tous les contats" component={TousLesContacts} />
      <Drawer.Screen name="Contacts Personnels" component={ContactPersonnel} />
    </Drawer.Navigator>
  );
  
}

export default ListeOption