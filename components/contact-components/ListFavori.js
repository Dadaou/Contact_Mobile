import { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native"
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from '../../Utils/constant'

const Item = ({ ctt_id, photo, prenom, nom, favori }) => {

    
    const navigation = useNavigation()

    return (

        <TouchableOpacity style={styles.container}
            onPress={() => navigation.navigate('DetailContact', { ctt_id: ctt_id, favori : favori })}>

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

const ListFavori = () => {

    const navigation = useNavigation()
    const reqToGetListFavori = "SELECT ctt_id, ctt_photo, ctt_prenom, ctt_nom, ctt_favoris FROM contact WHERE ctt_favoris = ? ORDER BY ctt_prenom ASC"

    const db = SQLite.openDatabase(dbLocalName)
    const [data, setData] = useState([])


    const getListContact = () => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(reqToGetListFavori, [1],

                    (_, resultSet) => {
                        resolve(resultSet.rows)
                    },
                    (_, error) => reject(error)
                )

            })
        })
    }


    useEffect(() => {

        navigation.addListener('focus', () => {

            getListContact()
                .then((data) => {
                    setData(data._array)
                    //setCount(data.length)
                })
                .catch((error) => {
                    console.warn(error)
                })
        })

    }, [])


    return (

            data.length !== 0 ?

                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item ctt_id={item.ctt_id} photo={item.ctt_photo} prenom={item.ctt_prenom} nom={item.ctt_nom} favori={item.ctt_favoris}/>}
                    keyExtractor={item => item.ctt_id} /> : 

                <View style = {{flex : 1, justifyContent : "center", marginBottom : 100}}>
                    <Text style = {{textAlign :"center", fontWeight : "bold"}} variant="headlineSmall">Pas de contact favori</Text>
                </View>
                
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

export default ListFavori