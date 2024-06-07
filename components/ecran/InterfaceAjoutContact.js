import requetes from '../utils/RequeteSql'
import { useMemo } from 'react'
import { Appbar } from 'react-native-paper'
import { blanc, bleu, dbLocalName } from '../utils/Constant'
import { useState } from 'react'
import * as SQLite from 'expo-sqlite'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, StatusBar } from "react-native"
import { getUtilId } from '../utils/utils'
import SpinnerModal from '../modal/Spinner'

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
    const estInsererDansWeb = 0
    const estMaj = 0

    const [loading, setLoading] = useState(false)
    const [contact, setContact] = useState({

        date: "",
        corbeille: 0,
        entreprise: "",
        etat: 0,
        facebook: "",
        favoris: 0,
        fonction: "",
        idContactWeb: null,
        linkedin: "",
        nom: "",
        note: "",
        photo: "",
        prenom: "",
        prenomUsage: "",
        service: "",
        siteWeb: "",
        skype: "",
        twitter: "",
        sourceId: 1
    })

    const [telephone, setTelephone] = useState([{ tel_libelle: "", tel_numero: "" }])
    const [mail, setMail] = useState([{ ml_libelle: "", ml_mail: "" }])
    const [adresse, setAdresse] = useState([{ addr_ligne1: "", addr_ligne2: "", addr_ligne3: "", addr_ville: "", addr_pays: "", addr_bp: "", addr_cp: "", addr_libelle: "" }])
    const [afficherAutreChamp, setAfficherAutreChamp] = useState(false)

    const redirection = (showModal) => {

        setContact({})
        setTelephone([{ tel_libelle: "", tel_numero: "" }])
        setMail([{ ml_libelle: "", ml_mail: "" }])
        setAdresse([{ addr_ligne1: "", addr_ligne2: "", addr_ligne3: "", addr_ville: "", addr_pays: "", addr_bp: "", addr_cp: "", addr_libelle: "" }])

        navigation.navigate('Accueil', { showModal: showModal })
    }

    const saveContact = (utilId) => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(

                    requetes.InsererContact,
                    [
                        contact.photo, contact.prenom, contact.nom, contact.prenomUsage, contact.entreprise, contact.fonction, contact.date,
                        contact.note, contact.service, contact.siteWeb, contact.twitter, contact.linkedin, contact.facebook, contact.skype, contact.etat,
                        contact.favoris, utilId, contact.idContactWeb, contact.sourceId, estInsererDansWeb, estMaj
                    ],

                    (txObj, resultSet) => {

                        if (resultSet.rowsAffected !== 0 && resultSet.insertId !== undefined) {
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


    const saveTelephone = (idContact, utilId) => {

        db.transaction((tx) => {

            telephone.forEach((item) => {

                tx.executeSql(requetes.InsererTelephone, [item.tel_numero, item.tel_libelle, idContact, utilId])
            })
        })

    }

    const saveMail = (idContact, utilId) => {

        db.transaction((tx) => {

            mail.forEach((item) => {

                tx.executeSql(requetes.InsererMail,
                    [item.ml_mail, item.ml_libelle, idContact, utilId])
            })

        })
    }

    const saveAdresse = (idContact) => {

        db.transaction((tx) => {

            adresse.forEach((item) => {
                tx.executeSql(requetes.InsererAdresse,
                    [item.addr_ligne1, item.addr_ligne2, item.addr_ligne3, item.addr_cp, item.addr_bp, item.addr_pays, item.addr_ville, item.addr_libelle, idContact])
            })
        })
    }

    const saveInformation = async () => {


        if (contact.nom == '' && contact.prenom == '') {

            Alert.alert(

                'Information',
                'Veuillez ajouter un nom ou un prénom au minimun pour créer un contact',
                [{ text: "OK" }],
                { cancelable: false }
            )
        }

        else if (telephone[0].tel_numero == '' && mail[0].ml_mail == '') {

            Alert.alert(

                'Information',
                'Veuillez ajouter un numero ou un mail pour créer un contact',
                [{ text: "OK" }],
                { cancelable: false }
            )
        }

        else {

            const utilId = await getUtilId()

            try {

                saveContact(utilId).then((idContact) => {

                    saveTelephone(idContact, utilId)
                    saveMail(idContact, utilId)
                    saveAdresse(idContact, utilId)
                })

            }

            catch (error) {
                console.error("Une erreur est survenue lors d'enregistrement:", error)
                setLoading(false)
            }

            finally {

                redirection(true)

            }
        }

        //store.subscribe(() => console.log(store.getState().listTelephone))

    }


    return (

        <>

            <StatusBar backgroundColor={bleu} />

            <Appbar.Header style={{ backgroundColor: bleu }}>
                <Appbar.Action icon="close" size={30} onPress={() => redirection(false)} color={blanc} />
                <Appbar.Content title="Créer un contact" color={blanc} titleStyle={{ alignSelf: 'center' }} />
                <Appbar.Action icon="check" size={30} onPress={saveInformation} color={blanc} />
            </Appbar.Header>

            <EtatContact paramEtat={contact.etat} onChangeEtat={(etat) => setContact({ ...contact, etat: etat })} />

            <ScrollView style={{ flex: 1, backgroundColor: blanc }}>

                <View style={{ alignItems: "center" /*backgroundColor: blanc*/ }}>

                    <View style={{ flex: 1, padding: 10 }} />

                    <ChampPhoto paramPhoto={contact.photo} sourceId={contact.sourceId} onChangePhoto={(photo) => setContact(prevEtat => ({ ...prevEtat, photo: photo }))} />

                    <ChampPrenom paramPrenom={contact.prenom} sourceId={contact.sourceId} onChangePrenom={(prenom) => setContact({ ...contact, prenom: prenom })} />

                    <ChampNom paramNom={contact.nom} sourceId={contact.sourceId} onChangeNom={(nom) => setContact({ ...contact, nom: nom })} />

                    <ChampPrenomUsage paramPrenomUsage={contact.prenomUsage} sourceId={contact.sourceId} onChangePrenomUsage={(prenomUsage) => setContact({ ...contact, prenomUsage: prenomUsage })} />

                    <ChampGroupe />

                    <ChampEntreprise paramEntreprise={contact.entreprise} sourceId={contact.sourceId} onChangeEntreprise={(entreprise) => setContact({ ...contact, entreprise: entreprise })} />

                    <ChampFonction paramFonction={contact.fonction} sourceId={contact.sourceId} onChangeFonction={(fonction) => setContact({ ...contact, fonction: fonction })} />

                    <ChampTelephone paramTelephone={telephone} onChangeTelephone={setTelephone} />

                    <ChampEmail paramMail={mail} onChangeMail={setMail} />

                    <TouchableOpacity onPress={() => setAfficherAutreChamp(!afficherAutreChamp)}>

                        {!afficherAutreChamp ?
                            <Text style={{ paddingRight: 170, paddingTop: 15, fontSize: 17, marginBottom: 20, color: "#708090" }}>Autres champs?</Text> : null
                        }

                    </TouchableOpacity>

                    {afficherAutreChamp ? (

                        <>

                            <ChampDate paramDate={contact.date} sourceId={contact.sourceId} onChangeDate={(date) => setContact({ ...contact, date: date })} />

                            <ChampNote paramNote={contact.note} sourceId={contact.sourceId} onChangeNote={(note) => setContact({ ...contact, note: note })} />

                            <ChampAdresse paramAdresse={adresse} onChangeAdresse={setAdresse} />

                            <ChampService paramServie={contact.service} sourceId={contact.sourceId} onChangeService={(service) => setContact({ ...contact, service: service })} />

                            <ChampSiteWeb paramSiteWeb={contact.siteWeb} sourceId={contact.sourceId} onChangeSiteWeb={(siteWeb) => setContact({ ...contact, siteWeb: siteWeb })} />

                            <ChampTwitter paramTwitter={contact.twitter} sourceId={contact.sourceId} onChangeTwitter={(twitter) => setContact({ ...contact, twitter: twitter })} />

                            <ChampLinkedin paramLinkedin={contact.linkedin} sourceId={contact.sourceId} onChangeLinkedin={(linkedin) => setContact({ ...contact, linkedin: linkedin })} />

                            <ChampFacebook paramFacebook={contact.facebook} sourceId={contact.sourceId} onChangeFacebook={(facebook) => setContact({ ...contact, facebook: facebook })} />

                            <ChampSkype paramSkype={contact.skype} sourceId={contact.sourceId} onChangeSkype={(skype) => setContact({ ...contact, skype: skype })} />

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