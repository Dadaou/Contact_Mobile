import { useState } from 'react'
import axios from 'axios'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import { obtenirAppToken, extractAppTokenFromLocalStorage } from '../utils/GestionAppToken'
import { uri } from '../utils/Constant'
import { getDate } from '../utils/utils'
import requetes from '../utils/RequeteSql'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { store } from '../redux/dataStore'

const db = SQLite.openDatabase(dbLocalName)

const suffixBase = 220638
const utilId = 1700
const maxTentatives = 3
const date = getDate()


const enregistrerNumeroTelephoneWebSurMobile = (telephones, idContact, utilId, idContactEnWeb) => {

    let telephoneArray = telephones === null ? [""] : telephones.split(", ")
    db.transaction((tx) => {
        telephoneArray.forEach((telNumero) => {
            tx.executeSql(requetes.InsererTelephone, [telNumero, "", idContact, utilId, idContactEnWeb])
        })
    })
}

const enregistrerMailWebSurMobile = (mails, idContact, utilId, idContactEnWeb) => {

    let mailArray = mails === null ? [""] : mails.split(", ")
    db.transaction((tx) => {
        mailArray.forEach((mail) => {
            tx.executeSql(requetes.InsererMail, [mail, "", idContact, utilId, idContactEnWeb])
        })
    })
}

const enregistrerContactWebSurMobile = (contacts) => {

    const estInsererSurWeb = 1
    const estMaj = 0

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {

            contacts.forEach((item) => {

                tx.executeSql(requetes.InsererContact,
                    [item.ctt_photo, item.ctt_prenom, item.ctt_nom, item.ctt_prenom_usage, item.ctt_entreprise,
                    item.ctt_fonction, item.ctt_anniversaire, item.ctt_notes, item.ctt_service, item.ctt_siteweb, item.ctt_twitter,
                    item.ctt_linkedin, item.ctt_facebook, item.ctt_skype, item.ctt_etat, item.ctt_favoris, item.util_id, item.ctt_id, item.src_id, estInsererSurWeb, estMaj],
                    (txObj, resultSet) => {
                        if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
                            enregistrerNumeroTelephoneWebSurMobile(item.telephone, resultSet.insertId, item.util_id, item.ctt_id)
                            enregistrerMailWebSurMobile(item.mail, resultSet.insertId, item.util_id, item.ctt_id)
                            resolve()
                        }
                    },

                    (txObj, error) => {
                        reject(error)
                    }
                )
            })
        })

    })

}


const appliquerMajWebDansMobile = (contacts) => {

    const requete = "SELECT ctt_id AS ctt_id_mobile FROM contact WHERE ctt_id_web = ?"

    db.transaction((tx) => {

        contacts.forEach((item) => {

            tx.executeSql(requete, [item.ctt_id],

                (txObj, resultSet) => {

                    if (resultSet.rows._array.length !== 0) {

                        let idContactMobile = resultSet.rows._array[0].ctt_id_mobile

                        tx.executeSql(requetes.SupprTelephone, [idContactMobile])
                        tx.executeSql(requetes.SupprMail, [idContactMobile])

                        tx.executeSql(requetes.MajContact,
                            [item.ctt_photo, item.ctt_prenom, item.ctt_nom, item.ctt_prenom_usage, item.ctt_entreprise,
                            item.ctt_service, item.ctt_fonction, item.ctt_anniversaire, item.ctt_siteweb, item.ctt_twitter,
                            item.ctt_linkedin, item.ctt_facebook, item.ctt_skype, item.ctt_notes, item.ctt_etat, 0, idContactMobile],
                            async (txObj, resultSet) => {
                                if (resultSet.rowsAffected !== 0) {
                                    enregistrerNumeroTelephoneWebSurMobile(item.telephone, idContactMobile, item.util_id, item.ctt_id)
                                    enregistrerMailWebSurMobile(item.mail, idContactMobile, item.util_id, item.ctt_id)
                                    await AsyncStorage.setItem('_dateSynchronisation', date)
                                }
                            },

                            (txObj, error) => {
                                console.error(error)
                            }
                        )

                    }
                },

                (txObj, error) => {
                    console.error(error)
                })
        })

    })

}


const recupererContactPersoDepuisWeb = async (appToken, tentativeEssai = maxTentatives) => {

    try {

        const response = await axios.post(uri.recuperationContactPersoWeb, {
            suffixBase: suffixBase,
            utilId: utilId
        }, {
            headers: {
                'Authorization': 'Bearer ' + appToken
            }
        })

        if (response && response.data) {
            await enregistrerContactWebSurMobile(response.data.listContact)
            //await AsyncStorage.setItem('_premierSynchro', 'true')
        }

    } catch (error) {

        if (tentativeEssai > 0) {

            const nouveauAppToken = obtenirAppToken()
            await recupererContactPersoDepuisWeb(nouveauAppToken, tentativeEssai - 1)

        } else {
            console.log("Une erreur s'est produite lors de la récupération des contacts modifiés.", error)
        }

    }
}


export const recupererContactMajDepuisWeb = async (appToken, tentativeEssai = maxTentatives) => {

    const dateSynchronisation = await AsyncStorage.getItem('_dateSynchronisation')

    try {

        const response = await axios.post(uri.recuperationContactMaj, {
            suffixBase: suffixBase,
            utilId: utilId,
            dateTime: dateSynchronisation
        }, {
            headers: {
                'Authorization': 'Bearer ' + appToken
            }
        })

        if (response && response.data && response.data.length !== 0) {
            appliquerMajWebDansMobile(response.data)
        }

    } catch (error) {

        if (tentativeEssai > 0) {

            const nouveauAppToken = obtenirAppToken()
            await recupererContactMajDepuisWeb(nouveauAppToken, tentativeEssai - 1)

        } else {
            console.log("Une erreur s'est produite lors de la récupération des contacts mofifiés.", error)
        }

    }
}

const recupererContactPlateformeDepuisWeb = async (appToken, tentativeEssai = maxTentatives) => {

    try {

        const response = await axios.post(uri.recuperationContactPlateforme, {
            suffixBase: suffixBase,
            utilId: utilId
        }, {
            headers: {
                'Authorization': 'Bearer ' + appToken
            }
        })

        if (response && response.data) {
            await enregistrerContactWebSurMobile(response.data.contacts)
            //await AsyncStorage.setItem('_premierSynchro', 'true')
        }

    } catch (error) {

        if (tentativeEssai > 0) {

            const nouveauAppToken = obtenirAppToken()
            await recupererContactPlateformeDepuisWeb(nouveauAppToken, tentativeEssai - 1)

        } else {
            console.log("Une erreur s'est produite lors de la récupération des contacts Plateforme.", error)
        }

    }
}

export const recupererContactDepuisWeb = async () => {

    try {

        const appToken = extractAppTokenFromLocalStorage()
        await Promise.all([
            recupererContactPersoDepuisWeb(appToken),
            //recupererContactPlateformeDepuisWeb(appToken)
        ])
        await AsyncStorage.setItem('_premierSynchro', 'true')
        await AsyncStorage.setItem('_dateSynchronisation', date)

    } catch (error) {
        console.error(error)
    }
}






