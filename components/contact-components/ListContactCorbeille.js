
import { useCallback } from 'react'
import CustomFlatlist from './CustomFlatlist'
import { store } from '../redux/dataStore'
import { updateNombreContactCorbeille } from '../redux/action/globalDataAction'

const ListContactPersonnel = () => {

    const estDansLaCorbeille = 1
    const etatContact = 0
    const paramRequete = [estDansLaCorbeille, etatContact]

    const requete = "SELECT c.ctt_id, c.src_id, c.ctt_photo, c.ctt_prenom, c.ctt_nom, c.ctt_prenom_usage, c.ctt_favoris, c.ctt_corbeille, GROUP_CONCAT(DISTINCT t.tel_numero) AS telephone, GROUP_CONCAT(DISTINCT m.ml_mail) AS mail FROM contact c LEFT JOIN telephone t ON c.ctt_id = t.ctt_id LEFT JOIN mail m ON c.ctt_id = m.ctt_id WHERE c.ctt_corbeille = ? AND c.ctt_etat = ? GROUP BY c.ctt_id ORDER BY c.ctt_prenom ASC, c.ctt_nom ASC"

    const handleTotalChange = useCallback((total) => { // total nombre contact dans la corbeille
        store.dispatch(updateNombreContactCorbeille(total))
    }, [])

    return (
        <CustomFlatlist
            onTotalChange={handleTotalChange}
            requete={requete}
            paramRequete={paramRequete}
        />
    )

}

export default ListContactPersonnel