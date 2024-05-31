import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SQLite from 'expo-sqlite'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Text, ImageBackground, Image } from 'react-native'
import { dbLocalName } from '../utils/Constant'
import { TouchableRipple } from 'react-native-paper'
import { DrawerItemList } from '@react-navigation/drawer'
import { store } from '../redux/dataStore'
import { manageLogin, manageUserToken, manageUserInfo } from '../redux/action/globalDataAction'
import { uri } from '../utils/Constant'
import axios from 'axios'


const CustomDrawer = props => {

  const db = SQLite.openDatabase(dbLocalName)

  const supprimerTable = useCallback(() => {

    db.transaction((tx) => {

      tx.executeSql(
          'DROP TABLE IF EXISTS contact'
      )

      tx.executeSql(
          'DROP TABLE IF EXISTS telephone'
      )

      tx.executeSql(
          'DROP TABLE IF EXISTS mail'
      )

      tx.executeSql(
          'DROP TABLE IF EXISTS adresse'
      )
  })

  }, [])

  const seDeconnecter = useCallback(async () => {

    try {

      //const token = await AsyncStorage.getItem('_tokenUtilisateur')
      store.dispatch(manageUserToken(null))
      store.dispatch(manageLogin(false))
      store.dispatch(manageUserInfo({}))
      //supprimerTable()
      //await axios.get(uri.deconnexion + token)
      await AsyncStorage.removeItem('_tokenUtilisateur')
      await AsyncStorage.removeItem('_infoUtilisateur')

    } catch (error) {
      throw error
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>

      <ImageBackground source={require('../../assets/colored-background.jpg')}>

        <View style={{ margin: 20, justifyContent: "center", alignItems: "center" }}>

          <Image
            source={require('../../assets/logo-contacts.png')}
            style={{ height: 80, width: 80 }}
          />

          <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', fontWeight: "bold" }}>
            Contact
          </Text>

        </View>

      </ImageBackground>

      <View style={{ flex: 1, backgroundColor: "#F2F3F4", paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>
      <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#ccc', backgroundColor: "#F2F3F4" }}>
        <TouchableRipple onPress={seDeconnecter} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="logout" size={24} color="#000000" style={{ marginLeft: 8 }} />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
              }}>
              Déconnexion
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </View>
  )
}

export default CustomDrawer