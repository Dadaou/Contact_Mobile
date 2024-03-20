import { bleu, blanc } from "../../Utils/constant"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View } from 'react-native'
import { Text, Badge } from "react-native-paper"
import CustomDrawer from "../contact-components/CustomDrawer"
import TousLesContacts from "../contact-components/menu/TousLesContacts"
import ContactFavori from "../contact-components/menu/ContactFavori"
import { store } from "../redux/dataStore"

const Drawer = createDrawerNavigator()

const AppDrawer = () => {

    let nombreContact = store.getState().globalReducer.nombreContact

    return (

            <Drawer.Navigator 
                drawerContent={props => <CustomDrawer {...props} />}
                screenOptions={{ 
                    headerShown: false,
                    drawerActiveTintColor: "#000000",
                    /*drawerInactiveTintColor : "orange",
                    drawerActiveBackgroundColor : "blue"
                    drawerInactiveTintColor: '#333',
                    drawerLabelStyle: {
                        fontSize: 17,
                    }*/}}
                
            >

                <Drawer.Screen name="Tous les contacts" 
                    options={{
                        drawerLabel: () => (
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16}}>Tous les contacts</Text>
                            <Badge size={30}>{nombreContact}</Badge>
                            </View>
                        ),
                    }}
                >
                    {(props) => <TousLesContacts {...props} /*infoUtilisateur={infoUtilisateur}*/ />}
                </Drawer.Screen>

                <Drawer.Screen name="Contact favori" component={ContactFavori} 
                    options={{
                        drawerLabel: () => (
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 16 }}>Contact favori</Text>
                            <Badge size={30}>0</Badge>
                            </View>
                        ),
                    }}
                />
            
            </Drawer.Navigator>

    )

}

export default AppDrawer