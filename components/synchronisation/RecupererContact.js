import axios from 'axios'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import { obtenirAppToken } from '../utils/GestionAppToken'
import { uri } from '../utils/Constant'
import requetes from '../utils/RequeteSql'
import AsyncStorage from '@react-native-async-storage/async-storage'

const db = SQLite.openDatabase(dbLocalName)

const enregistrerContactWebSurMobile = (contacts) => {

    const estInsererSurWeb = 1
    const estMaj = 0

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {

            contacts.forEach((item) => {

                tx.executeSql(requetes.InsererContact,
                    [item.ctt_photo, item.ctt_prenom, item.ctt_nom, item.ctt_prenom_usage, item.ctt_entreprise,
                    item.ctt_fonction, item.ctt_anniversaire, item.ctt_notes, item.ctt_service, item.ctt_siteweb, item.ctt_twitter,
                    item.ctt_linkedin, item.ctt_facebook, item.ctt_skype, item.ctt_etat, item.ctt_favoris, item.util_id, item.ctt_id, estInsererSurWeb, estMaj],
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

export const recupererContactPersoDepuisWeb = async (appToken, tentativeEssai = 3) => {

    try {

        const response = await axios.post(uri.recuperactionContactPersoWeb, {
            suffixBase: 220638,
            utilId: 1700
        }, {
            headers: {
                'Authorization': 'Bearer ' + appToken
            }
        })

        if (response && response.data) {
            await enregistrerContactWebSurMobile(response.data.listContact)
                .then(async () => {
                    await AsyncStorage.setItem('_premierSynchro', 'true')
                })
                .catch((err) => console.warn(err))
        }

    } catch (error) {

        if (tentativeEssai > 0) {

            const nouveauAppToken = obtenirAppToken()
            await recupererContactPersoDepuisWeb(nouveauAppToken, tentativeEssai - 1)

        } else {
            console.log("Une erreur s'est produite lors de la récupération des contacts Pesonnels.", error)
        }

    }
}




