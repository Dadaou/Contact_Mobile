import { useState, useEffect, useCallback } from 'react'
import { View, FlatList } from "react-native"
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../utils/Constant'
import ListView from './ListView'
import { getListContact } from '../utils/utils'
import { store } from '../redux/dataStore'
import { updateNombreFavori } from '../redux/action/globalDataAction'


const ListFavori = () => {

    const navigation = useNavigation()
    const reqToGetListFavori = "SELECT ctt_id, ctt_photo, ctt_prenom, ctt_nom, ctt_favoris FROM contact WHERE ctt_favoris = ? ORDER BY ctt_prenom ASC, ctt_nom ASC"

    const db = SQLite.openDatabase(dbLocalName)
    const [data, setData] = useState([])

    const fetchListContact = useCallback(async () => {

        try {
            const data = await getListContact(db, reqToGetListFavori, [1])
            setData(data._array)
            store.dispatch(updateNombreFavori(data.length))
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

        data.length !== 0 ?

            <FlatList
                data={data}
                renderItem={({ item }) => <ListView ctt_id={item.ctt_id} photo={item.ctt_photo} prenom={item.ctt_prenom} nom={item.ctt_nom} favori={item.ctt_favoris} />}
                keyExtractor={item => item.ctt_id} /> :

            <View style={{ flex: 1, justifyContent: "center", marginBottom: 100 }}>
                <Text style={{ textAlign: "center", fontWeight: "bold" }} variant="headlineSmall">Pas de contact favori</Text>
            </View>

    )
}

export default ListFavori