import { useCallback } from 'react'
import CustomFlatlist from './CustomFlatlist'
import { store } from '../redux/dataStore'
import { updateNombreFavori } from '../redux/action/globalDataAction'

const ListFavori = () => {

    const favori = 1
    const etatContact = 0
    const paramRequete = [favori, etatContact]

    const requete = "SELECT c.ctt_id, c.src_id, c.ctt_photo, c.ctt_prenom, c.ctt_nom, c.ctt_prenom_usage, c.ctt_favoris, GROUP_CONCAT(DISTINCT t.tel_numero) AS telephone, GROUP_CONCAT(DISTINCT m.ml_mail) AS mail FROM contact c LEFT JOIN telephone t ON c.ctt_id = t.ctt_id LEFT JOIN mail m ON c.ctt_id = m.ctt_id WHERE c.ctt_favoris = ? AND c.ctt_etat = ? GROUP BY c.ctt_id ORDER BY c.ctt_prenom ASC, c.ctt_nom ASC"
    const textAAfficherSiAucunFavori = "Aucun contact favori"

    const handleTotalChange = useCallback((total) => { // total nombre tous les contacts
        store.dispatch(updateNombreFavori(total))
    }, [])

    return (
        <CustomFlatlist
            onTotalChange={handleTotalChange}
            texteSiListVide={textAAfficherSiAucunFavori}
            requete={requete}
            paramRequete={paramRequete}
        />
    )
}

export default ListFavori