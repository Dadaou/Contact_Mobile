import { useState} from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import * as SQLite from 'expo-sqlite'

const AjoutContact = ({ navigation }) => {

    const db = SQLite.openDatabase('Contact.db')

    const [prenom, setPrenom] = useState('')
    const [nom, setNom] = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')

    const redirection = () => {
        navigation.navigate('Accueil')
    };


    const enregistrerContact = () => {

        if (nom == '' || prenom == '' || telephone == '') {

            Alert.alert(

                'Information',
                'Veuillez ajouter des informations pour créer un contact',
                [{ text: "OK" }],
                { cancelable: false }
            );
        }

        else {

            db.transaction((tx) => {

                tx.executeSql(

                    'INSERT INTO contact ( prenom, nom,  telephone, email) VALUES (?,?,?,?)',
                    [prenom, nom, telephone, email],

                    (txObj, resultSet) => {
                        redirection()
                    },

                    (txObj, error) => console.log(error)
                )
            })

        }

        setPrenom('')
        setNom('')
        setTelephone('')
        setEmail('')

    }


    return (


            <SafeAreaView style={styles.container}>

                <View style = {styles.header}>

                    <TouchableOpacity style = {{flex : 1}} onPress={redirection}>
                        <Feather name="x" size={25} color="black" />
                    </TouchableOpacity>

                    <View style = {{flex : 2}}>
                        <Text style={{ fontSize: 18}}>Créer un contact</Text>
                    </View>

                    <TouchableOpacity style={{ flex : 1, backgroundColor: "#DBAF2F", paddingLeft: 4, borderRadius : 20 }}
                                      onPress={enregistrerContact}>

                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Enregistrer</Text>

                    </TouchableOpacity>

                </View>

                <View style={{  flex : 1, alignItems : "center", justifyContent: 'center', backgroundColor: "#FEFFFF"}}>

                        <TextInput
                            style={styles.input}
                            placeholder="Prénom"
                            onChangeText={(text) => setPrenom(text)}
                            value={prenom} />

                        <TextInput
                            style={styles.input}
                            placeholder="Nom"
                            onChangeText={(text) => setNom(text)}
                            value={nom} />

                        <TextInput
                            style={styles.input}
                            placeholder="Téléphone"
                            keyboardType='numeric'
                            onChangeText={(text) => setTelephone(text)}
                            value={telephone} />


                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={(text) => setEmail(text)}
                            value={email} />

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

export default AjoutContact