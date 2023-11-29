//import 'react-native-gesture-handler';
import React from 'react';
import Login from './components/ecran/interfaceLogin';
import ListeOption from './components/ecran/interfaceAccueil';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AccueilContact" component={ListeOption} />
      </Stack.Navigator>
    </NavigationContainer>

  );

};

export default App;