import { useState} from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import * as SQLite from 'expo-sqlite'

const ModificationContact  = ({ navigation, route }) => {

    const db = SQLite.openDatabase('Contact.db')
    const { id, prenom, nom, telephone, email } = route.params

    const [nouveauPrenom, setNouveauPrenom] = useState(prenom)
    const [nouveauNom, setNouveauNom] = useState(nom)
    const [nouveauTelephone, setNouveauTelephone] = useState(telephone)
    const [nouveauEmail, setNouveauEmail] = useState(email)

    const redirection = () => {
        navigation.navigate('Accueil')
    };


    const enregistrerModification = () => {

        if (nouveauPrenom == '' || nouveauNom == '' || nouveauTelephone == '') {

            Alert.alert(

                'Information',
                'Veuillez ajouter des informations pour modifier le contact',
                [{ text: "OK" }],
                { cancelable: false }
            )
        }

        else {

            db.transaction((tx) => {

                tx.executeSql(

                    'UPDATE contact SET prenom = ?, nom = ?, telephone = ?, email = ? WHERE id = ?', 
                    [nouveauPrenom, nouveauNom, nouveauTelephone, nouveauEmail, id],

                    (txObj, resultSet) => {
                        redirection()
                    },

                    (txObj, error) => console.log(error)
                )
            })

        }


        setNouveauPrenom('')
        setNouveauNom('')
        setNouveauTelephone('')
        setNouveauEmail('')
    }


    return (

            <SafeAreaView style={styles.container}>

                <View style = {styles.header}>

                    <TouchableOpacity style = {{flex : 1}} onPress={() => navigation.navigate('DetailContact', {

                                                                            id : id,
                                                                            prenom: prenom,
                                                                            nom: nom,
                                                                            telephone: telephone,
                                                                            email: email

                                                                            })}>
                                                                                
                        <Feather name="x" size={25} color="black" />
                    </TouchableOpacity>

                    <View style = {{flex : 2}}>
                        <Text style={{ fontSize: 18}}>Modifier un contact</Text>
                    </View>

                    <TouchableOpacity style={{ flex : 1, backgroundColor: "#DBAF2F", paddingLeft: 4,/*paddingLeft: 2,*/ borderRadius : 20 }}
                                      onPress={enregistrerModification}>

                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Enregistrer</Text>

                    </TouchableOpacity>

                </View>

                <View style={{  flex : 1, alignItems : "center", justifyContent: 'center', backgroundColor: "#FEFFFF"}}>

                        <TextInput
                            style={styles.input}
                            placeholder="Prénom"
                            onChangeText={(text) => setNouveauPrenom(text)}
                            value={nouveauPrenom} />

                        <TextInput
                            style={styles.input}
                            placeholder="Nom"
                            onChangeText={(text) => setNouveauNom(text)}
                            value={nouveauNom} />

                        <TextInput
                            style={styles.input}
                            placeholder="Téléphone"
                            keyboardType='numeric'
                            onChangeText={(text) => setNouveauTelephone(text)}
                            value={String(nouveauTelephone)} />


                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={(text) =>setNouveauEmail(text)}
                            value={nouveauEmail} />
                    </View>

            </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#ECCA37"

    },

    header: {

        flexDirection: "row",
        padding: 15
    },


    input: {

        height: 50,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }

})

export default ModificationContact 