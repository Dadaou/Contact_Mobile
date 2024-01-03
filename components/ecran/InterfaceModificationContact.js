import requetes from '../../constant/RequeteSql'
import { useState, useEffect } from 'react'
import * as SQLite from 'expo-sqlite'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, StatusBar } from "react-native"
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
import ChampTwitter from '../contact-components/champ/ChampTwitter'
import ChampLinkedin from '../contact-components/champ/ChampLinkedin'
import ChampFacebook from '../contact-components/champ/ChampFacebook'
import ChampSkype from '../contact-components/champ/ChampSkype'

const  ModificationContact = ({ navigation, route }) => {


    const { ctt_id } = route.params
    const db = SQLite.openDatabase('Contact.db')

    const [photo, setPhoto] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [prenomUsage, setPrenomUsage] = useState('')
    const [groupe, setGroupe] = useState('')
    const [entreprise, setEntreprise] = useState('')
    const [fonction, setFonction] = useState('')
    const [telephone, setTelephone] = useState([{ tel_libelle: "", tel_numero: "", tel_code_pays : "33" }])
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

    const getInfoContact = () => {

        db.transaction((tx) => {

            tx.executeSql(requetes.GetContact, [ctt_id],
                (_, resultSet) => {
                    //console.log(resultSet.rows._array)
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
                },
                (_, error) => console.log(error)
            )

            tx.executeSql(requetes.GetTelephone, [ctt_id],
                (_, resultSet) => {
                    //console.log(resultSet.rows._array)
                    setTelephone(resultSet.rows._array)
                },
                (_, error) => console.log(error)
            )

            tx.executeSql(requetes.GetMail, [ctt_id],
                (_, resultSet) => {
                    //console.log(resultSet.rows._array)
                    setMail(resultSet.rows._array)
                },
                (_, error) => console.log(error)
            )

            tx.executeSql(requetes.GetAdresse, [ctt_id],
                (_, resultSet) => {
                    //console.log(resultSet.rows._array)
                    setAdresse(resultSet.rows._array)
                },
                (_, error) => console.log(error)
            )

        })

    }

    const misAJourInfoContact = () => {

        db.transaction((tx) => {

            tx.executeSql(requetes.SupprTelephone, [ctt_id]) 
            tx.executeSql(requetes.SupprMail, [ctt_id]) 
            tx.executeSql(requetes.SupprAdresse, [ctt_id]) 
            
            tx.executeSql(requetes.MajContact, 
                         [photo, nom, prenom, prenomUsage, entreprise, service, fonction, date, siteWeb, twitter, linkedin, facebook, skype, note, etat, ctt_id]
            ) 

            telephone.forEach((item) => {

                tx.executeSql( "INSERT INTO telephone (tel_numero, tel_code_pays, tel_libelle, ctt_id) VALUES (?,?,?,?)", 
                               [item.tel_numero, item.tel_code_pays, item.tel_libelle, ctt_id]
                )

            })

            mail.forEach((item) => {

                tx.executeSql("INSERT INTO mail (ml_mail, ml_libelle, ctt_id) VALUES (?,?,?)", 
                              [item.ml_mail, item.ml_libelle, ctt_id]
                )

            })

            adresse.forEach((item) => {

                tx.executeSql("INSERT INTO adresse (addr_ligne1, addr_ligne2, addr_ligne3, addr_cp, addr_bp, addr_pays, addr_ville, addr_libelle, ctt_id) VALUES (?,?,?,?,?,?,?,?,?)", 
                              [item.addr_ligne1, item.addr_ligne2, item.addr_ligne3, item.addr_cp, item.addr_bp, item.addr_pays, item.addr_ville, item.addr_libelle, ctt_id]

                )

            })
        
        })

        redirection()

    }


    useEffect(() => { 
        getInfoContact()
    }, [])

    
    const redirection = () => {

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

        navigation.navigate('DetailContact', { ctt_id: ctt_id })

    }


    return (


        <SafeAreaView style={styles.container}>

            <View style={styles.header}>

                <StatusBar  backgroundColor = "#005F9D"/>  

                <TouchableOpacity style={{ right: 30 }} onPress={redirection}>
                    <Octicons name="x" size={35} color="#FEFFFF" />
                </TouchableOpacity>

                <View /*style = {{flex : 0}}*/>
                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#FEFFFF" }}>Modifier un contact</Text>
                </View>

                <TouchableOpacity style={{ left: 30 }}/*style={{ flex : 0.4, backgroundColor: "#DBAF2F", paddingLeft: 4, borderRadius : 20 }}*/
                    onPress={misAJourInfoContact}>

                    <Octicons name="check" size={35} color="#FEFFFF" />

                </TouchableOpacity>

            </View>



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
                            <Text style={{ paddingRight: 170, paddingTop: 15, fontSize: 17, marginBottom: 20, color: "#C19A6B" }}>Autres champs?</Text> : null
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
        //flex : 0.3,
        flexDirection: "row",
        padding: 16,
        justifyContent: 'center'

    }

})
     

export default  ModificationContact