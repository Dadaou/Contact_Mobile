//import 'react-native-gesture-handler';
import React from 'react';
import Login from './components/ecran/interfaceLogin';
import ListeOption from './components/ecran/interfaceContact';
import DetailContact from './components/ecran/interfaceDetailContact';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Contact" component={ListeOption} />
        <Stack.Screen name="DetailContact" component={DetailContact}/>
      </Stack.Navigator>
    </NavigationContainer>

  );

};

export default App