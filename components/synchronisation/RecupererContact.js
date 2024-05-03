import axios from 'axios'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import { obtenirAppToken } from '../utils/GestionAppToken'
import requetes from '../utils/RequeteSql'

const db = SQLite.openDatabase(dbLocalName)

const enregistrerContactWebSurMobile = (contacts) => {


    db.transaction((tx) => {

        contacts.forEach((item) => {

            tx.executeSql(requetes.InsererContact,
                [item.ctt_photo, item.ctt_prenom, item.ctt_nom, item.ctt_prenom_usage, item.ctt_entreprise,
                item.ctt_fonction, item.ctt_anniversaire, item.ctt_notes, item.ctt_service, item.ctt_siteweb, item.ctt_twitter,
                item.ctt_linkedin, item.ctt_facebook, item.ctt_skype, item.ctt_etat, item.ctt_favoris, item.util_id, 1],
                (txObj, resultSet) => {
                    if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
                        enregistrerNumeroTelephoneWebSurMobile(item.telephone, resultSet.insertId, item.util_id)
                        enregistrerMailWebSurMobile(item.mail, resultSet.insertId, item.util_id)
                    }
                },
                (txObj, error) => {
                    console.log(error)
                }
            )
        })
    })

}

const enregistrerNumeroTelephoneWebSurMobile = (telephones, idContact, utilId) => {

    let telephoneArray = telephones === null ? [""] : telephones.split(", ")
    db.transaction((tx) => {
        telephoneArray.forEach((telNumero) => {
            tx.executeSql(requetes.InsererTelephone, [telNumero, "", idContact, utilId])
        })
    })

}

const enregistrerMailWebSurMobile = (mails, idContact) => {

    let mailArray = mails === null ? [""] : mails.split(", ")
    db.transaction((tx) => {
        mailArray.forEach((mail) => {
            tx.executeSql(requetes.InsererMail, [mail, "", idContact])
        })
    })
}

export const recupererInfoContactDepuisWeb = async (appToken, tentativeEssai = 3) => {

    try {

        const response = await axios.post(/*'http://pp-api-contacts.manao.eu/index.php/v1/obtenirContactsParUtilisateur'*/'http://192.168.9.179:8088/index.php/v1/obtenirContactsParUtilisateur', {
            suffixBase: 220638,
            utilId: 1700
        }, {
            headers: {
                'Authorization': 'Bearer ' + appToken
            }
        })

        if (response && response.data) {
            enregistrerContactWebSurMobile(response.data.contacts)
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




