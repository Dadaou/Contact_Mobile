import React, { useState, useEffect } from 'react'
import { View, FlatList, RefreshControl} from "react-native"
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import { store } from '../redux/dataStore'
import { updateNombreContact } from '../redux/action/globalDataAction'
import ListView from './ListView'
import { recupererInfoContactDepuisWeb } from '../synchronisation/RecupererContact'
import { extractAppTokenFromLocalStorage } from '../utils/GestionAppToken'
import BottomToast from '../modal/BottomToast'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ListContact = React.memo(() => {

    const navigation = useNavigation()

    const reqCreationTableContact = "CREATE TABLE IF NOT EXISTS contact (ctt_id TEXT PRIMARY KEY, ctt_photo TEXT, ctt_nom TEXT, ctt_prenom TEXT, ctt_prenom_usage TEXT, ctt_entreprise TEXT, ctt_service TEXT, ctt_fonction TEXT, ctt_anniversaire DATE, ctt_siteweb TEXT, ctt_twitter TEXT, ctt_linkedin TEXT, ctt_facebook TEXT, ctt_skype TEXT, ctt_notes TEXT, ctt_corbeille INTEGER, ctt_favoris INTEGER, ctt_etat INTEGER, util_id TEXT, synchronise INTEGER)"
    const reqCreationTableTelephone = "CREATE TABLE IF NOT EXISTS telephone (tel_id INTEGER PRIMARY KEY AUTOINCREMENT, tel_numero TEXT, tel_code_pays TEXT, tel_libelle TEXT, ctt_id INTEGER, util_id TEXT, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))"
    const reqCreationTableMail = "CREATE TABLE IF NOT EXISTS mail (ml_id INTEGER PRIMARY KEY AUTOINCREMENT, ml_mail TEXT, ml_libelle TEXT, ctt_id INTEGER, util_id TEXT, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))"
    const reqCreationTableAdresse = "CREATE TABLE IF NOT EXISTS adresse (addr_id INTEGER PRIMARY KEY AUTOINCREMENT, addr_ligne1 TEXT, addr_ligne2 TEXT, addr_ligne3 TEXT, addr_ville TEXT, addr_pays TEXT, addr_bp TEXT, addr_cp TEXT, addr_libelle TEXT, ctt_id INTEGER, util_id TEXT, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))"
    const reqToGetListContact = "SELECT ctt_id, ctt_photo, ctt_prenom, ctt_nom, ctt_favoris FROM contact ORDER BY ctt_prenom ASC"

    const db = SQLite.openDatabase(dbLocalName)
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(true)
    const [afficherToast, setAfficherToast] = useState(false)


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

    const fetchContactWeb = async () => {

        try {
            const premierSynchro = await AsyncStorage.getItem('_premierSynchro')
    
            if (premierSynchro === null || premierSynchro !== 'true') {
                
                const appToken = await extractAppTokenFromLocalStorage()
                await recupererInfoContactDepuisWeb(appToken)
                await AsyncStorage.setItem('_premierSynchro', 'true')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const fetchListContact = async () => {

        try {
            const data = await getListContact()
            setData(data._array)
            store.dispatch(updateNombreContact(data.length))
            setRefreshing(false)
        } catch (error) {
            console.error(error)
        }
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

    useEffect(() => {
        fetchContactWeb()
    }, [])

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            fetchListContact()
        })
        return unsubscribe
    }, [navigation])

    return (

        <>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={data}
                keyExtractor={item => item.ctt_id}
                renderItem={({ item }) => (
                    <ListView
                        ctt_id={item.ctt_id}
                        photo={item.ctt_photo}
                        prenom={item.ctt_prenom}
                        nom={item.ctt_nom}
                        favori={item.ctt_favoris}
                    />
                )}

                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchListContact} />}

                ListEmptyComponent={(
                    <View style={{ flex: 1, justifyContent: "center", marginBottom: 100 }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold" }} variant="headlineSmall">
                            Aucun contact enregistré
                        </Text>
                    </View>
                )}
            />
        </>
    )

})

export default ListContact