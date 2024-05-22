import axios from "axios"
import { infoApp, uri } from "./Constant"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const extractAppTokenFromLocalStorage = async () => {

    try {
        const appToken = await AsyncStorage.getItem('_appToken')
        if (appToken !== null) {
            return appToken
        } else {
            return obtenirAppToken()
        }
    } catch (error) {
        console.log("Erreur lors de l'extraction du token", error)
        throw error
    }
}

export const obtenirAppToken = async () => {

    try {
        const res = await axios.post(uri.appToken, infoApp)
        if (res.data.token) {
            await AsyncStorage.setItem('_appToken', res.data.token)
            return res.data.token
        } else {
            console.log("Token non reçu")
        }
    } catch (error) {
        console.log("Erreur lors de l'obtention du token", error)
        throw error
    }
}