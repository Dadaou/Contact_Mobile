import { useState, useEffect, useCallback } from 'react';
import NetInfo from "@react-native-community/netinfo"
import { store } from '../redux/dataStore'
import { extractAppTokenFromLocalStorage } from '../utils/GestionAppToken'
import { updateNetworkStatus } from '../redux/action/globalDataAction'
import { envoyerContactModifierAWeb, envoyerNouveauContactAWeb } from './EnvoyerContact'
import { recupererContactMajDepuisWeb, recupererContactDepuisWeb } from './RecupererContact'
import { getDate } from '../utils/utils'

const Synchronisation = () => {

  const [connecte, setConnecte] = useState(false)
  const [internetJoignable, setInternetJoignable] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  store.subscribe(() => {
    setIsLogin(store.getState().globalReducer.isLogin)
  })

  const handleNetworkChange = useCallback((state) => {
    store.dispatch(updateNetworkStatus(state))
    setConnecte(state.isConnected)
    setInternetJoignable(state.isInternetReachable)
  }, [])

  const lancerSynchronisation = useCallback(async () => {

    console.log(`Synchronisation du ${getDate()} en cours...`)
    const appToken = await extractAppTokenFromLocalStorage()
    await Promise.all([
      envoyerNouveauContactAWeb(appToken),
      envoyerContactModifierAWeb(appToken),
      recupererContactDepuisWeb(appToken),
      recupererContactMajDepuisWeb(appToken),
    ])

  }, [])

  useEffect(() => {
    const netInfoSubscription = NetInfo.addEventListener(handleNetworkChange)
    return () => {
      netInfoSubscription && netInfoSubscription()
    }
  }, [])

  useEffect(() => {

    if (isLogin && connecte && internetJoignable) {

      const syncInterval = setInterval(() => {
        lancerSynchronisation()
      }, 30000/*5 * 60 * 1000*/)

      return () => {
        clearInterval(syncInterval)
      }
    }
  }, [isLogin, connecte, internetJoignable])

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

export default Synchronisation

