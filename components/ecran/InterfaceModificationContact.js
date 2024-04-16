import requetes from '../Utils/RequeteSql'
import { blanc, bleu, dbLocalName } from '../Utils/constant'
import { useState, useEffect } from 'react'
import * as SQLite from 'expo-sqlite'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native"
import { store } from '../redux/dataStore'
import { updateContact, updateTelephone, updateMail, updateAdresse } from '../redux/action/updateDataAction'
import { Appbar } from 'react-native-paper'

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

const ModificationContact = ({ navigation, route }) => {

    const { ctt_id } = route.params

    const db = SQLite.openDatabase(dbLocalName)

    const [photo, setPhoto] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [prenomUsage, setPrenomUsage] = useState('')
    const [groupe, setGroupe] = useState('')
    const [entreprise, setEntreprise] = useState('')
    const [fonction, setFonction] = useState('')
    const [telephone, setTelephone] = useState([{ tel_libelle: "", tel_numero: "", tel_code_pays: "33" }])
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

    const getInfoContact = () => {

        db.transaction((tx) => {

            tx.executeSql(requetes.GetContact, [ctt_id],
                (_, resultSet) => {
                    setPhoto(resultSet.rows._array[0].ctt_photo)
                    setPrenom(resultSet.rows._array[0].ctt_prenom)
                    setNom(resultSet.rows._array[0].ctt_nom)
                    setPrenomUsage(resultSet.rows._array[0].ctt_prenom_usage)
                    //setGroupe(resultSet.rows._array[0].ctt_groupe)
                    setEntreprise(resultSet.rows._array[0].ctt_entreprise)
                    setFonction(resultSet.rows._array[0].ctt_fonction)
                    setDate(resultSet.rows._array[0].ctt_anniversaire)
                    setNote(resultSet.rows._array[0].ctt_notes)
                    setService(resultSet.rows._array[0].ctt_service)
                    setSiteWeb(resultSet.rows._array[0].ctt_siteweb)
                    setTwitter(resultSet.rows._array[0].ctt_twitter)
                    setLinkedin(resultSet.rows._array[0].ctt_linkedin)
                    setFacebook(resultSet.rows._array[0].ctt_facebook)
                    setSkype(resultSet.rows._array[0].ctt_skype)
                    setEtat(resultSet.rows._array[0].ctt_etat)
                },
                (_, error) => console.log(error)
            )

            tx.executeSql(requetes.GetTelephone, [ctt_id],
                (_, resultSet) => {
                    setTelephone(resultSet.rows._array)
                },
                (_, error) => console.log(error)
            )

            tx.executeSql(requetes.GetMail, [ctt_id],
                (_, resultSet) => {
                    setMail(resultSet.rows._array)
                },
                (_, error) => console.log(error)
            )

            tx.executeSql(requetes.GetAdresse, [ctt_id],
                (_, resultSet) => {
                    setAdresse(resultSet.rows._array)
                },
                (_, error) => console.log(error)
            )

        })

    }

    const misAJourInfoContact = () => {

        if (nom == '' || prenom == '') {

            Alert.alert(

                'Information',
                'Veuillez ne pas laisser le nom et le prénom vide',
                [{ text: "OK" }],
                { cancelable: false }
            )
        }

        else {

            try {

                db.transaction((tx) => {

                    try {

                        tx.executeSql(requetes.SupprTelephone, [ctt_id])
                        tx.executeSql(requetes.SupprMail, [ctt_id])
                        tx.executeSql(requetes.SupprAdresse, [ctt_id])

                        tx.executeSql(requetes.MajContact,
                            [photo, nom, prenom, prenomUsage, entreprise, service, fonction, date, siteWeb,
                                twitter, linkedin, facebook, skype, note, etat, ctt_id],

                            (txObj, resultSet) => {

                                if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
                                    store.dispatch(updateContact({
                                        photo, nom, prenom, prenomUsage, entreprise, service, fonction, date, siteWeb,
                                        twitter, linkedin, facebook, skype, note, etat, ctt_id
                                    }))
                                }

                            },
                            (txObj, error) => {
                                console.log('transaction error', error)
                            }
                        )

                        telephone.forEach((item) => {
                            tx.executeSql(requetes.InsererTelephone,
                                [item.tel_numero, item.tel_code_pays, item.tel_libelle, ctt_id],

                                (txObj, resultSet) => {
                                    if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
                                        store.dispatch(updateTelephone({
                                            ctt_id: ctt_id,
                                            tel_numero: item.tel_numero,
                                            tel_code_pays: item.tel_code_pays,
                                            tel_libelle: item.tel_libelle
                                        }))
                                    }
                                },
                                (txObj, error) => {
                                    console.log('telephone error ', error)
                                    throw error
                                }
                            )
                        })

                        mail.forEach((item) => {
                            tx.executeSql(requetes.InsererMail,
                                [item.ml_mail, item.ml_libelle, ctt_id],

                                (txObj, resultSet) => {
                                    if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
                                        store.dispatch(updateMail({
                                            ctt_id: ctt_id,
                                            ml_mail: item.ml_mail,
                                            ml_libelle: item.ml_libelle
                                        }))
                                    }
                                },

                                (txObj, error) => {
                                    console.log('mail error ', error)
                                    throw error
                                }
                            )
                        })

                        adresse.forEach((item) => {
                            tx.executeSql(requetes.InsererAdresse,
                                [item.addr_ligne1, item.addr_ligne2, item.addr_ligne3, item.addr_cp,
                                item.addr_bp, item.addr_pays, item.addr_ville, item.addr_libelle, ctt_id],

                                (txObj, resultSet) => {
                                    if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
                                        store.dispatch(updateAdresse({
                                            ctt_id: ctt_id,
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
                                    console.log('adresse error ', error)
                                    throw error
                                }

                            )
                        })
                    }

                    catch (error) {
                        console.error("Erreur lors de l'exécution des requêtes d'insertion:", error)
                        throw error
                    }
                })

                redirection(true)
            }

            catch (error) {
                console.error("Une erreur est survenue lors de la transaction:", error)
            }

            //store.subscribe(() => console.log(store.getState().updateDataReducer.listUpdatedTelephone))
        }

    }

    useEffect(() => {
        getInfoContact()
    }, [])


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

        navigation.navigate('DetailContact', { ctt_id: ctt_id, showModal: showModal })

    }


    return (

        <>

            <StatusBar backgroundColor={bleu} barStyle="light-content" />

            <Appbar.Header style={{ backgroundColor: bleu }}>
                <Appbar.Action icon="close" size={30} onPress={() => redirection(false)} color={blanc} />
                <Appbar.Content title="Modifier un contact" color={blanc} titleStyle={{ alignSelf: 'center' }} />
                <Appbar.Action icon="check" size={30} onPress={misAJourInfoContact} color={blanc} />
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

                </View>

            </ScrollView>

        </>

    )
}

export default ModificationContact