import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native"
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import requetes from '../../constant/RequeteSql'

const Item = ({ ctt_id, photo, prenom, nom}) => {

    const navigation = useNavigation()

    return (

            <TouchableOpacity   style={styles.container}
                                onPress={() => navigation.navigate('DetailContact', { ctt_id : ctt_id})}>

                
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


                <View style = {{flex : 1, padding : 8}}>

                    <Text style = {styles.text}> 
                        <Text> {prenom} </Text> {nom}
                    </Text>

                </View>

            </TouchableOpacity>

    )
}

const ListContact = () => {

    const navigation = useNavigation()

    const db = SQLite.openDatabase('Contact.db')
    const [data, setData] = useState([])

    useEffect(() => {

        navigation.addListener('focus', () => {

            db.transaction((tx) => {

                tx.executeSql(
                    //'DROP TABLE IF EXISTS contact'
                    requetes.CreerTableContact
                )
    
                tx.executeSql(
                    //'DROP TABLE IF EXISTS telephone'
                    requetes.CreerTableTelephone
                )
    
                tx.executeSql(
                    //'DROP TABLE IF EXISTS mail'
                    requetes.CreerTableMail
                )
    
                tx.executeSql(
                    //'DROP TABLE IF EXISTS adresse'
                    requetes.CreerTableAdresse
                )

                tx.executeSql('SELECT ctt_id, ctt_photo, ctt_prenom, ctt_nom FROM contact ORDER BY ctt_prenom ASC', null,
                
                    (_, resultSet) => {
                        setData(resultSet.rows._array)
                    },
                    (_, error) => console.log(error)
                )
    
            })
           
        })

    }, [])

    return (


            <View style ={{flex : 1}}>

                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item ctt_id = {item.ctt_id} photo = {item.ctt_photo} prenom={item.ctt_prenom} nom={item.ctt_nom} telephone={item.tel_numero} mail= {item.ml_mail} />}
                    keyExtractor={item => item.ctt_id} />
                    
            </View>

    )
}

const styles = StyleSheet.create({

    container: {

        //backgroundColor: "white",
        padding: 10,
        marginHorizontal: 8,
        flexDirection: 'row'

    },

    icon: {
        flex: 1
    },

    photoContact: {

        width: 40,
        height: 40,
        borderRadius: 100
    },

    text : {
        fontSize : 18
    }

});

export default ListContact