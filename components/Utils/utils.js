import { listPays } from "./IsoCode"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { parsePhoneNumber } from "awesome-phonenumber"

export const genererID = () => {
    return 'xxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

export const getIsoCode = (isoCode) => {

    for (const pays of listPays) {
        if (pays.iso === isoCode) {
            return pays.iso
        }
    }
    return null
}


export const convertirChaineEnArray = (data) => {

    return data.map(item => {

        const telephones = item.telephone === null || item.telephone === "" ? [""] : item.telephone.split(",")
        const mails = item.mail === null || item.mail === "" ? [""] : item.mail.split(",")

        return {
            ...item,
            telephone: telephones,
            mail: mails,
        }
    })
}


export const getDateTime = () => {

    let date = new Date()
    let jour = date.getDate()
    let mois = date.getMonth() + 1
    let annee = date.getFullYear()
    let heure = date.getHours() - 1
    let minute = date.getMinutes()
    let seconde = date.getSeconds()

    let dateEtHeure = annee + '-' + mois + '-' + jour + ' ' + heure + ':' + minute + ':' + seconde
    return dateEtHeure

}

export const getformatedDateTime = () => {

    let date = new Date()
    let jour = date.getDate()
    let mois = date.getMonth() + 1
    let annee = date.getFullYear()
    let heure = date.getHours()
    let minute = date.getMinutes()

    return {
        formatedDate: jour + '/' + mois + '/' + annee,
        time: heure + 'h' + minute + 'm'
    }
}


export const getListContact = (db, requete, valeur = null) => {

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {

            tx.executeSql(requete, valeur,

                (_, resultSet) => {
                    resolve(resultSet.rows)
                },
                (_, error) => reject(error)
            )

        })
    })
}

export const getUtilId = async () => {

    const utilId = JSON.parse(await AsyncStorage.getItem('_infoUtilisateur')).util_id
    return utilId
}


export const getSuffixBase = async () => {

    const suffixBase = JSON.parse(await AsyncStorage.getItem('_infoUtilisateur')).pfm_numero
    return suffixBase
}

export const verifierNumeroTelephone = (numeroTelephone) => {

    let numeroTelephoneParser = ""

    if (numeroTelephone.startsWith("+")) {
        numeroTelephoneParser = parsePhoneNumber(numeroTelephone)
        return numeroTelephoneParser.number.international
    }
    else if (numeroTelephone.startsWith("00")) {

        numeroTelephoneParser = parsePhoneNumber(numeroTelephone.replace(/00/g, "+"))
        return numeroTelephoneParser.number.international
    }

    else {

        if (numeroTelephone.startsWith("0") || numeroTelephone.startsWith("(0)")) {

            const deuxCaracteres = numeroTelephone.substring(1, 3)

            if (["32", "33", "34", "38"].includes(deuxCaracteres)) {

                let numeroMalagasy = "+261 " + numeroTelephone.substring(1)
                numeroTelephoneParser = parsePhoneNumber(numeroMalagasy)
                //console.log(numeroTelephoneParser.number.international)
                return numeroTelephoneParser.number.international
            }


            else {
                numeroTelephoneParser = parsePhoneNumber("+33" + numeroTelephone)
                return numeroTelephoneParser.number.international
            }

        }

        else {

            numeroTelephoneParser = "+" + numeroTelephone
            return numeroTelephoneParser
        }
    }

}
