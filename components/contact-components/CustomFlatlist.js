
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
import { recupererContactPlateformeDepuisWeb, recupererContactPersoDepuisWeb } from '../synchronisation/RecupererContact'
import { getDateTime } from '../utils/utils'
import { getformatedDateTime } from '../utils/utils'
import MenuItemContact from './menu-item-view/MenuItemContact'
import MenuItemContactPersonnel from './menu-item-view/MenuItemContactPersonnel'
import MenuItemFavori from './menu-item-view/MenuItemFavori'
import MenuItemCorbeille from './menu-item-view/MenuItemCorbeille'


const CustomFlatlist = memo(({ screenId, onTotalChange, texteSiListVide = "Aucun contact enregistré", requete, paramRequete = null }) => {

    const navigation = useNavigation()
    const db = SQLite.openDatabase(dbLocalName)
    const date = getDateTime()
    let formatedDateTime = getformatedDateTime().formatedDate + " à " + getformatedDateTime().time
    const messageNotification = "Récupération de vos contacts en cours. Cette opération peut prendre quelques minutes..."

    const [data, setData] = useState([])
    const [copieData, setCopieData] = useState([])
    const [refreshing, setRefreshing] = useState(true)
    const [connecte, setConnecte] = useState(store.getState().globalReducer.networkInfo.isConnected)
    const [internetJoignable, setInternetJoignable] = useState(store.getState().globalReducer.networkInfo.isInternetReachable)
    const [dateDernierSynchro, setDateDernierSynchro] = useState("")
    const [messageAAfficherSiDataVide, setMessageAAfficherSiDataVide] = useState(texteSiListVide)

    store.subscribe(() => {
        const state = store.getState()
        //console.log(state.globalReducer.networkInfo.isConnected)
        setConnecte(state.globalReducer.networkInfo.isConnected)
        setInternetJoignable(state.globalReducer.networkInfo.isInternetReachable)
        setDateDernierSynchro(state.globalReducer.dateDernierSynchro)
    })

    const choisirTypeMenuItem = (ctt_id, src_id, corbeille, photo, prenom, nom, favori, telephone, mail, onRefreshList) => {

        const menuItemProps = {
            ctt_id, src_id, corbeille, photo, prenom, nom, favori, telephone, mail, onRefreshList
        }

        switch (screenId) {
            case 1:
                return <MenuItemContact {...menuItemProps} />
            case 2:
                return <MenuItemContactPersonnel {...menuItemProps} />
            case 3:
                return <MenuItemFavori {...menuItemProps} />
            case 4:
                return <MenuItemCorbeille {...menuItemProps} />
            default:
                return null
        }
    }


    const fetchListContact = useCallback(async () => {

        //setRefreshing(true)

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

    }, [requete, paramRequete])


    const fetchContactWeb = useCallback(async () => {

        if (connecte && internetJoignable) {

            setRefreshing(true)

            try {
                const premierSynchro = await AsyncStorage.getItem('_premierSynchro')
                const appToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiIxIiwiYXBwX25vbSI6ImNvbnRhY3QiLCJsb2dfaWQiOiIxNyJ9.7vXX-t6UZQEz7kSEIQkaHNF97eaUnJsN6CC524SpTFE'//await extractAppTokenFromLocalStorage()

                if (premierSynchro === null || premierSynchro !== 'true') {

                    store.dispatch(manageApparitionNotification(true))
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

            }
            catch (error) {
                throw error
            }

            finally {
                store.dispatch(manageApparitionNotification(false))
                setRefreshing(false)
                fetchListContact()
            }

        }



    }, [connecte, internetJoignable, formatedDateTime, date])


    useEffect(() => {

        const refreshList = async () => {

            const premierSynchro = await AsyncStorage.getItem('_premierSynchro')

            if (connecte && internetJoignable && premierSynchro !== 'true') {
                await fetchContactWeb()
            } else {
                fetchListContact()
            }
        }

        const unsubscribe = navigation.addListener('focus', refreshList)
        refreshList()

        return unsubscribe

    }, [navigation, connecte, internetJoignable, dateDernierSynchro, refreshing])



    return (

        <>
            <ChampRechercheContact data={data} dataCopie={copieData} onSearch={setData} onFindNoResult={setMessageAAfficherSiDataVide} />

            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={data}
                maxToRenderPerBatch={20}
                keyExtractor={item => item.ctt_id}

                renderItem={({ item }) => choisirTypeMenuItem(item.ctt_id, item.src_id, item.ctt_corbeille, item.ctt_photo, item.ctt_prenom, item.ctt_nom, item.ctt_favoris, item.telephone, item.mail, setRefreshing)}
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