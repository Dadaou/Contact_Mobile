import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native"
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
//import requetes from '../../Utils/RequeteSql'

const Item = ({ ctt_id, photo, prenom, nom }) => {

    
    const navigation = useNavigation()

    return (

        <TouchableOpacity style={styles.container}
            onPress={() => navigation.navigate('DetailContact', { ctt_id: ctt_id })}>

            <View style={{ flex: 0.2 }}>

                {photo == '' ? (
                    <Image
                        source={require('../../assets/user.jpg')}
                        style={styles.photoContact}
                    />
                ) : (
                    <Image source={{ uri: photo }} style={styles.photoContact} />
                )
                }

            </View>


            <View style={{ flex: 1, padding: 8 }}>

                <Text style={styles.text}>
                    <Text> {prenom} </Text> {nom}
                </Text>

            </View>

        </TouchableOpacity>

    )
}

const ListContact = () => {

    const navigation = useNavigation()

    const reqCreationTableContact =  "CREATE TABLE IF NOT EXISTS contact (ctt_id INTEGER PRIMARY KEY AUTOINCREMENT, ctt_photo TEXT, ctt_nom TEXT, ctt_prenom TEXT, ctt_prenom_usage TEXT, ctt_entreprise TEXT, ctt_service TEXT, ctt_fonction TEXT, ctt_anniversaire DATE, ctt_siteweb TEXT, ctt_twitter TEXT, ctt_linkedin TEXT, ctt_facebook TEXT, ctt_skype TEXT, ctt_notes TEXT, ctt_corbeille INTEGER, ctt_favoris INTEGER, ctt_etat INTEGER, util_id TEXT)"
    const reqCreationTableTelephone  = "CREATE TABLE IF NOT EXISTS telephone (tel_id INTEGER PRIMARY KEY AUTOINCREMENT, tel_numero TEXT, tel_code_pays TEXT, tel_libelle TEXT, ctt_id INTEGER, util_id TEXT, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))"
    const reqCreationTableMail = "CREATE TABLE IF NOT EXISTS mail (ml_id INTEGER PRIMARY KEY AUTOINCREMENT, ml_mail TEXT, ml_libelle TEXT, ctt_id INTEGER, util_id TEXT, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))"
    const reqCreationTableAdresse  = "CREATE TABLE IF NOT EXISTS adresse (addr_id INTEGER PRIMARY KEY AUTOINCREMENT, addr_ligne1 TEXT, addr_ligne2 TEXT, addr_ligne3 TEXT, addr_ville TEXT, addr_pays TEXT, addr_bp TEXT, addr_cp TEXT, addr_libelle TEXT, ctt_id INTEGER, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))"
    const reqToGetListContact = "SELECT ctt_id, ctt_photo, ctt_prenom, ctt_nom FROM contact ORDER BY ctt_prenom ASC"

    const db = SQLite.openDatabase('Contact.db')
    const [data, setData] = useState([])

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

        navigation.addListener('focus', () => {

            db.transaction((tx) => {

                tx.executeSql(reqToGetListContact, null,

                    (_, resultSet) => {
                        setData(resultSet.rows._array)
                    },
                    (_, error) => console.log(error)
                )

            })

        })

    }, [])

    return (

            <FlatList
                data={data}
                renderItem={({ item }) => <Item ctt_id={item.ctt_id} photo={item.ctt_photo} prenom={item.ctt_prenom} nom={item.ctt_nom} telephone={item.tel_numero} mail={item.ml_mail} />}
                keyExtractor={item => item.ctt_id} />
    )
}

const styles = StyleSheet.create({

    container: {

        padding: 10,
        marginHorizontal: 8,
        flexDirection: 'row'

    },

    photoContact: {

        width: 40,
        height: 40,
        borderRadius: 100
    },

    text: {
        fontSize: 18
    }

});

export default ListContact