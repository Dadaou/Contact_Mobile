
import React, { useState, useEffect, useCallback } from 'react'
import { View, FlatList, RefreshControl } from "react-native"
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dbLocalName } from '../utils/Constant'
import { getListContact } from '../utils/utils'
import { store } from '../redux/dataStore'
import { extractAppTokenFromLocalStorage } from '../utils/GestionAppToken'
import { manageApparitionNotification, manageNotificationMessage, manageDateDernierRecuperation } from '../redux/action/globalDataAction'
import ListView from './ListView'
import { recupererContactPlateformeDepuisWeb, recupererContactPersoDepuisWeb } from '../synchronisation/RecupererContact'
import { getDateTime } from '../utils/utils'
import { getformatedDateTime } from '../utils/utils'


const CustomFlatlist = ({ onTotalChange, texteSiListVide = "Aucun contact enregistré", requete, paramRequete = null }) => {

    const navigation = useNavigation()
    const db = SQLite.openDatabase(dbLocalName)
    const date = getDateTime()
    let formatedDateTime = getformatedDateTime().formatedDate + " à " + getformatedDateTime().time
    const messageNotification = "Récupération de vos contacts en cours. Cette opération peut prendre quelques minutes..."

    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(true)
    const [connecte, setConnecte] = useState(store.getState().globalReducer.networkInfo.isConnected)
    const [internetJoignable, setInternetJoignable] = useState(store.getState().globalReducer.networkInfo.isInternetReachable)

    store.subscribe(() => {
        const state = store.getState()
        //console.log(state.globalReducer.networkInfo.isConnected)
        setConnecte(state.globalReducer.networkInfo.isConnected)
        setInternetJoignable(state.globalReducer.networkInfo.isInternetReachable)
    })

    const fetchListContact = useCallback(async () => {

        try {
            setRefreshing(true)
            const data = await getListContact(db, requete, paramRequete)
            setData(data._array)
            onTotalChange(data.length)
            setRefreshing(false)
        } catch (error) {
            console.error(error)
        }
    }, [db, requete, paramRequete])

    const fetchContactWeb = useCallback(async () => {

        try {

            if (connecte && internetJoignable) {

                setRefreshing(true)

                const premierSynchro = await AsyncStorage.getItem('_premierSynchro')
                const appToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiIxIiwiYXBwX25vbSI6ImNvbnRhY3QiLCJsb2dfaWQiOiIxNyJ9.7vXX-t6UZQEz7kSEIQkaHNF97eaUnJsN6CC524SpTFE'//await extractAppTokenFromLocalStorage()

                if (premierSynchro === null || premierSynchro !== 'true') {

                    store.dispatch(manageApparitionNotification(true));
                    store.dispatch(manageNotificationMessage(messageNotification))

                    await recupererContactPlateformeDepuisWeb(appToken)
                    await recupererContactPersoDepuisWeb(appToken)

                    await AsyncStorage.setItem('_premierSynchro', 'true')
                    await AsyncStorage.setItem('_datePremierSynchronisation', date)
                    await AsyncStorage.setItem('_dateDernierRecuperation', formatedDateTime)

                    store.dispatch(manageDateDernierRecuperation(formatedDateTime))
                    store.dispatch(manageApparitionNotification(false))

                } else {

                    await recupererContactPlateformeDepuisWeb(appToken)
                    await recupererContactPersoDepuisWeb(appToken)
                    await AsyncStorage.setItem('_dateDernierRecuperation', formatedDateTime)
                    store.dispatch(manageDateDernierRecuperation(formatedDateTime))

                }

            }

            fetchListContact()

        } catch (error) {
            console.error(error)
        }
    }, [connecte, internetJoignable, date])


    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', async () => {

            const premierSynchro = await AsyncStorage.getItem('_premierSynchro')
            if (connecte && internetJoignable && premierSynchro !== 'true') {
                await fetchContactWeb()
            } else {
                fetchListContact()
            }

        })

        return unsubscribe
    }, [navigation, connecte, internetJoignable])


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
                            {texteSiListVide}
                        </Text>
                    </View>
                )}
            />

        </>
    )


}

export default CustomFlatlist