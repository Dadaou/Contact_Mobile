import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Accueil from '../contact-components/option/Accueil'
import ContactPersonnel from '../contact-components/option/contactPersonnel'
import Plateforme from '../contact-components/option/Plateforme'
import ContactFavori from '../contact-components/option/contactFavori'

const Drawer = createDrawerNavigator()

const ListeOption = () => {

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Tous les contats" component={Accueil} />
      <Drawer.Screen name="Contacts Personnels" component={ContactPersonnel} />
      <Drawer.Screen name="Plateforme" component={Plateforme} />
      <Drawer.Screen name="Contacts Favoris" component={ContactFavori} />
    </Drawer.Navigator>
  );
  
}

export default ListeOption