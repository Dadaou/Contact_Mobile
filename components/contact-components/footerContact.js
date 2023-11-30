
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NouveauContact from './ajoutNouveauContact'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (

  
    <Tab.Navigator screenOptions=   {{ 
                                        headerShown: false, 
                                        tabBarStyle: {
                                          backgroundColor: '#1685E7',
                                          display: 'flex',
                                          position: 'absolute'
                                        },
                                        tabBarActiveTintColor: '#FEFFFF',
                                    }}>
                                      
      <Tab.Screen 
        name="Nouveau" 
        component={NouveauContact} 
        options={{
            tabBarIcon: () => (
                <FontAwesome name='plus-circle' size={30} color= '#FEFFFF' />
            )
        }}
      />


    </Tab.Navigator>

    
  );
}

export default MyTabs