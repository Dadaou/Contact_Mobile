
import React, { useState, useEffect, useCallback } from 'react'
import { View, FlatList, RefreshControl } from "react-native"
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import { getListContact } from '../utils/utils'
import { store } from '../redux/dataStore'
import { updateNombreContactPersonnel } from '../redux/action/globalDataAction'
import ListView from './ListView'


const ListContactPersonnel = () => {

    const navigation = useNavigation()
    const sourceId = 1
    const requete = "SELECT ctt_id, ctt_photo, ctt_prenom, ctt_nom, ctt_favoris FROM contact WHERE src_id = ? ORDER BY ctt_prenom ASC, ctt_nom ASC"

    const db = SQLite.openDatabase(dbLocalName)
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(true)

    const fetchListContact = useCallback(async () => {

        try {

            const data = await getListContact(db, requete, [sourceId])
            setData(data._array)
            store.dispatch(updateNombreContactPersonnel(data.length))
            setRefreshing(false)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            fetchListContact()
        })

        return unsubscribe
    }, [navigation, data.length])


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

}

export default ListContactPersonnel