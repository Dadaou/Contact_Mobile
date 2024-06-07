
import React, { useState, useEffect, useCallback, memo } from 'react'
import { View, FlatList, RefreshControl } from "react-native"
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dbLocalName } from '../utils/Constant'
import { getListContact } from '../utils/utils'
import { store } from '../redux/dataStore'
import ChampRechercheContact from './champ/ChampRechercheContact'
import { extractAppTokenFromLocalStorage } from '../utils/GestionAppToken'
import { manageApparitionNotification, manageNotificationMessage, manageDateDernierSynchro } from '../redux/action/globalDataAction'
import ListView from './ListView'
import { recupererContactPlateformeDepuisWeb, recupererContactPersoDepuisWeb } from '../synchronisation/RecupererContact'
import { getDateTime } from '../utils/utils'
import { getformatedDateTime } from '../utils/utils'


const CustomFlatlist = memo(({ onTotalChange, texteSiListVide = "Aucun contact enregistré", requete, paramRequete = null }) => {

    const navigation = useNavigation()
    const db = SQLite.openDatabase(dbLocalName)
    const date = getDateTime()
    let formatedDateTime = getformatedDateTime().formatedDate + " à " + getformatedDateTime().time
    const messageNotification = "Récupération de vos contacts en cours. Cette opération peut prendre quelques minutes..."

    const [data, setData] = useState([])
    const [copieData, setCopieData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [connecte, setConnecte] = useState(store.getState().globalReducer.networkInfo.isConnected)
    const [internetJoignable, setInternetJoignable] = useState(store.getState().globalReducer.networkInfo.isInternetReachable)
    const [dateDernierSynchro, setDateDernierSynchro] = useState("")
    const [messageAAfficherSiDataVide, setMessageAAfficherSiDataVide] = useState(texteSiListVide)
    const [focus, setFocus] = useState(false)

    store.subscribe(() => {
        const state = store.getState()
        //console.log(state.globalReducer.networkInfo.isConnected)
        setConnecte(state.globalReducer.networkInfo.isConnected)
        setInternetJoignable(state.globalReducer.networkInfo.isInternetReachable)
        setDateDernierSynchro(state.globalReducer.dateDernierSynchro)
    })

    const fetchListContact = useCallback(async () => {

        setRefreshing(true)

        try {
            const data = await getListContact(db, requete, paramRequete)
            setData(data._array)
            setCopieData(data._array)
            onTotalChange(data.length)

        } catch (error) {
            throw error

        } finally {
            setRefreshing(false)
        }

    }, [db, requete, paramRequete])

    const fetchContactWeb = useCallback(async () => {

        if (connecte && internetJoignable) {

            setRefreshing(true)

            try {
                const premierSynchro = await AsyncStorage.getItem('_premierSynchro')
                const appToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiIxIiwiYXBwX25vbSI6ImNvbnRhY3QiLCJsb2dfaWQiOiIxNyJ9.7vXX-t6UZQEz7kSEIQkaHNF97eaUnJsN6CC524SpTFE'//await extractAppTokenFromLocalStorage()

                if (premierSynchro === null || premierSynchro !== 'true') {

                    store.dispatch(manageApparitionNotification(true));
                    store.dispatch(manageNotificationMessage(messageNotification))

                    await recupererContactPlateformeDepuisWeb(appToken)
                    await recupererContactPersoDepuisWeb(appToken)

                    await AsyncStorage.setItem('_premierSynchro', 'true')
                    await AsyncStorage.setItem('_datePremierSynchronisation', date)

                } else {

                    await recupererContactPlateformeDepuisWeb(appToken)
                    await recupererContactPersoDepuisWeb(appToken)
                }

                await AsyncStorage.setItem('_dateDernierSynchro', formatedDateTime)
                store.dispatch(manageDateDernierSynchro(formatedDateTime))
                fetchListContact()
            }
            catch (error) {
                throw error
            }

            finally {
                store.dispatch(manageApparitionNotification(false))
                setRefreshing(false)
            }


        }
    }, [connecte, internetJoignable, formatedDateTime, date])


    useEffect(() => {

        const fetchContacts = async () => {

            const premierSynchro = await AsyncStorage.getItem('_premierSynchro')
            if (connecte && internetJoignable && premierSynchro !== 'true') {
                await fetchContactWeb()
            } else {
                fetchListContact()
            }
        }

        const unsubscribe = navigation.addListener('focus', fetchContacts)

        fetchContacts() // se déclenche quand il y a une appelle externe et qu'on a besoin de rafraichir la liste des contacts

        return () => {
            unsubscribe()
        }

    }, [navigation, connecte, internetJoignable, dateDernierSynchro])


    return (

        <>
            <ChampRechercheContact data={data} dataCopie={copieData} onSearch={setData} onFocusChampRecherche={setFocus} onFindNoResult={setMessageAAfficherSiDataVide} />

            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={data}
                maxToRenderPerBatch={20}
                keyExtractor={item => item.ctt_id}
                renderItem={({ item, index }) => (
                    <ListView
                        focus={focus}
                        index={index}
                        ctt_id={item.ctt_id}
                        src_id={item.src_id}
                        photo={item.ctt_photo}
                        prenom={item.ctt_prenom}
                        nom={item.ctt_nom}
                        favori={item.ctt_favoris}
                        telephone={item.telephone}
                        mail={item.mail}
                    />
                )}

                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchContactWeb} />}

                ListEmptyComponent={(
                    <View style={{ flex: 1, justifyContent: "center", marginBottom: 100 }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold" }} variant="headlineSmall">
                            {messageAAfficherSiDataVide}
                        </Text>
                    </View>
                )}
            />

        </>
    )

})

export default CustomFlatlist