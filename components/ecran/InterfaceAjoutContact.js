import { useState } from 'react'
import * as SQLite from 'expo-sqlite'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons'

import Separateur from '../contact-components/Separateur'
import ChampPhoto from '../contact-components/champ/ChampPhoto'
import ChampNom from '../contact-components/champ/ChampNom'
import ChampPrenom from '../contact-components/champ/ChampPrenom'
import ChampPrenomUsage from '../contact-components/champ/ChampPrenomUsage'
import ChampGroupe from '../contact-components/champ/ChampGroupe'
import ChampEntreprise from '../contact-components/champ/ChampEntreprise'
import ChampFonction from '../contact-components/champ/ChampFonction'
import ChampTelephone from '../contact-components/champ/ChampTelephone'
import ChampEmail from '../contact-components/champ/ChampEmail'
import ChampDate from '../contact-components/champ/ChampDate'
import ChampAdresse from '../contact-components/champ/ChampAdresse'
import ChampNote from '../contact-components/champ/ChampNote'
import ChampService from '../contact-components/champ/ChampService'
import ChampSiteWeb from '../contact-components/champ/ChampSiteWeb'
import ChampReseauSociaux from '../contact-components/champ/ChampReseauSociaux'


const AjoutContact = ({ navigation }) => {

    const db = SQLite.openDatabase('Contact.db')

    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [prenomUsage, setPrenomUsage] = useState('')
    const [groupe, setGroupe] = useState('')
    const [entreprise, setEntreprise] = useState('')
    const [fonction, setFonction] = useState('')
    const [telephone, setTelephone] = useState([])
    const [mail, setMail] = useState([])
    const [date, setDate] = useState([])
    const [note, setNote] = useState('')
    const [adresse, setAdresse] = useState([])
    const [service, setService] = useState('')
    const [siteWeb, setSiteWeb] = useState('')
    const [reseauSociaux, setReseauSociaux] = useState([])

    const [afficherAutreChamp, setAfficherAutreChamp] = useState(false)

console.log(mail)

    const redirection = () => {
        navigation.navigate('Accueil')
    }


    const enregistrerContact = () => {

        /*if (nom == '' || prenom == '') {

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

            })*/


        redirection()

    }


    return (


        <SafeAreaView style={styles.container}>


            <View style={styles.header}>

                <TouchableOpacity style={{ right: 40 }} onPress={redirection}>
                    <Octicons name="x" size={35} color="#FEFFFF" />
                </TouchableOpacity>

                <View /*style = {{flex : 0}}*/>
                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#FEFFFF" }}>Créer un contact</Text>
                </View>

                <TouchableOpacity style={{ left: 40 }}/*style={{ flex : 0.4, backgroundColor: "#DBAF2F", paddingLeft: 4, borderRadius : 20 }}*/
                    onPress={enregistrerContact}>

                    <Octicons name="check" size={35} color="#FEFFFF" />

                </TouchableOpacity>

            </View>



            <ScrollView style={{ flex: 1, backgroundColor: "#FEFFFF" }}>

                <View style={{ alignItems: "center" /*backgroundColor: "#FEFFFF"*/ }}>

                    <View style={{ flex: 1, padding: 10 }} />

                    <ChampPhoto />

                    <ChampNom onChangeNom={setNom}/>

                    <ChampPrenom />

                    <ChampPrenomUsage />

                    <ChampGroupe />

                    <ChampEntreprise />

                    <ChampFonction />

                    <ChampTelephone />

                    <ChampEmail onChangeMail={setMail}/>

                    <TouchableOpacity onPress={() => setAfficherAutreChamp(!afficherAutreChamp)}>

                        {!afficherAutreChamp ?
                            <Text style={{ paddingRight: 170, paddingTop: 15, fontSize: 17, marginBottom: 20, color: "#C19A6B" }}>Autres champs?</Text> : null
                        }

                    </TouchableOpacity>

                    {afficherAutreChamp ? (

                        <>

                            <ChampDate />

                            <ChampNote />

                            <ChampAdresse />

                            <ChampService />

                            <ChampSiteWeb />
                            
                            <ChampReseauSociaux />

                        </>

                    ) : null}

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
        justifyContent: 'center'

    }

})

export default AjoutContact