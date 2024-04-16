import { useEffect } from "react"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, StyleSheet } from 'react-native'
import { Text, Badge } from "react-native-paper"
import CustomDrawer from "../contact-components/CustomDrawer"
import TousLesContacts from "../contact-components/menu/TousLesContacts"
import ContactFavori from "../contact-components/menu/ContactFavori"
import { store } from "../redux/dataStore"
import { updateNombreFavori } from "../redux/action/globalDataAction"
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from "../Utils/constant"


const Drawer = createDrawerNavigator()

const VueDrawer = ({ titre, nombre }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{titre}</Text>
            <Badge size={30}>{nombre}</Badge>
        </View>
    )

}

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
                    }*/}}>

            <Drawer.Screen name="Tous les contacts"
                options={{
                    drawerLabel: () => (
                        <VueDrawer titre={"Tous les contacts"} nombre={nombreContact} />
                    )
                }}
            >
                {(props) => <TousLesContacts {...props} /*infoUtilisateur={infoUtilisateur}*/ />}
            </Drawer.Screen>

            <Drawer.Screen name="Contact favori" component={ContactFavori}
                options={{
                    drawerLabel: () => (
                        <VueDrawer titre={"Contact favori"} nombre={nombreFavori} />
                    )
                }}
            />

        </Drawer.Navigator>

    )

}

const styles = StyleSheet.create({

    container: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },

    text: {
        fontSize: 16
    }

})

export default AppDrawer