import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './InterfaceLogin'
import MenuCoulissant from './InterfaceMenuCoulissant'
import DetailContact from './InterfaceDetailContact'
import AjoutContact from './InterfaceAjoutContact'
import ModificationContact from './InterfaceModificationContact'

const Stack = createNativeStackNavigator()

const AppStack = () => {

    getToken = async () => {
        try {
          const token = await AsyncStorage.getItem('Token');
          if (token !== null) return true
          else return false
        } catch (error) {}
    };

    const token = getToken()

    return (

        <NavigationContainer>

            <Stack.Navigator screenOptions={{ headerShown: false }} >

                {token ? (
                    <>
                        <Stack.Screen name="Accueil" component={MenuCoulissant} />
                        <Stack.Screen name="AjoutContact" component={AjoutContact}/>
                        <Stack.Screen name="DetailContact" component={DetailContact}/>
                        <Stack.Screen name="ModificationContact" component={ModificationContact}/>
                    </>
                ) : (
                    <Stack.Screen name="Login" component={Login} />
                )}
                
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default AppStack