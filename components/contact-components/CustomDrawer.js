import { useCallback, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SQLite from 'expo-sqlite'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native'
import { dbLocalName } from '../utils/Constant'
import { TouchableRipple, ActivityIndicator } from 'react-native-paper'
import { DrawerItemList } from '@react-navigation/drawer'
import { store } from '../redux/dataStore'
import { getformatedDateTime } from '../utils/utils'
import { recupererContactPersoDepuisWeb, recupererContactPlateformeDepuisWeb } from '../synchronisation/RecupererContact'
import { manageLogin, manageUserToken, manageUserInfo, manageDateDernierSynchro } from '../redux/action/globalDataAction'
import { uri } from '../utils/Constant'
import axios from 'axios'
import { updateNombreContact, updateNombreFavori, updateNombreContactPersonnel } from '../redux/action/globalDataAction'

const CustomDrawer = props => {

  const db = SQLite.openDatabase(dbLocalName)
  const formatedDateTime = getformatedDateTime().formatedDate + " à " + getformatedDateTime().time

  const [loading, setLoading] = useState(false)
  const [connecte, setConnecte] = useState(store.getState().globalReducer.networkInfo.isConnected)
  const [internetJoignable, setInternetJoignable] = useState(store.getState().globalReducer.networkInfo.isInternetReachable)
  const [dateDernierSynchro, setDateDernierSynchro] = useState(store.getState().globalReducer.dateDernierSynchro)

  store.subscribe(() => {
    const state = store.getState()
    //console.log(state.globalReducer.dateDernierSynchro)
    setConnecte(state.globalReducer.networkInfo.isConnected)
    setInternetJoignable(state.globalReducer.networkInfo.isInternetReachable)
    setDateDernierSynchro(state.globalReducer.dateDernierSynchro)
  })

  const supprimerTableContact = useCallback(() => {

    return new Promise((resolve, reject) => {

      db.transaction(
        (tx) => {
          tx.executeSql('DROP TABLE IF EXISTS contact')
          tx.executeSql('DROP TABLE IF EXISTS telephone')
          tx.executeSql('DROP TABLE IF EXISTS mail')
          tx.executeSql('DROP TABLE IF EXISTS adresse')
        },
        (error) => {
          reject(error)
        },
        () => {
          resolve()
        }
      )
    })
  }, [])

  const synchroniser = useCallback(async () => {

    try {

      if (connecte && internetJoignable) {

        setLoading(true)
        const appToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiIxIiwiYXBwX25vbSI6ImNvbnRhY3QiLCJsb2dfaWQiOiIxNyJ9.7vXX-t6UZQEz7kSEIQkaHNF97eaUnJsN6CC524SpTFE'//await extractAppTokenFromLocalStorage()
        await recupererContactPlateformeDepuisWeb(appToken)
        await recupererContactPersoDepuisWeb(appToken)
        await AsyncStorage.setItem('_dateDernierSynchro', formatedDateTime)
        store.dispatch(manageDateDernierSynchro(formatedDateTime))
        setDateDernierSynchro(formatedDateTime)
        setLoading(false)
      }

    } catch (error) {
      throw error
    }
  }, [connecte, internetJoignable, formatedDateTime])


  const seDeconnecter = useCallback(async () => {

    try {

      await AsyncStorage.removeItem('_tokenUtilisateur')
      await AsyncStorage.removeItem('_infoUtilisateur')
      await AsyncStorage.setItem('_premierSynchro', 'false')
      store.dispatch(manageUserInfo({}))
      store.dispatch(manageUserToken(null))
      store.dispatch(manageLogin(false))
      store.dispatch(updateNombreContact(0))
      store.dispatch(updateNombreContactPersonnel(0))
      store.dispatch(updateNombreFavori(0))
      await supprimerTableContact()
      //await axios.get(uri.deconnexion + token)

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

      <View style={styles.container}>
        <TouchableRipple onPress={synchroniser} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              {loading ? (
                <>
                  <ActivityIndicator animating={loading} color="#000000" style={{ marginLeft: 8 }} />
                  <Text style={styles.textStyle}>Synchronisation en cours...</Text>
                </>
              ) : (
                <>
                  <Feather name="refresh-cw" size={24} color="#000000" style={{ marginLeft: 8 }} />
                  <Text style={styles.textStyle}>Synchroniser</Text>
                </>
              )}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 11,
                  marginLeft: 10
                }}>
                Dernière synchronisation le {dateDernierSynchro}
              </Text>
            </View>
          </View>
        </TouchableRipple>
      </View>

      <View style={styles.container}>
        <TouchableRipple onPress={seDeconnecter} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="logout" size={24} color="#000000" style={{ marginLeft: 8 }} />
            <Text style={styles.textStyle}>Déconnexion</Text>
          </View>
        </TouchableRipple>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: "#F2F3F4"
  },

  textStyle: {
    fontSize: 16,
    marginLeft: 10
  }

})

export default CustomDrawer