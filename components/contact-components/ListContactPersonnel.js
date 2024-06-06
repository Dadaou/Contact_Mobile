
import { useCallback } from 'react'
import CustomFlatlist from './CustomFlatlist'
import { store } from '../redux/dataStore'
import { updateNombreContactPersonnel } from '../redux/action/globalDataAction'

const ListContactPersonnel = () => {

    const sourceId = [1]
    const requete = "SELECT contact.ctt_id, contact.src_id, contact.ctt_photo, contact.ctt_prenom, contact.ctt_nom, contact.ctt_prenom_usage, contact.ctt_favoris, GROUP_CONCAT(DISTINCT telephone.tel_numero) AS telephone, GROUP_CONCAT(DISTINCT mail.ml_mail) AS mail FROM contact, telephone, mail WHERE telephone.ctt_id = contact.ctt_id AND mail.ctt_id = contact.ctt_id AND contact.src_id = ? GROUP BY contact.ctt_id ORDER BY ctt_prenom ASC, ctt_nom ASC"

    const handleTotalChange = useCallback((total) => { // total nombre contact perso
        store.dispatch(updateNombreContactPersonnel(total))
    }, [])

    return (
        <CustomFlatlist
            onTotalChange={handleTotalChange}
            requete={requete}
            paramRequete={sourceId}
        />
    )

}

export default ListContactPersonnel