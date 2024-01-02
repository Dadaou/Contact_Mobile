import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'

const convertirEnArray = (chaine) => {

    if (chaine !== "") {
        const chaineArray = chaine.split(',')
        return chaineArray
    } else return []

}

const  InformationTelephone = ({id}) => {

    const navigation = useNavigation()
    const db = SQLite.openDatabase('Contact.db')

    const requeteTableTelephone = " SELECT GROUP_CONCAT(DISTINCT telephone.tel_numero) AS tel_numero, GROUP_CONCAT(DISTINCT telephone.tel_libelle) AS tel_libelle FROM telephone WHERE ctt_id = ? GROUP BY ctt_id"

    const [telephone, setTelephone] = useState([{tel_pays_selectionne : "", tel_numero : "", tel_libelle : ""}])

    useEffect(() => {

        navigation.addListener('focus', () => {

            db.transaction((tx) => {

                tx.executeSql(requeteTableTelephone, [id],
                    (_, resultSet) => {
                        //console.log('telephone table : ', resultSet.rows._array)
                        setTelephone(resultSet.rows._array)
                    },
                    (_, error) => console.log(error)
                )


            })
           
        })

    }, [])



    return (

        <View style={{ flex: 1 }}>

            <Text style={styles.titre}>Téléphone</Text>

            {convertirEnArray(telephone[0].tel_numero).length === 0 ? (

                <View style={{ flexDirection: "row"}}>
                    
                    <TouchableOpacity style = {{marginHorizontal : 12}}>
                        <FontAwesome name="phone" size={25} color="#000000" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 15,  marginBottom: 25 }}>Ajouter un numéro de téléphone</Text>

                </View>

                ) : (

                    convertirEnArray(telephone[0].tel_numero).map((telephone, index) => (

                        <View key={index} style={{ flexDirection: "row"}}>

                            <TouchableOpacity style = {{marginHorizontal : 12}}>
                                <FontAwesome name="phone" size={25} color="#000000" />
                            </TouchableOpacity>

                            <Text style={{ fontSize: 18,  marginBottom: 20 }}>{telephone}</Text>

                        </View>
                                
                    ))
            )}

        </View>

    )

}


const styles = StyleSheet.create({

    titre : {

        fontSize: 20,  
        marginBottom: 12

    }
})


export default InformationTelephone