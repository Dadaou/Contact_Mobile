import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import { obtenirAppToken } from '../utils/GestionAppToken'
import { uri } from '../utils/Constant'
import { convertirChaineEnArray, getSuffixBase } from '../utils/utils'
import axios from 'axios'

const maxTentatives = 3

export const envoyerNouveauContactAWeb = async (appToken, tentativeEssai = maxTentatives) => {

    const db = SQLite.openDatabase(dbLocalName)
    const requete = "SELECT (contact.ctt_id) AS ctt_id_mobile, contact.ctt_id_web, contact.ctt_photo, contact.ctt_nom, contact.ctt_prenom, contact.ctt_prenom_usage, contact.ctt_entreprise, contact.ctt_service, contact.ctt_fonction, contact.ctt_anniversaire, contact.ctt_siteweb, contact.ctt_twitter, contact.ctt_linkedin, contact.ctt_facebook, contact.ctt_skype, contact.ctt_notes, contact.ctt_corbeille, contact.ctt_favoris, contact.ctt_etat, contact.util_id, GROUP_CONCAT(DISTINCT mail.ml_mail) AS mail, GROUP_CONCAT(DISTINCT telephone.tel_numero) AS telephone FROM contact LEFT JOIN mail ON mail.ctt_id = contact.ctt_id LEFT JOIN telephone ON telephone.ctt_id = contact.ctt_id WHERE contact.est_insererdansweb = ? GROUP BY contact.ctt_id"
    const suffixBase = await getSuffixBase()

    db.transaction((tx) => {

        tx.executeSql(requete, [0],

            async (txObj, results) => {

                const data = results.rows._array
                const dataAEnvoyer = convertirChaineEnArray(data)

                if (dataAEnvoyer.length !== 0) {

                    try {

                        const response = await axios.post(uri.envoiContactMobileAWeb, {
                            suffixBase: suffixBase,
                            data: JSON.stringify(dataAEnvoyer)
                        }, {
                            headers: {
                                'Authorization': 'Bearer ' + appToken,
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })


                        if (response.data && response.data.code === 1) {

                            const idContactAMarquerCommeEnvoyerAWeb = response.data.data_id
                            const requetePourMajFlag = "UPDATE contact SET ctt_id_web = ?, est_insererdansweb = ? WHERE ctt_id = ?"
                            const est_inserersdansweb = 1

                            db.transaction((tx) => {
                                idContactAMarquerCommeEnvoyerAWeb.forEach((item) => {
                                    tx.executeSql(requetePourMajFlag, [item.ctt_id, est_inserersdansweb, item.ctt_id_mobile])
                                })
                            })
                            //console.log("Envoi ajout done")
                        }

                    } catch (error) {

                        if (tentativeEssai > 0) {

                            const nouveauAppToken = obtenirAppToken()
                            await envoyerNouveauContactAWeb(nouveauAppToken, tentativeEssai - 1)

                        } else {
                            console.log("Une erreur s'est produite lors de l'envoi des contacts nouvellement ajoutés vers contact web.", error)
                        }
                    }

                }
            },
            (txObj, error) => {
                console.log('transaction error', error)
            }
        )
    })
}


export const envoyerContactModifierAWeb = async (appToken, tentativeEssai = maxTentatives) => {

    const db = SQLite.openDatabase(dbLocalName)
    const requete = "SELECT (contact.ctt_id) AS ctt_id_mobile, contact.ctt_id_web, contact.ctt_photo, contact.ctt_nom, contact.ctt_prenom, contact.ctt_prenom_usage, contact.ctt_entreprise, contact.ctt_service, contact.ctt_fonction, contact.ctt_anniversaire, contact.ctt_siteweb, contact.ctt_twitter, contact.ctt_linkedin, contact.ctt_facebook, contact.ctt_skype, contact.ctt_notes, contact.ctt_corbeille, contact.ctt_favoris, contact.ctt_etat, contact.util_id, GROUP_CONCAT(DISTINCT mail.ml_mail) AS mail, GROUP_CONCAT(DISTINCT telephone.tel_numero) AS telephone FROM contact LEFT JOIN mail ON mail.ctt_id = contact.ctt_id LEFT JOIN telephone ON telephone.ctt_id = contact.ctt_id WHERE contact.est_maj = ? GROUP BY contact.ctt_id"
    const suffixBase = await getSuffixBase()

    db.transaction((tx) => {

        tx.executeSql(requete, [1],

            async (txObj, results) => {

                const data = results.rows._array
                const dataAEnvoyer = convertirChaineEnArray(data)

                if (dataAEnvoyer.length !== 0) {

                    try {

                        const response = await axios.post(uri.envoiModificationMobileAWeb, {
                            suffixBase: suffixBase,
                            data: JSON.stringify(dataAEnvoyer)
                        }, {
                            headers: {

                                'Authorization': 'Bearer ' + appToken,
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })

                        if (response.data && response.data.code === 1) {

                            const idContactAReinitialiser = response.data.idContactMobileMaj
                            const requetePourReinitialiserFlag = "UPDATE contact SET est_maj = ? WHERE ctt_id = ?"
                            const est_maj = 0

                            db.transaction((tx) => {
                                idContactAReinitialiser.forEach((item) => {
                                    tx.executeSql(requetePourReinitialiserFlag, [est_maj, item])
                                })
                            })

                            //console.log("Envoi modif done")
                        }

                    } catch (error) {

                        if (tentativeEssai > 0) {

                            const nouveauAppToken = obtenirAppToken()
                            await envoyerContactModifierAWeb(nouveauAppToken, tentativeEssai - 1)

                        } else {
                            console.log("Une erreur s'est produite lors de l'envoi des contacts modifiés vers contact web.", error)
                        }
                    }

                }
            },
            (txObj, error) => {
                console.log('transaction error', error)
            }
        )
    })
}

export const envoyerContactSupprimerAWeb = async (appToken, tentativeEssai = maxTentatives) => {

    const db = SQLite.openDatabase(dbLocalName)
    const requete = "SELECT ctt_id_web FROM contact WHERE est_supprimer = ?"
    const suffixBase = await getSuffixBase()

    db.transaction((tx) => {

        tx.executeSql(requete, [1],

            async (_, results) => {

                const data = results.rows._array

                if (data.length !== 0) {

                    try {

                        const response = await axios.post(uri.envoiContactSupprimerMobileAWeb, {
                            suffixBase: suffixBase,
                            data: JSON.stringify({ listId: data })
                        }, {
                            headers: {

                                'Authorization': 'Bearer ' + appToken,
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })

                        if (response.data && response.data.code === 1) {

                            const requetePourReinitialiserFlag = "UPDATE contact SET est_supprimer = ? WHERE ctt_id_web = ?"
                            const estSupprimer = 0

                            db.transaction((tx) => {
                                data.forEach((item) => {
                                    tx.executeSql(requetePourReinitialiserFlag, [estSupprimer, item.ctt_id_web])
                                })
                            })

                            //console.log("Envoi suppr done")
                        }

                    } catch (error) {

                        if (tentativeEssai > 0) {

                            const nouveauAppToken = obtenirAppToken()
                            await envoyerContactModifierAWeb(nouveauAppToken, tentativeEssai - 1)

                        } else {
                            console.log("Une erreur s'est produite lors de l'envoi des contacts supprimés vers contact web.", error)
                        }
                    }

                }
            },
            (_, error) => {
                console.log('transaction error', error)
            }
        )
    })
}
