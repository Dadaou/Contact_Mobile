import { useEffect, useState } from "react"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, StyleSheet } from 'react-native'
import { Text, Badge } from "react-native-paper"
import CustomDrawer from "../contact-components/CustomDrawer"
import TousLesContacts from "../contact-components/menu/TousLesContacts"
import ContactFavori from "../contact-components/menu/ContactFavori"
import ContactPersonnel from "../contact-components/menu/ContactPersonnel"
import ContactCorbeille from "../contact-components/menu/ContactCorbeille"
import { store } from "../redux/dataStore"


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

    const [nombreContact, setNombreContact] = useState(0)
    const [nombreContactPersonnel, setNombreContactPersonnel] = useState(0)
    const [nombreFavori, setNombreFavori] = useState(0)
    const [nombreContactCorbeille, setNombreContactCorbeille] = useState(0)

    store.subscribe(() => {
        setNombreContact(store.getState().globalReducer.nombreContact)
        setNombreContactPersonnel(store.getState().globalReducer.nombreContactPersonnel)
        setNombreFavori(store.getState().globalReducer.nombreFavori)
        setNombreContactCorbeille(store.getState().globalReducer.nombreContactCorbeille)
    })

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

            <Drawer.Screen name="Contacts Personnels"
                options={{
                    drawerLabel: () => (
                        <VueDrawer titre={"Contacts Personnels"} nombre={nombreContactPersonnel} />
                    )
                }}
            >
                {(props) => <ContactPersonnel {...props} /*infoUtilisateur={infoUtilisateur}*/ />}
            </Drawer.Screen>

            <Drawer.Screen name="Contact favori" component={ContactFavori}
                options={{
                    drawerLabel: () => (

                        <VueDrawer titre={"Contacts favoris"} nombre={nombreFavori} />

                    )
                }}
            />

            <Drawer.Screen name="Contact corbeille" component={ContactCorbeille}
                options={{
                    drawerLabel: () => (
                        <VueDrawer titre={"Corbeille"} nombre={nombreContactCorbeille} />
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