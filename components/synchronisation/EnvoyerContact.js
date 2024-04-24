import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import { extractAppTokenFromLocalStorage, obtenirAppToken } from '../utils/GestionAppToken'
import axios from 'axios'

const envoyerContact = async () => {

    const db = SQLite.openDatabase(dbLocalName)
    const requete = "SELECT contact.*, GROUP_CONCAT(DISTINCT mail.ml_mail) AS ml_mail, GROUP_CONCAT(DISTINCT telephone.tel_numero) AS tel_numero FROM contact LEFT JOIN mail ON mail.ctt_id = contact.ctt_id LEFT JOIN telephone ON telephone.ctt_id = contact.ctt_id WHERE contact.synchronise = ? GROUP BY contact.ctt_id"

    db.transaction((tx) => {

        tx.executeSql(requete, [0],

            async (txObj, results) => {

                const dataToSend = results.rows._array

                try {

                    const response = await axios.post('http://192.168.9.179:8088/index.php/v1/addMultiple', {
                        suffixBase : 220664,
                        data : JSON.stringify(dataToSend)
                    })

                    if (response.data) {
                        console.log(response.data)
                    }

                } catch (error) {
                    console.log(error)
                }
            },
            (txObj, error) => {
                console.log('transaction error', error)
            }
        )
    })
};

export default envoyerContact