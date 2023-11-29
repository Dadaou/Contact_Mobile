
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import NouveauContact from './ajoutNouveauContact';
import { View } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (

  
    <Tab.Navigator activeColor="#FEFFFF" barStyle={{ backgroundColor: '#1685E7' }}>
      <Tab.Screen 
        name="Nouveau" 
        component={NouveauContact} 
        options={{
            tabBarIcon: () => (

                <FontAwesome name='plus-circle' size={30} color= '#1685E7' />
            )
        }}
      />
    </Tab.Navigator>

    
  );
}

export default MyTabs