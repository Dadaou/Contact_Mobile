import { StyleSheet } from "react-native";
import { useState } from "react"
import { Searchbar } from 'react-native-paper'
import filter from "lodash.filter"

const ChampRechercheContact = ({ dataCopie, onSearch, onFindNoResult }) => {

    const [searchQuery, setSearchQuery] = useState("")


    const rechercherContact = (motCle) => {

        setSearchQuery(motCle)

        const formatedMotCle = motCle.toLowerCase()
        const dataFiltrer = filter(dataCopie, (contact) => {
            return contient(contact, formatedMotCle)
        })

        if (dataFiltrer.length === 0) onFindNoResult("Aucun contact trouvé")

        onSearch(dataFiltrer)
    }

    const contient = ({ ctt_nom, ctt_prenom, ctt_prenom_usage, telephone, mail }, motCle) => {


        const cleanedMotCle = motCle.replace(/\s+/g, '')

        const cleanedNom = ctt_nom ? ctt_nom.replace(/\s+/g, '').toLowerCase() : ''
        const cleanedPrenom = ctt_prenom ? ctt_prenom.replace(/\s+/g, '').toLowerCase() : ''
        const cleanedPrenomNom = `${cleanedPrenom}${cleanedNom}`
        const cleanedNomPrenom = `${cleanedNom}${cleanedPrenom}`
        const cleanedPrenomUsage = ctt_prenom_usage ? ctt_prenom_usage.replace(/\s+/g, '').toLowerCase() : ''
        const cleanedTelephones = telephone ? telephone.split(',').map(tel => tel.replace(/\s+/g, '')) : []
        const cleanedMail = mail ? mail.split(',').map(ml => ml.replace(/\s+/g, '')) : []

        if (

            cleanedPrenomNom.includes(cleanedMotCle) ||
            cleanedNomPrenom.includes(cleanedMotCle) ||
            cleanedPrenomUsage.includes(cleanedMotCle) ||
            cleanedTelephones.some(tel => tel.includes(cleanedMotCle)) ||
            cleanedMail.some(ml => ml.includes(cleanedMotCle))
        ) {
            return true
        }

        return false
    }

    return (
        <Searchbar
            style={styles.input}
            inputMode="search"
            placeholder="Rechercher un contact"
            onChangeText={(motCle) => rechercherContact(motCle)}
            value={searchQuery}
            elevation={5}
        />
    )
}


const styles = StyleSheet.create({

    input: {

        margin: 10,
        backgroundColor: "#F2F3F4",

    }

})

export default ChampRechercheContact