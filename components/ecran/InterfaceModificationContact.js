import requetes from '../utils/RequeteSql'
import { dbLocalName, blanc, bleu } from '../utils/Constant'
import { useState, useEffect, useCallback } from 'react'
import { getUtilId } from '../utils/utils'
import * as SQLite from 'expo-sqlite'
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from "react-native"
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

    const { ctt_id, src_id, favori } = route.params
    const db = SQLite.openDatabase(dbLocalName)
    const estMaj = 1

    const [contact, setContact] = useState({})
    const [telephone, setTelephone] = useState([])
    const [mail, setMail] = useState([{ ml_libelle: "", ml_mail: "" }])
    const [adresse, setAdresse] = useState([{ addr_ligne1: "", addr_ligne2: "", addr_ligne3: "", addr_ville: "", addr_pays: "", addr_bp: "", addr_cp: "", addr_libelle: "" }])
    const [afficherAutreChamp, setAfficherAutreChamp] = useState(false)


    const getContact = useCallback(() => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(requetes.GetContact, [ctt_id],
                    (_, resultSet) => {
                        resolve(resultSet.rows._array[0])
                    },
                    (_, error) => reject(error)
                )
            })

        })

    }, [])

    const getTelephone = useCallback(() => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(requetes.GetTelephone, [ctt_id],
                    (_, resultSet) => {
                        resolve(resultSet.rows._array)
                    },
                    (_, error) => reject(error)
                )
            })

        })

    }, [])


    const getMail = useCallback(() => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(requetes.GetMail, [ctt_id],
                    (_, resultSet) => {
                        resolve(resultSet.rows._array)
                    },
                    (_, error) => reject(error)
                )
            })

        })

    }, [])


    const getAdresse = useCallback(() => {

        return new Promise((resolve, reject) => {

            db.transaction((tx) => {

                tx.executeSql(requetes.GetAdresse, [ctt_id],
                    (_, resultSet) => {

                        if (resultSet.rows._array.length === 0) {
                            resolve([{ addr_ligne1: "", addr_ligne2: "", addr_ligne3: "", addr_ville: "", addr_pays: "", addr_bp: "", addr_cp: "", addr_libelle: "" }])
                        }
                        else {
                            resolve(resultSet.rows._array)
                        }
                    },
                    (_, error) => reject(error)
                )
            })

        })

    }, [])


    const getInfoContact = async () => {

        const contactResult = await getContact()
        const telephoneResult = await getTelephone()
        const mailResult = await getMail()
        const adresseResult = await getAdresse()

        setContact(contactResult)
        setTelephone(telephoneResult)
        setMail(mailResult)
        setAdresse(adresseResult)
    }



    const misAJourInfoContact = async () => {

        if (contact.ctt_nom == '' && contact.ctt_prenom == '') {

            Alert.alert(

                'Information',
                'Veuillez ne pas laisser le nom ou le prénom vide',
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

                db.transaction((tx) => {

                    try {

                        tx.executeSql(requetes.SupprTelephone, [ctt_id])
                        tx.executeSql(requetes.SupprMail, [ctt_id])
                        tx.executeSql(requetes.SupprAdresse, [ctt_id])

                        tx.executeSql(requetes.MajContact,
                            [contact.ctt_photo, contact.ctt_nom, contact.ctt_prenom, contact.ctt_prenom_usage, contact.ctt_entreprise, contact.ctt_service, contact.ctt_fonction,
                            contact.ctt_anniversaire, contact.ctt_siteweb, contact.ctt_twitter, contact.ctt_linkedin, contact.ctt_facebook, contact.ctt_skype, contact.ctt_notes,
                            contact.ctt_etat, estMaj, ctt_id])

                        telephone.forEach((item) => {
                            tx.executeSql(requetes.InsererTelephone, [item.tel_numero, item.tel_libelle, ctt_id, utilId])
                        })

                        mail.forEach((item) => {
                            tx.executeSql(requetes.InsererMail, [item.ml_mail, item.ml_libelle, ctt_id, utilId])
                        })

                        adresse.forEach((item) => {
                            tx.executeSql(requetes.InsererAdresse,
                                [item.addr_ligne1, item.addr_ligne2, item.addr_ligne3, item.addr_cp,
                                item.addr_bp, item.addr_pays, item.addr_ville, item.addr_libelle, ctt_id])
                        })
                    }

                    catch (error) {
                        console.error("Erreur lors de l'exécution des requêtes d'insertion:", error)
                    }

                    finally {
                        redirection(true, 'Contact modifié')
                    }
                })


            }

            catch (error) {
                console.error("Une erreur est survenue lors de la transaction:", error)
            }

            finally {
                redirection(true, 'Contact modifié')
            }
        }

    }


    const redirection = (showModal, msgToast = "") => {

        setContact({})
        setTelephone([])
        setMail([{ ml_libelle: "", ml_mail: "" }])
        setAdresse([{ addr_ligne1: "", addr_ligne2: "", addr_ligne3: "", addr_ville: "", addr_pays: "", addr_bp: "", addr_cp: "", addr_libelle: "" }])
        navigation.navigate('DetailContact', { ctt_id: ctt_id, src_id: src_id, showModal: showModal, msgToast : msgToast, favori : favori })

    }

    useEffect(() => {
        getInfoContact()
    }, [])


    return (

        <>

            <StatusBar backgroundColor={bleu} barStyle="light-content" />

            <Appbar.Header style={{ backgroundColor: bleu }}>
                <Appbar.Action icon="close" size={30} onPress={() => redirection(false, "")} color={blanc} />
                <Appbar.Content title="Modifier un contact" color={blanc} titleStyle={{ alignSelf: 'center' }} />
                <Appbar.Action icon="check" size={30} onPress={misAJourInfoContact} color={blanc} />
            </Appbar.Header>

            <EtatContact paramEtat={contact.ctt_etat} onChangeEtat={(etat) => setContact({ ...contact, ctt_etat: etat })} />

            <ScrollView style={{ flex: 1, backgroundColor: blanc }}>

                <View style={{ alignItems: "center" }}>

                    <View style={{ flex: 1, padding: 10 }} />

                    <ChampPhoto paramPhoto={contact.ctt_photo} sourceId={contact.src_id} onChangePhoto={(photo) => setContact(prevEtat => ({ ...prevEtat, ctt_photo: photo }))} />

                    <ChampPrenom paramPrenom={contact.ctt_prenom} sourceId={contact.src_id} onChangePrenom={(prenom) => setContact({ ...contact, ctt_prenom: prenom })} />

                    <ChampNom paramNom={contact.ctt_nom} sourceId={contact.src_id} onChangeNom={(nom) => setContact({ ...contact, ctt_nom: nom })} />

                    <ChampPrenomUsage paramPrenomUsage={contact.ctt_prenom_usage} sourceId={contact.src_id} onChangePrenomUsage={(prenomUsage) => setContact({ ...contact, ctt_prenom_usage: prenomUsage })} />

                    <ChampGroupe />

                    <ChampEntreprise paramEntreprise={contact.ctt_entreprise} sourceId={contact.src_id} onChangeEntreprise={(entreprise) => setContact({ ...contact, ctt_entreprise: entreprise })} />

                    <ChampFonction paramFonction={contact.ctt_fonction} sourceId={contact.src_id} onChangeFonction={(fonction) => setContact({ ...contact, ctt_fonction: fonction })} />

                    <ChampTelephone paramTelephone={telephone} onChangeTelephone={setTelephone} />

                    <ChampEmail paramMail={mail} onChangeMail={setMail} />

                    <TouchableOpacity onPress={() => setAfficherAutreChamp(!afficherAutreChamp)}>

                        {!afficherAutreChamp ?
                            <Text style={{ paddingRight: 170, paddingTop: 15, fontSize: 17, marginBottom: 20, color: "#708090" }}>Autres champs?</Text> : null
                        }

                    </TouchableOpacity>

                    {afficherAutreChamp ? (

                        <>

                            <ChampDate paramDate={contact.ctt_anniversaire} sourceId={contact.src_id} onChangeDate={(date) => setContact({ ...contact, ctt_anniversaire: date })} />

                            <ChampNote paramNote={contact.ctt_notes} sourceId={contact.src_id} onChangeNote={(note) => setContact({ ...contact, ctt_notes: note })} />

                            <ChampAdresse paramAdresse={adresse} onChangeAdresse={setAdresse} />

                            <ChampService paramServie={contact.ctt_service} sourceId={contact.src_id} onChangeService={(service) => setContact({ ...contact, ctt_service: service })} />

                            <ChampSiteWeb paramSiteWeb={contact.ctt_siteweb} sourceId={contact.src_id} onChangeSiteWeb={(siteWeb) => setContact({ ...contact, ctt_siteweb: siteWeb })} />

                            <ChampTwitter paramTwitter={contact.ctt_twitter} sourceId={contact.src_id} onChangeTwitter={(twitter) => setContact({ ...contact, ctt_twitter: twitter })} />

                            <ChampLinkedin paramLinkedin={contact.ctt_linkedin} sourceId={contact.src_id} onChangeLinkedin={(linkedin) => setContact({ ...contact, ctt_linkedin: linkedin })} />

                            <ChampFacebook paramFacebook={contact.ctt_facebook} sourceId={contact.src_id} onChangeFacebook={(facebook) => setContact({ ...contact, ctt_facebook: facebook })} />

                            <ChampSkype paramSkype={contact.ctt_skype} sourceId={contact.src_id} onChangeSkype={(skype) => setContact({ ...contact, ctt_skype: skype })} />
                        </>

                    ) : null
                    }

                </View>

            </ScrollView>

        </>

    )

}

export default ModificationContact