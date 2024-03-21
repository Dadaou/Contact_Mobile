import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import { dbLocalName } from "../../../Utils/constant"


const  InformationContact = ({id}) => {

    const requeteTableContact = "SELECT ctt_photo, ctt_prenom, ctt_nom FROM contact WHERE ctt_id = ?"
    const navigation = useNavigation()
    const db = SQLite.openDatabase(dbLocalName)
   
    const [contact, setContact] = useState([{ctt_photo : "", ctt_prenom : "", ctt_nom : ""}])

    useEffect(() => {

        navigation.addListener('focus', () => {

            db.transaction((tx) => {

                tx.executeSql(requeteTableContact, [id],
                    (_, resultSet) => {
                        setContact(resultSet.rows._array)
                    },
                    (_, error) => console.log(error)
                )


            })
           
        })

    }, [])



    return (

        //style={{ alignItems: 'center', marginVertical: 10, marginBottom: 30 }}

        <View style={{ flex: 1,  alignItems: 'center'}}>

                {contact[0].ctt_photo == '' ? (

                            <Image
                                source={require('../../../assets/user.jpg')}
                                style={styles.photoContact}
                                />

                            ) : (
                                <Image source={{ uri: contact[0].ctt_photo }} style={styles.photoContact} />
                            )
                }

                <Text style={styles.sectionNom} numberOfLines={3} ellipsizeMode="tail" > 
                    <Text style={styles.sectionNom}> {contact[0].ctt_prenom} </Text> {contact[0].ctt_nom} 
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

    sectionNom : {

        fontSize: 25,
        fontWeight: 'bold'
    },

})


export default InformationContact