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

const  InformationMail = ({id}) => {

    const navigation = useNavigation()
    const db = SQLite.openDatabase('Contact.db')
    const requeteTableMail = " SELECT GROUP_CONCAT(DISTINCT mail.ml_mail) AS ml_mail, GROUP_CONCAT(DISTINCT mail.ml_libelle) AS ml_libelle FROM mail WHERE ctt_id = ? GROUP BY ctt_id "

    const [mail, setMail] = useState([{ml_mail : '', ml_libelle : ''}])

    useEffect(() => {

        navigation.addListener('focus', () => {

            db.transaction((tx) => {

                tx.executeSql(requeteTableMail, [id],
                    (_, resultSet) => {
                        //console.log('telephone table : ', resultSet.rows._array)
                        setMail(resultSet.rows._array)
                    },
                    (_, error) => console.log(error)
                )


            })
           
        })

    }, [])



    return (

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

                                <Text style={{ fontSize: 18,  marginBottom: 20 }}>{mail}</Text>

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


export default InformationMail