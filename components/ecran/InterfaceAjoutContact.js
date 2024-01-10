import requetes from '../../constant/RequeteSql'
import { useState } from 'react'
import * as SQLite from 'expo-sqlite'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, StatusBar } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons'

import Separateur from '../contact-components/Separateur'
import EtatContact from '../contact-components/champ/EtatContact'
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
import ChampTwitter from '../contact-components/champ/ChampTwitter'
import ChampLinkedin from '../contact-components/champ/ChampLinkedin'
import ChampFacebook from '../contact-components/champ/ChampFacebook'
import ChampSkype from '../contact-components/champ/ChampSkype'


const AjoutContact = ({ navigation }) => {

    const db = SQLite.openDatabase('Contact.db')

    const [photo, setPhoto] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [prenomUsage, setPrenomUsage] = useState('')
    const [groupe, setGroupe] = useState('')
    const [entreprise, setEntreprise] = useState('')
    const [fonction, setFonction] = useState('')
    const [telephone, setTelephone] = useState([{tel_code_pays: "33", tel_libelle: "", tel_numero: ""}])
    const [mail, setMail] = useState([{ ml_libelle : "", ml_mail : "" }])
    const [date, setDate] = useState('')
    const [note, setNote] = useState('')
    const [adresse, setAdresse] = useState([{ addr_ligne1: "" , addr_ligne2: "", addr_ligne3: "", addr_ville: "", addr_pays: "", addr_bp: "", addr_cp: "", addr_libelle: ""}])
    const [service, setService] = useState('')
    const [siteWeb, setSiteWeb] = useState('')
    const [twitter, setTwitter] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [facebook, setFacebook] = useState('')
    const [skype, setSkype] = useState('')
    const [etat, setEtat] = useState(true)

    const [afficherAutreChamp, setAfficherAutreChamp] = useState(false)

    const redirection = (showModal) => {

        setPhoto('')
        setNom('')
        setPrenom ('')
        setPrenomUsage('')
        setGroupe('')
        setEntreprise('')
        setFonction('')
        setTelephone([{ tel_libelle: "", tel_numero: "", tel_code_pays : "33" }])
        setMail([{ ml_libelle : "", ml_mail : "" }])
        setDate('')
        setNote('')
        setAdresse([{ addr_ligne1: "" , addr_ligne2: "", addr_ligne3: "", addr_ville: "", addr_pays: "", addr_bp: "", addr_cp: "", addr_libelle: ""}])
        setService('')
        setSiteWeb('')
        setTwitter('')
        setLinkedin('')
        setFacebook('')
        setSkype('')
        setEtat(true)

        navigation.navigate('Accueil', { showModal: showModal })
    }



    const enregistrerContact = () => {

        if (nom == '' || prenom == '') {

            Alert.alert(

                'Information',
                'Veuillez ajouter un nom et un prénom au minimun pour créer un contact',
                [{ text: "OK" }],
                { cancelable: false }
            )
        }

        else {

            try {

                db.transaction((tx) => {

                    tx.executeSql(requetes.InsererContact,
                        [photo, prenom, nom, prenomUsage, entreprise, fonction, date, note, service, siteWeb, twitter, linkedin, facebook, skype, etat]
                        /*,(txObj, resultSet) => {
                            console.log('insertion contact réussi')
                        },
                        (txObj, error) => {
                            console.log('contact error', error)
                            throw error
                        }*/
                    )
        
                    telephone.forEach((item) => {

                        tx.executeSql(requetes.InsererTelephone,
                            [item.tel_numero, item.tel_code_pays, item.tel_libelle]
                        )
                    })
        
                    mail.forEach((item) => {

                        tx.executeSql(requetes.InsererMail,
                            [item.ml_mail, item.ml_libelle]
                        );
                    });
        
                    adresse.forEach((item) => {

                        tx.executeSql(requetes.InsererAdresse,
                            [item.addr_ligne1, item.addr_ligne2, item.addr_ligne3, item.addr_cp, item.addr_bp, item.addr_pays, item.addr_ville, item.addr_libelle]
                        )
                    })
        
                    redirection(true)
                })
            } 
            
            catch (error) {
                console.error('Une erreur est survenue lors de la transaction:', error)
            }
        }
        
    }


    return (


        <SafeAreaView style={styles.container}>

            <StatusBar backgroundColor = "#005F9D"/> 

            <View style={styles.header}>

                <View style = {{flex : 1, alignItems : 'flex-start'}}>

                    <TouchableOpacity onPress={() => redirection(false)}>
                        <Octicons name="x" size={35} color="#FEFFFF" />
                    </TouchableOpacity>

                </View>


                <View style = {{alignItems : 'center'}}>
                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#FEFFFF" }}>Créer un contact</Text>
                </View>

                <View style = {{flex : 1, alignItems : 'flex-end'}}>

                    <TouchableOpacity onPress={enregistrerContact}>
                        <Octicons name="check" size={35} color="#FEFFFF" />
                    </TouchableOpacity>

                </View>


            </View>

            <EtatContact paramEtat={etat} onChangeEtat={setEtat}/>

            <ScrollView style={{ flex: 1, backgroundColor: "#FEFFFF" }}>

                <View style={{ alignItems: "center" /*backgroundColor: "#FEFFFF"*/ }}>

                    <View style={{ flex: 1, padding: 10 }} />

                    <ChampPhoto paramPhoto={photo} onChangePhoto={setPhoto}/>

                    <ChampPrenom paramPrenom={prenom} onChangePrenom={setPrenom}/>

                    <ChampNom paramNom={nom} onChangeNom={setNom}/>

                    <ChampPrenomUsage paramPrenomUsage={prenomUsage} onChangePrenomUsage={setPrenomUsage}/>

                    <ChampGroupe paramGroupe={groupe} onChangeGroupe={setGroupe}/>

                    <ChampEntreprise paramEntreprise={entreprise} onChangeEntreprise={setEntreprise}/>

                    <ChampFonction paramFonction={fonction} onChangeFonction={setFonction}/>

                    <ChampTelephone paramTelephone={telephone} onChangeTelephone={setTelephone}/>

                    <ChampEmail paramMail={mail} onChangeMail={setMail}/>

                    <TouchableOpacity onPress={() => setAfficherAutreChamp(!afficherAutreChamp)}>

                        {!afficherAutreChamp ?
                            <Text style={{ paddingRight: 170, paddingTop: 15, fontSize: 17, marginBottom: 20, color: "#708090" }}>Autres champs?</Text> : null
                        }

                    </TouchableOpacity>

                    { afficherAutreChamp ? (

                                                <>

                                                    <ChampDate paramDate={date} onChangeDate={setDate} />

                                                    <ChampNote paramNote={note} onChangeNote={setNote} />

                                                    <ChampAdresse paramAdresse={adresse} onChangeAdresse={setAdresse} />

                                                    <ChampService paramServie={service} onChangeService={setService} />

                                                    <ChampSiteWeb paramSiteWeb={siteWeb} onChangeSiteWeb={setSiteWeb} />

                                                    <ChampTwitter paramTwitter={twitter} onChangeTwitter={setTwitter} />

                                                    <ChampLinkedin paramLinkedin={linkedin} onChangeLinkedin={setLinkedin} />

                                                    <ChampFacebook paramFacebook={facebook} onChangeFacebook={setFacebook} />

                                                    <ChampSkype paramSkype={skype} onChangeSkype={setSkype} />
                                                    
                                                </>

                                            ) : null
                    }

                </View>

            </ScrollView>

        </SafeAreaView>

    )
}


const styles = StyleSheet.create({

    container: {

        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#005F9D"
    },

    header: {
        flexDirection: "row",
        padding: 16,
        alignItems : 'center'

    }

})

export default AjoutContact


/**/