import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Authentification from './Authentification'
import MenuCoulissant from './InterfaceMenuCoulissant'
import DetailContact from './InterfaceDetailContact'
import AjoutContact from './InterfaceAjoutContact'
import ModificationContact from './InterfaceModificationContact'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { store } from '../redux/dataStore'
import { manageLogin, manageUserToken } from '../redux/action/globalDataAction'


const Stack = createNativeStackNavigator()

const AppStack = () => {


    const [isLogin, setIsLogin] = useState(false)

    store.subscribe(() => {
        setIsLogin(store.getState().globalReducer.isLogin)
    })

    useEffect(() => {

        (async () => {
            try {
                const token = await AsyncStorage.getItem('_token')
                if(token !== null && token !== undefined) {
                    store.dispatch(manageUserToken(token))
                    store.dispatch(manageLogin(true))
                }
                else store.dispatch(manageLogin(false))
                
            } catch (error) {
                console.log(error)
             }
        })()

    }, [])

    return (

        <NavigationContainer>

            <Stack.Navigator screenOptions={{ headerShown: false }} >

                {isLogin ? (

                    <>

                        <Stack.Screen name="Accueil" component={MenuCoulissant} />
                        <Stack.Screen name="AjoutContact" component={AjoutContact} />
                        <Stack.Screen name="DetailContact" component={DetailContact} />
                        <Stack.Screen name="ModificationContact" component={ModificationContact} />

                    </>
                ) : (
                    <Stack.Screen name="Authentification" component={Authentification}/>
                )}

            </Stack.Navigator>

        </NavigationContainer>

    )
}

export default AppStack