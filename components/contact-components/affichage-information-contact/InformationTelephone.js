import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native"
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import CountryFlag from "react-native-country-flag"
import * as SQLite from 'expo-sqlite'
import getIsoCode from "../../../Utils/getIsoCode"

const convertirEnArray = (chaine) => {

    if (chaine !== "") {
        const chaineArray = chaine.split(',')
        return chaineArray
    } else return []

}

const InformationTelephone = ({ id }) => {

    const navigation = useNavigation()
    const db = SQLite.openDatabase('Contact.db')

    const requeteTableTelephone = " SELECT GROUP_CONCAT(DISTINCT telephone.tel_numero) AS tel_numero, GROUP_CONCAT(DISTINCT telephone.tel_libelle) AS tel_libelle, GROUP_CONCAT(DISTINCT telephone.tel_code_pays) AS tel_code_pays FROM telephone WHERE ctt_id = ? GROUP BY ctt_id"

    const [telephone, setTelephone] = useState([{ tel_code_pays: "", tel_numero: "", tel_libelle: "" }])


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

                <View style={{ flexDirection: "row" }}>

                    <TouchableOpacity style={{ marginHorizontal: 12 }}>
                        <FontAwesome name="phone" size={25} color="#000000" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 15, marginBottom: 25 }}>Ajouter un numéro de téléphone</Text>

                </View>

            ) : (

                convertirEnArray(telephone[0].tel_numero).map((numero, index) => (

                    <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>

                        <TouchableOpacity style={{ marginHorizontal: 12 }} onPress={() => { Linking.openURL(`tel:+${convertirEnArray(telephone[0].tel_code_pays)[index]}${numero}`) }}>
                            <FontAwesome name="phone" size={25} color="#000000" />
                        </TouchableOpacity>


                        <CountryFlag
                            isoCode={
                                `${getIsoCode(convertirEnArray(telephone[0].tel_code_pays)[index]) !== null &&
                                getIsoCode(convertirEnArray(telephone[0].tel_code_pays)[index]).toLowerCase()}`
                            }
                            size={20}
                        />

                        <Text style={{ fontSize: 18, marginLeft: 10 }}>{`+${convertirEnArray(telephone[0].tel_code_pays)[index]}${numero}`}</Text>

                    </View>

                ))
            )}

        </View>

    )

}


const styles = StyleSheet.create({

    titre: {

        fontSize: 20,
        marginBottom: 12

    }
})


export default InformationTelephone

