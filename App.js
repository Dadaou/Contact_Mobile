import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './components/ecran/InterfaceLogin'
import MenuCoulissant from './components/ecran/InterfaceMenuCoulissant'
import DetailContact from './components/ecran/InterfaceDetailContact'
import AjoutContact from './components/ecran/InterfaceAjoutContact'
import ModificationContact from './components/ecran/InterfaceModificationContact'


const Stack = createNativeStackNavigator()

const App = () => {

  return (

    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Accueil" component={MenuCoulissant} />
        <Stack.Screen name="AjoutContact" component={AjoutContact}/>
        <Stack.Screen name="DetailContact" component={DetailContact}/>
        <Stack.Screen name="ModificationContact" component={ModificationContact}/>
      </Stack.Navigator>

    </NavigationContainer>

  );

};

export default App