import { useState, useEffect, useCallback } from 'react';
import NetInfo from "@react-native-community/netinfo"
import { store } from '../redux/dataStore'
import { updateNetworkStatus, manageApparitionNotification, manageNotificationMessage } from '../redux/action/globalDataAction'
import { envoyerContactAjouterAWeb, envoyerContactModifierAWeb } from './EnvoyerContact'
import { getDate } from '../utils/utils'

const NetworkCheck = () => {

  const [connecte, setConnecte] = useState(false)
  const [internetJoignable, setInternetJoignable] = useState(false)

  const handleNetworkChange = useCallback((state) => {
    store.dispatch(updateNetworkStatus(state))
    setConnecte(state.isConnected)
    setInternetJoignable(state.isInternetReachable)
  }, [])

  const lancerSynchronisation = () => {

    console.log(`Synchronisation du ${getDate()} en cours...`)
    envoyerContactAjouterAWeb()
    envoyerContactModifierAWeb()

  }

  useEffect(() => {
    const netInfoSubscription = NetInfo.addEventListener(handleNetworkChange)
    return () => {
      netInfoSubscription && netInfoSubscription()
    }
  }, [])

  useEffect(() => {

    if (connecte && internetJoignable) {

      const syncInterval = setInterval(() => {
        lancerSynchronisation()
      }, 15 * 60 * 1000)

      return () => {
        clearInterval(syncInterval)
      }
    }
  }, [connecte, internetJoignable])

  /*return (
    <>
      {connectionStatus ?  
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>

          <Section title={"Connection Status : " + connectionStatus ? 'Connected' : 'Disconnected'}>
          </Section>
          <Section title={"You are connected by " + connectionType}>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
    : <NetworkCheck status={connectionStatus} type={connectionType} /> } 
    </>
  )*/
}

export default NetworkCheck

