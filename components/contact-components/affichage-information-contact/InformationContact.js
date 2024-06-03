import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from "../../utils/Constant"


const InformationContact = ({ idContact }) => {

    const requeteTableContact = "SELECT ctt_photo, ctt_prenom, ctt_nom FROM contact WHERE ctt_id = ?"
    const navigation = useNavigation()
    const db = SQLite.openDatabase(dbLocalName)

    const [contact, setContact] = useState([{ ctt_photo: "", ctt_prenom: "", ctt_nom: "" }])

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {

            db.transaction((tx) => {

                tx.executeSql(requeteTableContact, [idContact],
                    (_, resultSet) => {
                        setContact(resultSet.rows._array)
                    },
                    (_, error) => console.log(error)
                )

            })

        })

        return unsubscribe

    }, [])


    return (


        <View style={{ flex: 1, alignItems: 'center' }}>

            {contact[0].ctt_photo == '' || contact[0].ctt_photo == null ? (

                <Image
                    source={require('../../../assets/user.jpg')}
                    style={styles.photoContact}
                />

            ) : (
                <Image source={{ uri: contact[0].ctt_photo }} style={styles.photoContact} />
            )
            }

            <Text style={styles.sectionNomEtPrenom}>
                {contact[0].ctt_prenom} <Text style={styles.sectionNomEtPrenom} ellipsizeMode="tail" >{contact[0].ctt_nom}</Text>
            </Text>
        </View>

    )

}


const styles = StyleSheet.create({

    photoContact: {

        width: 200,
        height: 200,
        borderRadius: 100
    },

    sectionNomEtPrenom: {

        fontSize: 25,
        fontWeight: 'bold',
        textAlign: "center"
    },

})


export default InformationContact