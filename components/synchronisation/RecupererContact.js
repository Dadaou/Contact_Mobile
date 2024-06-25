import axios from 'axios'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import { obtenirAppToken } from '../utils/GestionAppToken'
import { uri } from '../utils/Constant'
import { getDateTime, getUtilId, getSuffixBase } from '../utils/utils'
import requetes from '../utils/RequeteSql'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { verifierNumeroTelephone } from '../utils/utils'


const db = SQLite.openDatabase(dbLocalName)
const maxTentatives = 3
const date = getDateTime()

const enregistrerNumeroTelephoneWebSurMobile = (telephones, idContact, utilId, idContactEnWeb) => {

    return new Promise((resolve, reject) => {

        let telephoneArray = telephones === null ? [""] : telephones.split(", ")

        db.transaction((tx) => {

            if (telephoneArray.length !== 0) {

                telephoneArray.forEach((telNumero) => {

                    const numeroTelephoneVerifier = telNumero === "" ? "" : verifierNumeroTelephone(telNumero)

                    tx.executeSql(requetes.InsererTelephone, [numeroTelephoneVerifier, "", idContact, utilId, idContactEnWeb],
                        (_, resultSet) => {
                            if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
                                resolve()
                            }
                        },

                        (_, error) => {
                            reject(error)
                        }
                    )
                })

            }
        })

        resolve()

    })


}

const enregistrerMailWebSurMobile = (mails, idContact, utilId, idContactEnWeb) => {

    return new Promise((resolve, reject) => {

        let mailArray = mails === null ? [""] : mails.split(", ")

        db.transaction((tx) => {

            if (mailArray.length !== 0) {

                mailArray.forEach((mail) => {

                    tx.executeSql(requetes.InsererMail, [mail, "", idContact, utilId, idContactEnWeb],
                        (_, resultSet) => {
                            if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
                                resolve()
                            }
                        },

                        (_, error) => {
                            reject(error)
                        }
                    )
                })

            }
        })

        resolve()

    })


}

const enregistrerContactWebSurMobile = (contacts) => {

    const estInsererSurWeb = 1
    const estMaj = 0
    const requete = "SELECT ctt_id FROM contact WHERE ctt_id_web = ?"

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {

            if (contacts.length !== 0) {

                contacts.forEach((item) => {

                    tx.executeSql(requete, [item.ctt_id],

                        (txObj, resultSet) => {

                            //console.log({ result: resultSet.rows._array })

                            if (resultSet.rows._array.length === 0) {

                                tx.executeSql(requetes.InsererContact,

                                    [null/*item.ctt_photo*/, item.ctt_prenom, item.ctt_nom, item.ctt_prenom_usage, item.ctt_entreprise,
                                        item.ctt_fonction, item.ctt_anniversaire, item.ctt_notes, item.ctt_service, item.ctt_siteweb, item.ctt_twitter,
                                        item.ctt_linkedin, item.ctt_facebook, item.ctt_skype, item.ctt_etat, item.ctt_favoris, item.util_id, item.ctt_id, item.src_id, item.ctt_corbeille, estInsererSurWeb, estMaj],

                                    async (_, resultSet) => {

                                        if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
                                            await enregistrerNumeroTelephoneWebSurMobile(item.telephone, resultSet.insertId, item.util_id, item.ctt_id)
                                            await enregistrerMailWebSurMobile(item.mail, resultSet.insertId, item.util_id, item.ctt_id)
                                        }
                                    },

                                    (_, error) => {
                                        reject(error)
                                    }
                                )
                            }
                        },

                        (txObj, error) => {
                            reject(error)
                        }
                    )

                })

            }

            resolve()
        })

    })

}


const appliquerMajWebDansMobile = (contacts) => {

    const requete = "SELECT ctt_id AS ctt_id_mobile FROM contact WHERE ctt_id_web = ?"

    db.transaction((tx) => {

        if (contacts.length !== 0) {

            contacts.forEach((item) => {

                tx.executeSql(requete, [item.ctt_id],

                    (txObj, resultSet) => {

                        if (resultSet.rows._array.length !== 0) {

                            let idContactMobile = resultSet.rows._array[0].ctt_id_mobile

                            tx.executeSql(requetes.SupprTelephone, [idContactMobile])
                            tx.executeSql(requetes.SupprMail, [idContactMobile])

                            tx.executeSql(requetes.MajContact,
                                [null/*item.ctt_photo*/, item.ctt_nom, item.ctt_prenom, item.ctt_prenom_usage, item.ctt_entreprise,
                                    item.ctt_service, item.ctt_fonction, item.ctt_anniversaire, item.ctt_siteweb, item.ctt_twitter,
                                    item.ctt_linkedin, item.ctt_facebook, item.ctt_skype, item.ctt_notes, item.ctt_etat, 0, idContactMobile],
                                async (txObj, resultSet) => {
                                    if (resultSet.rowsAffected !== 0) {
                                        enregistrerNumeroTelephoneWebSurMobile(item.telephone, idContactMobile, item.util_id, item.ctt_id)
                                        enregistrerMailWebSurMobile(item.mail, idContactMobile, item.util_id, item.ctt_id)
                                        await AsyncStorage.setItem('_datePremierSynchronisation', date)
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

        }

    })

}


export const recupererContactMajDepuisWeb = async (appToken, tentativeEssai = maxTentatives) => {

    const dateSynchronisation = await AsyncStorage.getItem('_datePremierSynchronisation')
    const utilId = await getUtilId()
    const suffixBase = await getSuffixBase()

    try {

        const response = await axios.post(uri.recuperationContactMaj, {
            suffixBase: suffixBase,
            utilId: utilId,
            dateTime: dateSynchronisation
        }, {
            headers: {
                'Authorization': 'Bearer ' + appToken,
                'Content-Type': 'application/x-www-form-urlencoded'
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


export const recupererContactPersoDepuisWeb = async (appToken, tentativeEssai = maxTentatives) => {

    const utilId = await getUtilId()
    const suffixBase = await getSuffixBase()

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
        }

    } catch (error) {

        console.log(error.message)

        if (tentativeEssai > 0) {

            const nouveauAppToken = obtenirAppToken()
            await recupererContactPersoDepuisWeb(nouveauAppToken, tentativeEssai - 1)

        } else {
            console.log("Une erreur s'est produite lors de la récupération des contacts Perso.", error.message)
        }

    }
}

export const recupererContactPlateformeDepuisWeb = async (appToken, tentativeEssai = maxTentatives) => {

    const utilId = await getUtilId()
    const suffixBase = await getSuffixBase()

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

/*export const recupererContactDepuisWeb = async (appToken) => {

    try {

        await recupererContactPlateformeDepuisWeb(appToken)
        await recupererContactPersoDepuisWeb(appToken)

        await AsyncStorage.setItem('_premierSynchro', 'true')
        await AsyncStorage.setItem('_datePremierSynchronisation', date)

    } catch (error) {
        console.error(error)
    }
}*/






