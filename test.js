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



import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native"
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'

const Item = ({ ctt_id, tel_id, ml_id, prenom, nom, telephone, mail }) => {

    const navigation = useNavigation()

    return (

            <TouchableOpacity   style={styles.container}
                                onPress={() => navigation.navigate('DetailContact', {

                                    ctt_id : ctt_id,
                                    tel_id : tel_id,
                                    ml_id : ml_id,
                                    prenom: prenom,
                                    nom: nom,
                                    telephone: telephone,
                                    mail: mail
                                    
                                })}>

                
                <View style= {{flex : 0.2}} >
                    <Image source={require('../../assets/user.jpg')}
                                style={styles.photoContact} />
                </View>

                <Text style={{ flex : 0.4, fontSize: 18 }}>{prenom}</Text>
                <Text style={{ flex : 1, fontSize: 18 }}>{nom}</Text>


            </TouchableOpacity>

    )
}

const ListContact = () => {

    const navigation = useNavigation()

    const [data, setData] = useState([])
    const db = SQLite.openDatabase('Contact.db')

    useEffect(() => {

        navigation.addListener('focus', () => {

            db.transaction((tx) => {

                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS contact (ctt_id INTEGER PRIMARY KEY AUTOINCREMENT, ctt_photo TEXT, ctt_nom TEXT, ctt_prenom TEXT, ctt_prenom_usage TEXT, ctt_entreprise TEXT, ctt_service TEXT, ctt_fonction TEXT, ctt_anniversaire DATE, ctt_siteweb TEXT, ctt_twitter TEXT, ctt_linkedin TEXT, ctt_viadeo TEXT, ctt_facebook TEXT, ctt_skype TEXT, ctt_notes TEXT, ctt_corbeille INTEGER, ctt_favoris INTEGER, ctt_etat INTEGER)'
                )
    
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS telephone (tel_id INTEGER PRIMARY KEY AUTOINCREMENT, tel_numero TEXT, ctt_id INTEGER, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))'
                )
    
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS mail (ml_id INTEGER PRIMARY KEY AUTOINCREMENT, ml_mail TEXT, ctt_id INTEGER, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))'
                )
    
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS adresse (addr_id INTEGER PRIMARY KEY AUTOINCREMENT, addr_ligne1 TEXT, addr_ville TEXT, addr_pays TEXT, addr_bp TEXT, addr_cp INTEGER, ctt_id INTEGER, FOREIGN KEY (ctt_id) REFERENCES contact(ctt_id))'
                )

                tx.executeSql('SELECT contact.ctt_id, contact.ctt_prenom, contact.ctt_nom, telephone.tel_id, GROUP_CONCAT(DISTINCT telephone.tel_numero) AS tel_numero, mail.ml_id, GROUP_CONCAT(DISTINCT mail.ml_mail) AS ml_mail FROM contact, telephone, mail WHERE contact.ctt_id = telephone.ctt_id AND contact.ctt_id = mail.ctt_id GROUP BY contact.ctt_id', null,
                
                    (_, resultSet) => {
                        //console.log(resultSet)
                        setData(resultSet.rows._array)
                    },
                    (_, error) => console.log(error)
                )
    
            })
           
        })

    }, [])

    return (


            <View style ={{flex : 1}}>

                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item ctt_id = {item.ctt_id} tel_id= {item.tel_id} ml_id={item.ml_id} prenom={item.ctt_prenom} nom={item.ctt_nom} telephone={item.tel_numero} mail= {item.ml_mail} />}
                    keyExtractor={item => item.ctt_id} />
                    
            </View>

    )
}

const styles = StyleSheet.create({

    container: {

        backgroundColor: '#E8E8E8',
        padding: 10,
        marginHorizontal: 8,
        flexDirection: 'row'

    },

    icon: {
        flex: 1
    },

    photoContact: {

        width: 30,
        height: 30,
        borderRadius: 100
    }

});

export default ListContact