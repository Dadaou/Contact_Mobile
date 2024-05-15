import React, { useState, useEffect, useCallback } from 'react'
import { View, FlatList, RefreshControl } from "react-native"
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import { store } from '../redux/dataStore'
import { updateNombreContact, manageApparitionNotification, manageNotificationMessage } from '../redux/action/globalDataAction'
import ListView from './ListView'
import { recupererContactDepuisWeb } from '../synchronisation/RecupererContact'
import AsyncStorage from '@react-native-async-storage/async-storage'


const ListContact = () => {

    const navigation = useNavigation()
    const requete = "SELECT ctt_id, ctt_photo, ctt_prenom, ctt_nom, ctt_favoris FROM contact ORDER BY ctt_prenom ASC"

    const db = SQLite.openDatabase(dbLocalName)
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(true)

    /*
        const connecte = store.getState().globalReducer.networkInfo.isConnected
        const internetJoignable = store.getState().globalReducer.networkInfo.isInternetReachable
        console.log("Eto", store.getState().globalReducer._infoUtilisateur)
    */

    const getListContact = () => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(requete, null,

                    (_, resultSet) => {
                        resolve(resultSet.rows)
                    },
                    (_, error) => reject(error)
                )

            })
        })
    }


    const fetchListContact = useCallback(async () => {

        try {
            const data = await getListContact()
            setData(data._array)
            store.dispatch(updateNombreContact(data.length))
            setRefreshing(false)
        } catch (error) {
            console.error(error)
        }
    }, [])


    const fetchContactWeb = useCallback(async () => {

        const premierSynchro = await AsyncStorage.getItem('_premierSynchro')

        if (premierSynchro === null || premierSynchro !== 'true') {

            store.dispatch(manageApparitionNotification(true))
            store.dispatch(manageNotificationMessage("Récupération de vos contacts en cours..."))
            await recupererContactDepuisWeb()
            store.dispatch(manageApparitionNotification(false))
        }
        //recupererContactMajDepuisWeb()
        fetchListContact()

    }, [])

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            fetchContactWeb()
        })

        return unsubscribe
    }, [navigation])

    return (

        <>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={data}
                maxToRenderPerBatch={20}
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

                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchContactWeb} />}

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

}

export default ListContact