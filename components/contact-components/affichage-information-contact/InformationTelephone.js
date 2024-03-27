import { useState, useEffect } from "react"
import { View, StyleSheet, Linking } from "react-native"
import { useNavigation } from '@react-navigation/native'
import CountryFlag from "react-native-country-flag"
import * as SQLite from 'expo-sqlite'
import getIsoCode from "../../../Utils/getIsoCode"
import { Card, IconButton, Text } from "react-native-paper"
import { dbLocalName } from "../../../Utils/constant"

const convertirEnArray = (chaine) => {

    if (chaine !== "") {
        const chaineArray = chaine.split(',')
        return chaineArray
    } else return []

}

const InformationTelephone = ({ id }) => {

    const navigation = useNavigation()
    const db = SQLite.openDatabase(dbLocalName)
    //const requeteTableTelephone = " SELECT GROUP_CONCAT(DISTINCT telephone.tel_numero) AS tel_numero, GROUP_CONCAT(DISTINCT telephone.tel_libelle) AS tel_libelle, GROUP_CONCAT(DISTINCT telephone.tel_code_pays) AS tel_code_pays FROM telephone WHERE ctt_id = ? GROUP BY ctt_id"
    const requeteTableTelephone = "SELECT tel_numero, tel_libelle, tel_code_pays FROM telephone WHERE ctt_id = ? "
    const [telephone, setTelephone] = useState([{ tel_code_pays: "", tel_numero: "", tel_libelle: "" }])


    const getTelephone = () => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(requeteTableTelephone, [id],

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

            getTelephone()
                .then((data) => {
                    setTelephone(data._array)
                })
                .catch((error) => {
                    console.warn(error)
            })
        })

    }, [])


    const afficherNumeroTelephone = (tel_code_pays, tel_numero) => {

           tel_numero = tel_numero.trim()
           if(tel_code_pays === "33") {
                if(tel_numero.startsWith("0")){
                     return `+${tel_code_pays} (${tel_numero.slice(0, 1)})${tel_numero.slice(1)}`
                }
                else{
                    return `+${tel_code_pays} (0)${tel_numero}`
                }
           }
           else return `+${tel_code_pays} ${tel_numero}`
    }


    return (
        <Card mode="elevated" style={styles.card}>
            <Card.Content>
                <Text variant="titleLarge">Téléphone</Text>
                {telephone.map((item, index) => (
                    item.tel_numero !== "" ? (
                        <Card key={index} mode="contained" style={styles.card}>
                            <Card.Title
                                title={
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CountryFlag
                                            isoCode={(getIsoCode(item.tel_code_pays) !== null && getIsoCode(item.tel_code_pays).toLowerCase()) || ''}
                                            size={15}
                                        />
                                        <Text style={{ marginLeft: 8, fontSize: 18 }}>{afficherNumeroTelephone(item.tel_code_pays, item.tel_numero)}</Text>
                                    </View>
                                }
                                subtitle={item.tel_libelle}
                                left={(props) => <IconButton {...props} icon="phone" size={28} onPress={() => { Linking.openURL(`tel:+${item.tel_code_pays}${item.tel_numero}`) }} />}
                            />
                        </Card>
                    ) : (
                        <Card key={index} mode="contained" style={styles.card}>
                            <Card.Title
                                subtitle={"Ajouter un numéro de téléphone"}
                                left={(props) => <IconButton {...props} icon="phone" size={28}  />}
                            />
                        </Card>
                    )
                ))}
            </Card.Content>
        </Card>
    )

    /*return (

        <View style={{ flex: 1 }}>

            <Text style={styles.titre}>Téléphone</Text>

            {convertirEnArray(telephone[0].tel_numero).length === 0 ? (

                <View style={{ flexDirection: "row" }}>

                    <TouchableOpacity style={{ marginHorizontal: 12 }}>
                        <FontAwesome name="phone" size={25} color="#000000" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 15, marginBottom: 25 }}>Ajouter un numéro de téléphone</Text>

                </View>

            ) : (

                telephone.map((item, index) => (

                    <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>

                        <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => { Linking.openURL(`tel:+${item.tel_code_pays}${item.tel_numero}`) }}>
                            <FontAwesome name="phone" size={25} color="#000000" />
                        </TouchableOpacity>


                        <CountryFlag
                            isoCode={
                                `${getIsoCode(item.tel_code_pays) !== null &&
                                    getIsoCode(item.tel_code_pays).toLowerCase()}`
                            }
                            size={20}
                        />

                        <Text style={{ fontSize: 18, marginLeft: 10 }}>{`+${item.tel_code_pays}${item.tel_numero}`}</Text>

                    </View>

                ))
            )}

        </View>

    )*/

}


const styles = StyleSheet.create({

    titre: {

        fontSize: 20,
        marginBottom: 12

    },

    card : {
        backgroundColor: "#F2F3F4", 
        borderRadius: 20,
    }
})


export default InformationTelephone

