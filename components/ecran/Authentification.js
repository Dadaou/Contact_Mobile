
import { useCallback, useState } from 'react'
import { StatusBar, View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import { WebView } from "react-native-webview"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { store } from '../redux/dataStore'
import { manageLogin, manageUserToken, manageUserInfo } from '../redux/action/globalDataAction'
import { uri } from '../utils/Constant'
import axios from 'axios'
import LottieView from "lottie-react-native"
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import requetes from '../utils/RequeteSql'


const Authentification = () => {

    const { height, width } = useWindowDimensions()
    const db = SQLite.openDatabase(dbLocalName)
    const [loading, setLoading] = useState(true)

    const creerTableContact = useCallback(() => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {
                tx.executeSql(requetes.CreerTableContact)
                tx.executeSql(requetes.CreerTableTelephone)
                tx.executeSql(requetes.CreerTableMail)
                tx.executeSql(requetes.CreerTableAdresse)
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

    const getError = useCallback((error) => {
    }, [])

    const saveToken = useCallback(async (token) => {

        await AsyncStorage.setItem('_tokenUtilisateur', token)
        store.dispatch(manageUserToken(token))
        store.dispatch(manageLogin(true))

    }, [])

    const recupererInfoUtilisateur = useCallback(async (token = "") => {
        try {
            const infoUtilisateur = await axios.get(uri.recuperationInfoUtilisateur + token)

            if (infoUtilisateur && infoUtilisateur.data) {
                await AsyncStorage.setItem('_infoUtilisateur', JSON.stringify(infoUtilisateur.data.data.utilisateur))
                await creerTableContact()
                store.dispatch(manageUserInfo(infoUtilisateur.data.data.utilisateur))
                saveToken(token)
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
                    <View style={{ ...styles.renderError, height: height, width: width }}>
                        <LottieView
                            source={require("../../assets/Animation.json")}
                            autoPlay={loading}
                            loop={loading} />
                    </View>
                }
                originWhitelist={['*']}
                onError={getError}
                source={{ uri: uri.identification }}
                bounces={false}
                onLoadStart={({ nativeEvent }) => {

                    const authentifier = nativeEvent.url.match("msauth")
                    //console.log({ source: nativeEvent.url })
                    if (authentifier) {

                        const tokenIndex = nativeEvent.url.indexOf('auth/')
                        let token = nativeEvent.url.substring(tokenIndex + 5)
                        recupererInfoUtilisateur(token)
                        setLoading(false)
                        return

                    }
                }} />

        </>
    )
}


const styles = StyleSheet.create({

    renderError: {

        flex: 1,
        top: 0,
        backgroundColor: "#fff",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center"
    }

})



export default Authentification