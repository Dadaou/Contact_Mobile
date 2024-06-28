import { useCallback } from "react"
import CustomFlatlist from "../CustomFlatlist"
import { store } from "../../redux/dataStore"
import { updateNombreContact } from "../../redux/action/globalDataAction"
import BoutonAjoutContact from '../BoutonAjoutContact'
import HeaderPrincipal from "../HeaderPrincipal"

const TousLesContacts = () => {

    const titre = "Tous les contacts"
    const screenId = 1
    const etatContact = 0
    const estDansLaCorbeille = 0
    const paramRequete = [etatContact, estDansLaCorbeille]
    const requete = "SELECT c.ctt_id, c.src_id, c.ctt_photo, c.ctt_prenom, c.ctt_nom, c.ctt_prenom_usage, c.ctt_favoris, GROUP_CONCAT(DISTINCT t.tel_numero) AS telephone, GROUP_CONCAT(DISTINCT m.ml_mail) AS mail FROM contact c LEFT JOIN telephone t ON c.ctt_id = t.ctt_id LEFT JOIN mail m ON c.ctt_id = m.ctt_id WHERE c.ctt_etat = ? AND c.ctt_corbeille = ? GROUP BY c.ctt_id ORDER BY c.ctt_prenom ASC, c.ctt_nom ASC"

    const handleTotalChange = useCallback((total) => { // total nombre de tous les contacts
        store.dispatch(updateNombreContact(total))
    }, [])

    return (

        <>
            <HeaderPrincipal titre={titre} />

            <CustomFlatlist
                screenId={screenId}
                onTotalChange={handleTotalChange}
                requete={requete}
                paramRequete={paramRequete}
            />

            <BoutonAjoutContact />
        </>

    )
}

export default TousLesContacts

