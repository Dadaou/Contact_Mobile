
import { useCallback } from 'react'
import { StatusBar, View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import { WebView } from "react-native-webview"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { store } from '../redux/dataStore'
import { manageLogin, manageUserToken } from '../redux/action/globalDataAction'
import axios from 'axios'

const Authentification = () => {

    const identificationURI = 'http://pp-compte.manao.eu/index.php/AuthentificationMobile'
    const recuperationInfoURI = 'http://pp-compte.manao.eu/index.php/WSSession/verifierTicket/'

    const {height, width} = useWindowDimensions()

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

    const recupererInfoUtilisateur = useCallback(async (token) => {
        try {
            const infoUtilisateur = await axios.get(recuperationInfoURI + token)
            if (infoUtilisateur && infoUtilisateur.data) {
                await AsyncStorage.setItem('_infoUtilisateur', JSON.stringify(infoUtilisateur.data.data.utilisateur))
            }
        }
        catch (error) {
            throw error
        }

    }, [])


    return (

        <>
            <StatusBar barStyle="dark-content" backgroundColor="#D1D0CE" />

            <WebView
                //userAgent="ios"
                renderError={() =>
                    <View style={{...styles.renderError, height : height, width : width}}> 
                    </View>
                }
                originWhitelist={['*']}
                onError={getError}
                source={{ uri: identificationURI }}
                bounces={false}
                onLoadStart={({ nativeEvent }) => {

                    const authentifier = nativeEvent.url.match("msauth")
                    //console.log({ source: nativeEvent.url })
                    if (authentifier) {

                        const tokenIndex = nativeEvent.url.indexOf('auth/')
                        let token = nativeEvent.url.substring(tokenIndex + 5)
                        saveToken(token)
                        recupererInfoUtilisateur(token)
                        return

                    }
                }} />

        </>
    )
}


const styles = StyleSheet.create({

    renderError : {

        flex : 1, 
        top : 0,
        backgroundColor : "#fff", 
        position : "absolute", 
        justifyContent : "center", 
        alignItems : "center"
    }

})



export default Authentification