import { useState, useEffect, useCallback } from 'react'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './InterfaceLogin'
import MenuCoulissant from './InterfaceMenuCoulissant'
import DetailContact from './InterfaceDetailContact'
import AjoutContact from './InterfaceAjoutContact'
import ModificationContact from './InterfaceModificationContact'
import Animation from './InterfaceSynchronisation'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Stack = createNativeStackNavigator()

const AppStack = () => {

    const [isLogin, setIsLogin] = useState(false)

    const handleAuthentication = useCallback(() => {
        setIsLogin(true)
    }, [])

    useEffect(() => {

        (async () => {
            try {
                const token = await AsyncStorage.getItem('_token')
                //console.log(token)
                setIsLogin(token !== null && token !== undefined ? true : false)
            } catch (error) { }
        })()

    }, [])

    return (

        <NavigationContainer>

            <Stack.Navigator screenOptions={{ headerShown: false }} >

                {isLogin ? (
                    <>

                        <Stack.Screen name="Animation" component={Animation} />
                        <Stack.Screen name="Accueil" component={MenuCoulissant} />
                        <Stack.Screen name="AjoutContact" component={AjoutContact} />
                        <Stack.Screen name="DetailContact" component={DetailContact} />
                        <Stack.Screen name="ModificationContact" component={ModificationContact} />

                    </>
                ) : (
                    <Stack.Screen name="Login">
                        {(props) => (
                            <Login {...props} onLogin={handleAuthentication} />
                        )}
                    </Stack.Screen>
                )}

            </Stack.Navigator>


        </NavigationContainer>

    )
}

export default AppStack