
import { useCallback } from 'react'
import { WebView } from "react-native-webview"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { store } from '../redux/dataStore'
import { manageLogin, manageUserToken } from '../redux/action/globalDataAction'

const Authentification = () => {

    const identificationURI = 'http://pp-compte.manao.eu/index.php/AuthentificationMobile'
    const recuperationInfo = 'http://pp-compte.manao.eu/index.php/WSSession/verifierTicket/'

    const getError = useCallback((error) => {
    }, [])

    const saveToken = useCallback(async (token) => {

        if (token) {

            try {

                await AsyncStorage.setItem('_token', token)
                store.dispatch(manageUserToken(token))
                store.dispatch(manageLogin(true))

            } catch (error) { console.log(error) }
        }

    }, [])

    return (

        <>

            <WebView
                //userAgent="ios"
                originWhitelist={['*']}
                onError={getError}
                source={{ uri: identificationURI }}
                style={{ flex: 1, marginTop: Constants.statusBarHeight }}
                bounces={false}
                onLoadStart={({ nativeEvent }) => {

                    const authentifier = nativeEvent.url.match("msauth")

                    if (authentifier) {

                        const tokenIndex = nativeEvent.url.indexOf('auth/')
                        let token = nativeEvent.url.substring(tokenIndex + 5)
                        //console.log(token)
                        saveToken(token)
                        return

                    }
                }} />

        </>
    )
}


export default Authentification