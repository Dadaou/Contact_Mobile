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

const  InformationAdresse = ({id}) => {

    const requeteTableAdresse = "SELECT GROUP_CONCAT(DISTINCT adresse.addr_ligne1) AS addr_ligne1, GROUP_CONCAT(DISTINCT adresse.addr_ligne2) AS addr_ligne2, GROUP_CONCAT(DISTINCT adresse.addr_ligne3) AS addr_ligne3, GROUP_CONCAT(DISTINCT adresse.addr_ville) AS addr_ville, GROUP_CONCAT(DISTINCT adresse.addr_pays) AS addr_pays, GROUP_CONCAT(DISTINCT adresse.addr_bp) AS addr_bp, GROUP_CONCAT(DISTINCT adresse.addr_cp) AS addr_cp, GROUP_CONCAT(DISTINCT adresse.addr_libelle) AS addr_libelle FROM adresse WHERE ctt_id = ? GROUP BY ctt_id"
    const navigation = useNavigation()
    const db = SQLite.openDatabase('Contact.db')
    
    const [adresse, setAdresse] = useState([{addr_ligne1 : '', addr_ligne2 : '', addr_ligne3 : '', addr_ville : '', addr_pays : '', addr_bp : '', addr_cp : '', addr_libelle : ''}])

    useEffect(() => {

        navigation.addListener('focus', () => {

            db.transaction((tx) => {

                tx.executeSql(requeteTableAdresse, [id],
                    (_, resultSet) => {
                        //console.log('telephone table : ', resultSet.rows._array)
                        setAdresse(resultSet.rows._array)
                    },
                    (_, error) => console.log(error)
                )


            })
           
        })

    }, [])



    /*return (

        <View style={{ flex: 1 }}>

            <Text style={styles.titre}>Email</Text>

            {convertirEnArray(mail[0].ml_mail).length === 0 ? (

                <View style={{ flexDirection: "row"}}>
                    
                    <TouchableOpacity style = {{marginHorizontal : 12}}>
                        <FontAwesome name="envelope" size={23} color="#000000" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 15,  marginBottom: 25 }}>Ajouter une adresse e-mail</Text>

                </View>

                ) : (

                        convertirEnArray(mail[0].ml_mail).map((mail, index) => (

                            <View key={index} style={{ flexDirection: "row"}}>

                                <TouchableOpacity style = {{marginHorizontal : 12}}>
                                    <FontAwesome name="envelope" size={23} color="#000000" />
                                </TouchableOpacity>

                                <Text style={{ fontSize: 18,  marginBottom: 25 }}>{mail}</Text>

                            </View>
                                
                    ))
            )}
        </View>

    )*/

}


const styles = StyleSheet.create({

    titre : {

        fontSize: 20,  
        marginBottom: 12

    }
})


export default InformationAdresse