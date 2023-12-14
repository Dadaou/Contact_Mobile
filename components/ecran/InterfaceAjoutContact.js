import { useState} from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons'
import PhoneInput from 'react-native-international-phone-number'
import * as SQLite from 'expo-sqlite'

const AjoutContact = ({ navigation }) => {

    const db = SQLite.openDatabase('Contact.db')

    const [prenom, setPrenom] = useState('')
    const [nom, setNom] = useState('')
    const [telephone, setTelephone] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [mail, setMail] = useState('')

    const redirection = () => {
        navigation.navigate('Accueil')
    };


    const enregistrerContact = () => {

        if (nom == '' || prenom == '') {

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
                    'INSERT INTO contact (ctt_prenom, ctt_nom) VALUES (?,?)', [prenom, nom]
                )

                tx.executeSql(
                    'INSERT INTO telephone (tel_numero, ctt_id) VALUES (?,(SELECT MAX(ctt_id) FROM  contact ))', [telephone]
                )

                tx.executeSql(
                    'INSERT INTO mail (ml_mail, ctt_id) VALUES (?,(SELECT MAX(ctt_id) FROM  contact ))', [mail]
                )

            })


            redirection()

        }

        setPrenom('')
        setNom('')
        setTelephone('')
        setMail('')

    }


    return (


        <SafeAreaView style={styles.container}>


            <View style = {styles.header}>

                <TouchableOpacity style = {{right : 40}} onPress={redirection}>
                    <Octicons name="x" size={35} color="#FEFFFF" />
                </TouchableOpacity>

                <View /*style = {{flex : 0}}*/>
                    <Text style={{ fontSize: 25, fontWeight: "bold", color : "#FEFFFF"}}>Créer un contact</Text>
                </View>

                <TouchableOpacity style = {{left : 40}}/*style={{ flex : 0.4, backgroundColor: "#DBAF2F", paddingLeft: 4, borderRadius : 20 }}*/
                                onPress={enregistrerContact}>

                    <Octicons name="check" size={35} color="#FEFFFF" />

                </TouchableOpacity>

            </View>


            <View  style = {{flex : 0.3,  backgroundColor : "#FEFFFF"}}/>


            <ScrollView style = {{flex : 1,  backgroundColor : "#FEFFFF"}}>

                <View style={{ alignItems : "center", marginBottom : 120, /*backgroundColor: "#FEFFFF"*/}}>

                    <TextInput

                            style={styles.input}
                            //selectionColor={'#808080'}
                            placeholder="Prénom"
                            onChangeText={(text) => setPrenom(text)}
                            value={prenom} />
                            
                        <TextInput

                            style={{ ...styles.input, marginBottom: 20 }}
                            placeholder="Nom"
                            onChangeText={(text) => setNom(text)}
                            value={nom} />

                        <PhoneInput

                                placeholder = "Téléphone"
                                value={telephone}
                                onChangePhoneNumber={setTelephone}
                                selectedCountry={selectedCountry}
                                onChangeSelectedCountry={setSelectedCountry}
                                modalSearchInputPlaceholder="Rechercher un pays"
                                modalNotFoundCountryMessage="Pays non trouvé"
                                defaultCountry="FR"

                                phoneInputStyles={{

                                    container: {
                                
                                        width: 300,
                                        height: 50,
                                        borderWidth: 1,
                                        borderRadius : 7,
                                        borderColor: "#808080",
                                        marginBottom : 10
                                    },


                                    flagContainer: {

                                        borderTopLeftRadius: 7,
                                        borderBottomLeftRadius: 7,
                                        ustifyContent: 'center',  
                                    },

                                }}
                            />

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={(text) => setMail(text)}
                            value={mail} />

                    </View>

            </ScrollView>



     

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#1685E7"

    },

    header: {

        //flex : 0.3,
        flexDirection: "row",
        padding: 16,
        justifyContent : 'center'
    },

    input: {

        height: 50,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 7,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        fontSize : 16
    }
          
})

export default AjoutContact