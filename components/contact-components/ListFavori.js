import { useCallback } from 'react'
import CustomFlatlist from './CustomFlatlist'
import { store } from '../redux/dataStore'
import { updateNombreFavori } from '../redux/action/globalDataAction'

const ListFavori = () => {
    const requete = "SELECT contact.ctt_id, contact.src_id, contact.ctt_photo, contact.ctt_prenom, contact.ctt_nom, contact.ctt_prenom_usage, contact.ctt_favoris, GROUP_CONCAT(DISTINCT telephone.tel_numero) AS telephone, GROUP_CONCAT(DISTINCT mail.ml_mail) AS mail FROM contact, telephone, mail WHERE telephone.ctt_id = contact.ctt_id AND mail.ctt_id = contact.ctt_id AND contact.ctt_favoris = ? GROUP BY contact.ctt_id ORDER BY ctt_prenom ASC, ctt_nom ASC"
    const favori = [1]
    const textAAfficherSiAucunFavori = "Aucun contact favori"

    const handleTotalChange = useCallback((total) => { // total nombre tous les contacts
        store.dispatch(updateNombreFavori(total))
    }, [])

    return (
        <CustomFlatlist
            onTotalChange={handleTotalChange}
            texteSiListVide={textAAfficherSiAucunFavori}
            requete={requete}
            paramRequete={favori}
        />
    )
}

export default ListFavori