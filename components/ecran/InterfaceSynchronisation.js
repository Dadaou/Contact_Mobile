import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from "react-native"
import LottieView from "lottie-react-native"
import CustomAlert from '../modal/CustomAlert'
import { extractAppTokenFromLocalStorage, obtenirAppToken } from '../utils/GestionAppToken'
import * as SQLite from 'expo-sqlite'
import axios from 'axios'
import { dbLocalName } from '../utils/Constant'
import requetes from '../utils/RequeteSql'
const Animation = ({ navigation }) => {

    const db = SQLite.openDatabase(dbLocalName)
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [msgErreur, setMsgErreur] = useState('')
    //const navigation = useNavigation()

    const redirection = (afficherMsg) => {
        navigation.navigate('Accueil', { showModal: afficherMsg })
    }

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

            setLoading(false)
            setMsgErreur("Une erreur de conflit entre identifiant de contacts est survenue.")
            //console.error('Error while saving contact information:', error)
        }
    }

    const recupererInfoContactDepuisWeb = async (appToken, tentativeEssai = 3) => {

        setLoading(true)
        try {

            const response = await axios.post('http://192.168.9.179:8088/index.php/v1/obtenirContactsParUtilisateur', {
                suffixBase: 220638,
                utilId: 1700
            }, {
                headers: {
                    'Authorization': 'Bearer ' + appToken
                }
            })

            if(response.data) {

                await enregistrerInfoContactDepuisWeb(response.data.contacts, response.data.telephones, response.data.mails)
                setLoading(false)
                redirection(true)
                console.log('Les informations sur les contacts ont été enregistrées avec succès.')
            }


        } catch (error) {

            if (tentativeEssai > 0) {
                const nouveauAppToken = obtenirAppToken()
                await recupererInfoContactDepuisWeb(nouveauAppToken, tentativeEssai - 1)
            } else {
                setLoading(false)
                setModalVisible(true)
                setMsgErreur("Une erreur s'est produite lors de la récupération des contacts.");
                redirection(false)
            }
        }
    };
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                const appToken = await extractAppTokenFromLocalStorage()
                await recupererInfoContactDepuisWeb(appToken)
            } catch (error) {
                console.error("Erreur lors de la récupération du token :", error)
            }
        });
        return unsubscribe
    }, [navigation])

    return (

        <>

            <View style={[StyleSheet.absoluteFillObject, styles.container]}>
                <LottieView
                    source={require("../../assets/Animation.json")}
                    autoPlay={loading}
                    loop={loading} />
            </View>

            <CustomAlert
                isVisible={modalVisible}
                onVisible={setModalVisible}
                msg={msgErreur}
                actionBouton={() => navigation.navigate('Accueil')} />
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        justifyContent: "center",
        alignContent: "center"
    }
})

export default Animation