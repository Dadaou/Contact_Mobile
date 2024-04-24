import axios from 'axios'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import { obtenirAppToken } from '../utils/GestionAppToken'
import requetes from '../utils/RequeteSql'

const db = SQLite.openDatabase(dbLocalName)

const enregistrerContactWebSurMobile = (contacts) => {

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {

            contacts.forEach((item) => {

                tx.executeSql(requetes.InsererContact,
                    [item.ctt_id, item.ctt_photo, item.ctt_prenom, item.ctt_nom, item.ctt_prenom_usage, item.ctt_entreprise,
                    item.ctt_fonction, item.ctt_anniversaire, item.ctt_notes, item.ctt_service, item.ctt_siteweb, item.ctt_twitter,
                    item.ctt_linkedin, item.ctt_facebook, item.ctt_skype, item.ctt_etat, item.ctt_favoris],
                    (txObj, resultSet) => {
                        if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
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

const enregistrerNumeroTelephoneWebSurMobile = (telephones) => {

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {

            telephones.forEach((item) => {

                tx.executeSql(requetes.InsererTelephone,
                    [item.tel_numero, "33", item.tel_libelle, item.ctt_id],
                    (txObj, resultSet) => {
                        if (resultSet.rowsAffected !== 0) {
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

const enregistrerMailWebSurMobile = (mails) => {

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {
            mails.forEach((item) => {
                tx.executeSql(requetes.InsererMail,
                    [item.ml_mail, item.ml_libelle, item.ctt_id],
                    (txObj, resultSet) => {
                        if (resultSet.rowsAffected !== 0) {
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

const enregistrerInfoContactDepuisWeb = async (contacts, telephones, mails) => {

    try {
        await Promise.all([
            enregistrerContactWebSurMobile(contacts),
            enregistrerNumeroTelephoneWebSurMobile(telephones),
            enregistrerMailWebSurMobile(mails)
        ])
    } catch (error) {

        console.log(error)
    }
}

export const recupererInfoContactDepuisWeb = async (appToken, tentativeEssai = 3) => {


    try {

        const response = await axios.post('http://pp-api-contacts.manao.eu/index.php/v1/obtenirContactsParUtilisateur', {
            suffixBase: 220664,
            utilId: 852
        }, {
            headers: {
                'Authorization': 'Bearer ' + appToken
            }
        })

        if (response && response.data) {

            const { contacts, telephones, mails } = response.data
            await enregistrerInfoContactDepuisWeb(contacts, telephones, mails)

        } else {
            console.log('Une erreur s est produite lors de la récupération des contacts....');
        }

    } catch (error) {

       if (tentativeEssai > 0) {

            const nouveauAppToken = obtenirAppToken();
            await recupererInfoContactDepuisWeb(nouveauAppToken, tentativeEssai - 1)

        } else {
            console.log("Une erreur s'est produite lors de la récupération des contacts.", error)
        }

        console.log("Error", error)
    }
}




