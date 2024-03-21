import { useEffect } from "react"
import { bleu, blanc } from "../../Utils/constant"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View } from 'react-native'
import { Text, Badge } from "react-native-paper"
import CustomDrawer from "../contact-components/CustomDrawer"
import TousLesContacts from "../contact-components/menu/TousLesContacts"
import ContactFavori from "../contact-components/menu/ContactFavori"
import { store } from "../redux/dataStore"
import { updateNombreFavori } from "../redux/action/globalDataAction"
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from "../../Utils/constant"


const Drawer = createDrawerNavigator()

const AppDrawer = () => {

    const db = SQLite.openDatabase(dbLocalName)
    const reqToGetNombreFavori = "SELECT COUNT(*) AS nombre_favori FROM contact WHERE ctt_favoris = ?"

    const getListContact = () => {

            db.transaction((tx) => {

                tx.executeSql(reqToGetNombreFavori, [1], //1 = true

                    (_, resultSet) => {
                        store.dispatch(updateNombreFavori(resultSet.rows._array[0].nombre_favori))
                    },
                    (_, error) => console.log(error)
                )

            })
    }

    useEffect(() => {
        getListContact()
    }, [])


    let nombreContact = store.getState().globalReducer.nombreContact
    let nombreFavori = store.getState().globalReducer.nombreFavori

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
                            <Badge size={30}>{nombreFavori}</Badge>
                            </View>
                        ),
                    }}
                />
            
            </Drawer.Navigator>

    )

}

export default AppDrawer