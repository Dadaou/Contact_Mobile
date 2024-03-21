import requetes from '../../Utils/RequeteSql'
import {Appbar} from 'react-native-paper'
import { blanc, dbLocalName, bleu } from '../../Utils/constant'
import { genererID } from '../../Utils/utils'
import { store } from '../redux/dataStore'
import { addContact, addTelephone, addMail, addAdresse } from '../redux/action/addDataAction'
import { useState } from 'react'
import * as SQLite from 'expo-sqlite'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, StatusBar } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons'
import SpinnerModal from '../Modal/Spinner'

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

    const db = SQLite.openDatabase(dbLocalName)

    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [prenomUsage, setPrenomUsage] = useState('')
    const [groupe, setGroupe] = useState('')
    const [entreprise, setEntreprise] = useState('')
    const [fonction, setFonction] = useState('')
    const [telephone, setTelephone] = useState([{ tel_code_pays: "33", tel_libelle: "", tel_numero: "" }])
    const [mail, setMail] = useState([{ ml_libelle: "", ml_mail: "" }])
    const [date, setDate] = useState('')
    const [note, setNote] = useState('')
    const [adresse, setAdresse] = useState([{ addr_ligne1: "", addr_ligne2: "", addr_ligne3: "", addr_ville: "", addr_pays: "", addr_bp: "", addr_cp: "", addr_libelle: "" }])
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
        setPrenom('')
        setPrenomUsage('')
        setGroupe('')
        setEntreprise('')
        setFonction('')
        setTelephone([{ tel_libelle: "", tel_numero: "", tel_code_pays: "33" }])
        setMail([{ ml_libelle: "", ml_mail: "" }])
        setDate('')
        setNote('')
        setAdresse([{ addr_ligne1: "", addr_ligne2: "", addr_ligne3: "", addr_ville: "", addr_pays: "", addr_bp: "", addr_cp: "", addr_libelle: "" }])
        setService('')
        setSiteWeb('')
        setTwitter('')
        setLinkedin('')
        setFacebook('')
        setSkype('')
        setEtat(true)

        navigation.navigate('Accueil', { showModal: showModal })
    }


    const saveContact = () => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                const idContact = genererID()

                tx.executeSql(

                    requetes.InsererContact,
                    [
                        idContact, photo, prenom, nom, prenomUsage, entreprise, fonction, date,
                        note, service, siteWeb, twitter, linkedin, facebook, skype, etat, 0
                    ],

                    (txObj, resultSet) => {

                        if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
                            store.dispatch(addContact({
                                idContact, photo, prenom, nom, prenomUsage, entreprise, fonction, date,
                                note, service, siteWeb, twitter, linkedin, facebook, skype, etat
                            }))
                            resolve(resultSet.insertId)
                        }

                    },
                    (txObj, error) => {
                        console.log('transaction error', error)
                        reject(error)
                    }
                )
            })
        })
    }

    const getLastContactId = (lastRowId) => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(
                    "SELECT ctt_id FROM contact WHERE rowid = ?",
                    [lastRowId],
                    (txObj, results) => {
                        resolve(results.rows._array[0].ctt_id)
                    },
                    (txObj, error) => {
                        console.log('transaction error', error)
                        reject(error)
                    }
                )
            })
        })

    }

    const saveTelephone = (idContact) => {

        db.transaction((tx) => {

            telephone.forEach((item) => {
                tx.executeSql(requetes.InsererTelephone,
                    [item.tel_numero, item.tel_code_pays, item.tel_libelle, idContact],

                    (txObj, resultSet) => {

                        if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) { 
                            store.dispatch(addTelephone({
                                tel_numero: item.tel_numero,
                                tel_code_pays: item.tel_code_pays,
                                tel_libelle: item.tel_libelle
                            }))
                        }
                    },

                    (txObj, error) => {
                        console.log('telephone error', error)
                        throw error
                    }
                )
            })
        })

    }

    const saveMail = (idContact) => {

        db.transaction((tx) => {

            mail.forEach((item) => {

                tx.executeSql(requetes.InsererMail,
                    [item.ml_mail, item.ml_libelle, idContact],

                    (txObj, resultSet) => {

                        if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
                            store.dispatch(addMail({
                                ml_mail: item.ml_mail,
                                ml_libelle: item.ml_libelle,
                            }))
                        }
                    },

                    (txObj, error) => {
                        console.log('mail error', error)
                        throw error
                    }
                )
            })

        })
    }

    const saveAdresse = (idContact) => {

        db.transaction((tx) => {

            adresse.forEach((item) => {
                tx.executeSql(requetes.InsererAdresse,
                    [item.addr_ligne1, item.addr_ligne2, item.addr_ligne3, item.addr_cp, item.addr_bp, item.addr_pays, item.addr_ville, item.addr_libelle, idContact],

                    (txObj, resultSet) => {
                        if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
                            store.dispatch(addAdresse({
                                addr_ligne1: item.addr_ligne1,
                                addr_ligne2: item.addr_ligne2,
                                addr_ligne3: item.addr_ligne3,
                                addr_cp: item.addr_cp,
                                addr_bp: item.addr_bp,
                                addr_pays: item.addr_pays,
                                addr_ville: item.addr_ville,
                                addr_libelle: item.addr_libelle
                            }))
                        }
                    },
                    (txObj, error) => {
                        console.log('adresse error', error);
                        throw error;
                    }
                )
            })
        })
    }

    const saveInformation = () => {


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

                saveContact().then((lastId) => {

                    getLastContactId(lastId)
                        .then((idLastContact) => {
                            saveTelephone(idLastContact)
                            saveMail(idLastContact)
                            saveAdresse(idLastContact)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                })

                redirection(true)

            }

            catch (error) {
                console.error("Une erreur est survenue lors d'enregistrement:", error)
                setLoading(false)
            }
        }

        //store.subscribe(() => console.log(store.getState().listTelephone))

    }


    return (

        <>

            <StatusBar backgroundColor={bleu} />

            <Appbar.Header style={{backgroundColor : bleu}}>
                <Appbar.Action icon="close" size={30} onPress={() => redirection(false)} color={blanc}/>
                <Appbar.Content title="Créer un contact" color={blanc} titleStyle={{alignSelf: 'center'}}/>
                <Appbar.Action icon="check" size={30} onPress={saveInformation} color={blanc}/>
            </Appbar.Header>

            <EtatContact paramEtat={etat} onChangeEtat={setEtat} />

            <ScrollView style={{ flex: 1, backgroundColor: blanc }}>

                <View style={{ alignItems: "center" /*backgroundColor: blanc*/ }}>

                    <View style={{ flex: 1, padding: 10 }} />

                    <ChampPhoto paramPhoto={photo} onChangePhoto={setPhoto} />

                    <ChampPrenom paramPrenom={prenom} onChangePrenom={setPrenom} />

                    <ChampNom paramNom={nom} onChangeNom={setNom} />

                    <ChampPrenomUsage paramPrenomUsage={prenomUsage} onChangePrenomUsage={setPrenomUsage} />

                    <ChampGroupe paramGroupe={groupe} onChangeGroupe={setGroupe} />

                    <ChampEntreprise paramEntreprise={entreprise} onChangeEntreprise={setEntreprise} />

                    <ChampFonction paramFonction={fonction} onChangeFonction={setFonction} />

                    <ChampTelephone paramTelephone={telephone} onChangeTelephone={setTelephone} />

                    <ChampEmail paramMail={mail} onChangeMail={setMail} />

                    <TouchableOpacity onPress={() => setAfficherAutreChamp(!afficherAutreChamp)}>

                        {!afficherAutreChamp ?
                            <Text style={{ paddingRight: 170, paddingTop: 15, fontSize: 17, marginBottom: 20, color: "#708090" }}>Autres champs?</Text> : null
                        }

                    </TouchableOpacity>

                    {afficherAutreChamp ? (

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

                    <SpinnerModal isVisible={loading} />

                </View>

            </ScrollView>

        </>

    )
}


const styles = StyleSheet.create({

    container: {

        flex: 1,
        flexDirection: 'column',
        backgroundColor: bleu
    },

    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: 'center'

    }

})

export default AjoutContact


/**/