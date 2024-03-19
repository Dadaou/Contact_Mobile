import { useState, useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo"
import { store } from '../redux/dataStore'
import { updateNetworkStatus } from '../redux/action/globalDataAction'

const NetworkCheck = () => {

  const [connectionStatus, setConnectionStatus] = useState(false)
  const [connectionType, setConnectionType] = useState(null)


  const handleNetworkChange = (state) => {
    store.dispatch(updateNetworkStatus(state))
    //store.subscribe(() => console.log("Eto ", store.getState().globalReducer.networkInfo))
    //console.log(state)
    setConnectionStatus(state.isConnected)
    setConnectionType(state.type)
  }

  
  useEffect(() => {
    const netInfoSubscription = NetInfo.addEventListener(handleNetworkChange)
    return () => {
      netInfoSubscription && netInfoSubscription()
    }
  }, [])


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

