import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Authentification from './Authentification'
import MenuCoulissant from './InterfaceMenuCoulissant'
import DetailContact from './InterfaceDetailContact'
import AjoutContact from './InterfaceAjoutContact'
import ModificationContact from './InterfaceModificationContact'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import { store } from '../redux/dataStore'
import { manageLogin, manageUserToken, manageUserInfo, manageDateDernierRecuperation } from '../redux/action/globalDataAction'
import requetes from '../utils/RequeteSql'


const Stack = createNativeStackNavigator()

const AppStack = () => {

    const db = SQLite.openDatabase(dbLocalName)
    const [isLogin, setIsLogin] = useState(false)

    const unsubscribe = store.subscribe(() => {
        setIsLogin(store.getState().globalReducer.isLogin)
    })

    useEffect(() => {

        (async () => {
            try {
                const token = await AsyncStorage.getItem('_tokenUtilisateur')
                const infoUtilisateur = await AsyncStorage.getItem('_infoUtilisateur')
                const dateDernierRecuperation = await AsyncStorage.getItem('_dateDernierSynchro')

                if (token !== null && token !== undefined) {
                    store.dispatch(manageUserToken(token))
                    store.dispatch(manageLogin(true))
                    store.dispatch(manageUserInfo(JSON.parse(infoUtilisateur)))
                    store.dispatch(manageDateDernierRecuperation(dateDernierRecuperation))
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
                    <Stack.Screen name="Authentification" component={Authentification} />
                )}

            </Stack.Navigator>

        </NavigationContainer>

    )
}

export default AppStack