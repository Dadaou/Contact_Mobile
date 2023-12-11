import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'

const Item = ({ prenom, nom, telephone, email }) => {

    const navigation = useNavigation()

    return (

            <TouchableOpacity style={styles.container}
                onPress={() => navigation.navigate('DetailContact', {

                    prenom: prenom,
                    nom: nom,
                    telephone: telephone,
                    email: email
                })}>

                <Text style={{ flex: 5, fontSize: 20 }}/*style={{  paddingHorizontal: 40 }}*/>{prenom}</Text>
                <Text style={{ flex: 12, fontSize: 20 }}>{nom}</Text>

                <TouchableOpacity style={styles.icon}>
                    <Ionicons
                        name='ellipsis-vertical'
                        size={20} />
                </TouchableOpacity>

            </TouchableOpacity>

    )
}

const ListContact = () => {

    const navigation = useNavigation()

    const [data, setData] = useState([])
    const [db, setDb] = useState(SQLite.openDatabase('Contact.db'));

    useEffect(() => {

        db.transaction((tx) => {

            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, prenom TEXT, nom TEXT,  telephone INTEGER, email TEXT)'
            );

        })

 
        navigation.addListener('focus', () => {

            db.transaction((tx) => {

                tx.executeSql('SELECT * FROM contact ORDER BY prenom ASC', null,
                    (txObj, resultSet) => {
                        //console.log(resultSet)
                        setData(resultSet.rows._array)
                    },
                    (txObj, error) => console.log(error)
                )
    
            })
           
        })

    }, [])

    return (


            <View style ={{flex : 1}}>

                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item prenom={item.prenom} nom={item.nom} telephone={item.telephone} email={item.email} />}
                    keyExtractor={item => item.id} />
                    
            </View>

    )
}

const styles = StyleSheet.create({

    container: {

        backgroundColor: '#E8E8E8',
        padding: 10,
        marginHorizontal: 8,
        flexDirection: 'row'

    },

    icon: {
        flex: 1
    }

});

export default ListContact