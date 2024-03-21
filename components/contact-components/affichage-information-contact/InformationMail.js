import { useState, useEffect } from "react"
import { View, StyleSheet, Linking } from "react-native"
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import { Card, IconButton, Text } from "react-native-paper"
import { dbLocalName } from "../../../Utils/constant"

const convertirEnArray = (chaine) => {

    if (chaine !== "") {
        const chaineArray = chaine.split(',')
        return chaineArray
    } else return []

}

const  InformationMail = ({id}) => {

    const requeteTableMail = "SELECT ml_mail, ml_libelle FROM mail WHERE ctt_id = ? "
    //const requeteTableMail = "SELECT GROUP_CONCAT(DISTINCT mail.ml_mail) AS ml_mail, GROUP_CONCAT(DISTINCT mail.ml_libelle) AS ml_libelle FROM mail WHERE ctt_id = ? GROUP BY ctt_id"
    const navigation = useNavigation()
    const db = SQLite.openDatabase(dbLocalName )

    const [mail, setMail] = useState([{ml_mail : '', ml_libelle : ''}])


    const getMail = () => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(requeteTableMail, [id],

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

            getMail()
                .then((data) => {
                    setMail(data._array)
                })
                .catch((error) => {
                    console.warn(error)
            })
           
        })

    }, [])


    return (

        <Card mode="elevated" style={styles.card}>
            <Card.Content>
                <Text variant="titleLarge">Email</Text>
                {mail[0].ml_mail !== "" ? (
                    mail.map((item, index) => (
                        <Card key={index} mode="contained" style={styles.card}>
                            <Card.Title
                                title={item.ml_mail}
                                titleStyle = {{fontSize: 18}}
                                subtitle={item.ml_libelle}
                                left={(props) => <IconButton {...props} icon="email" size={28} onPress={() => Linking.openURL(`mailto:${item.ml_mail}`)} />}
                            />
                        </Card>
                    ))) : (
                        <Card mode="contained" style={styles.card}>
                            <Card.Title
                                subtitle={"Ajouter une adresse e-mail"}
                                left={(props) => <IconButton {...props} icon="phone" size={28}  />}
                            />
                        </Card>
                )}
            </Card.Content>
        </Card>
    )


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

                    mail.map((item, index) => (

                            <View key={index} style={{ flexDirection: "row"}}>

                                <TouchableOpacity style = {{marginHorizontal : 12}} onPress={() => Linking.openURL(`mailto:${item.ml_mail}`)}>
                                    <FontAwesome name="envelope" size={23} color="#000000" />
                                </TouchableOpacity>

                                <Text style={{ fontSize: 18,  marginBottom: 20 }}>{item.ml_mail}</Text>

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

    },

    card : {
        backgroundColor: "#F2F3F4", 
        borderRadius: 20
    }
})


export default InformationMail