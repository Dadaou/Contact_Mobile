import React, { useState, useEffect } from 'react'
import { View, FlatList, Alert } from "react-native"
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../../Utils/constant'
import { store } from '../redux/dataStore'
import { updateNombreContact } from '../redux/action/globalDataAction'
import ListView from './ListView'
import axios from 'axios'
import SpinnerModal from '../Modal/Spinner'
import requetes from '../../Utils/RequeteSql'
import AsyncStorage from '@react-native-async-storage/async-storage'


const ListContact = React.memo(() => {

    const navigation = useNavigation()

    const reqCreationTableContact = "CREATE TABLE IF NOT EXISTS contact (ctt_id TEXT PRIMARY KEY, ctt_photo TEXT, ctt_nom TEXT, ctt_prenom TEXT, ctt_prenom_usage TEXT, ctt_entreprise TEXT, ctt_service TEXT, ctt_fonction TEXT, ctt_anniversaire DATE, ctt_siteweb TEXT, ctt_twitter TEXT, ctt_linkedin TEXT, ctt_facebook TEXT, ctt_skype TEXT, ctt_notes TEXT, ctt_corbeille INTEGER, ctt_favoris INTEGER, ctt_etat INTEGER, util_id TEXT)"
    const reqCreationTableTelephone = "CREATE TABLE IF NOT EXISTS telephone (tel_id INTEGER PRIMARY KEY AUTOINCREMENT, tel_numero TEXT, tel_code_pays TEXT, tel_libelle TEXT, ctt_id INTEGER, util_id TEXT, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))"
    const reqCreationTableMail = "CREATE TABLE IF NOT EXISTS mail (ml_id INTEGER PRIMARY KEY AUTOINCREMENT, ml_mail TEXT, ml_libelle TEXT, ctt_id INTEGER, util_id TEXT, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))"
    const reqCreationTableAdresse = "CREATE TABLE IF NOT EXISTS adresse (addr_id INTEGER PRIMARY KEY AUTOINCREMENT, addr_ligne1 TEXT, addr_ligne2 TEXT, addr_ligne3 TEXT, addr_ville TEXT, addr_pays TEXT, addr_bp TEXT, addr_cp TEXT, addr_libelle TEXT, ctt_id INTEGER, util_id TEXT, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))"
    const reqToGetListContact = "SELECT ctt_id, ctt_photo, ctt_prenom, ctt_nom, ctt_favoris FROM contact ORDER BY ctt_prenom ASC"

    const db = SQLite.openDatabase(dbLocalName)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    const getListContact = () => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(reqToGetListContact, null,

                    (_, resultSet) => {
                        resolve(resultSet.rows)
                    },
                    (_, error) => reject(error)
                )

            })
        })
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
                            console.log('contact remote error', error);
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
                            console.log('telephone remote error', error)
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
                            console.log('mail remote error', error)
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
            console.error('Error while saving contact information:', error)
            throw error
        }
    }

    const afficherPremiereAlerteDeSynchronisation = async () => {
        try {
            const _alerte = await AsyncStorage.getItem('_alerte')

            if (_alerte === null || _alerte !== 'true') {

                Alert.alert(
                    'Information',
                    'Voulez-vous synchroniser vos contacts ?', [
                    {
                        text: 'Non',
                    },
                    {
                        text: 'Oui',
                        onPress: () => recupererInfoContactDepuisWeb()
                    }
                ])

                await AsyncStorage.setItem('_alerte', 'true')
            }

        } catch (error) {
            throw error
        }
    }


    const recupererInfoContactDepuisWeb = () => {

        setLoading(true)

        axios.post('http://192.168.9.179:8088/index.php/v1/obtenirContactsParUtilisateur', {

            suffixBase: 220638,
            utilId: 1700
        })

            .then(res => {

                enregistrerInfoContactDepuisWeb(res.data.contacts, res.data.telephones, res.data.mails)
                    .then(() => {
                        console.log('Les informations sur les contacts ont été enregistrées avec succès.')
                        navigation.navigate('Accueil', { showModal: true })
                    })
                    .catch((error) => {
                        console.log('Une erreur est survenue lors de l\'enregistrement des informations sur les contacts :', error)
                    })

            })

            .catch(error => {
                console.error("Une erreur s'est produite lors de la récupération des contacts :", error);
            })
            .finally(() => {
                setLoading(false)
            })

    }

    useEffect(() => {

        db.transaction((tx) => {

            tx.executeSql(
                //'DROP TABLE IF EXISTS contact'
                reqCreationTableContact
            )

            tx.executeSql(
                //'DROP TABLE IF EXISTS telephone'
                reqCreationTableTelephone
            )

            tx.executeSql(
                //'DROP TABLE IF EXISTS mail'
                reqCreationTableMail
            )

            tx.executeSql(
                //'DROP TABLE IF EXISTS adresse'
                reqCreationTableAdresse
            )
        })

    }, [])


    /*const redirection = (showModal) => {
        navigation.navigate('Accueil', { showModal: showModal })
    }*/


    useEffect(() => {
        afficherPremiereAlerteDeSynchronisation()
    }, [])


    useEffect(() => {

        navigation.addListener('focus', () => {

            getListContact()
                .then((data) => {
                    setData(data._array)
                    store.dispatch(updateNombreContact(data.length))
                })
                .catch((error) => {
                    throw error
                })
        })

    }, [])


    return (

        <>

            {
                data.length !== 0 ?

                    <FlatList
                        data={data}
                        renderItem={({ item }) => <ListView ctt_id={item.ctt_id} photo={item.ctt_photo} prenom={item.ctt_prenom} nom={item.ctt_nom} favori={item.ctt_favoris} />}
                        keyExtractor={item => item.ctt_id} /> :

                    <View style={{ flex: 1, justifyContent: "center", marginBottom: 100 }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold" }} variant="headlineSmall">Aucun contact enregistré</Text>
                    </View>

            }

            <SpinnerModal isVisible={loading} />

        </>

    )

})

export default ListContact