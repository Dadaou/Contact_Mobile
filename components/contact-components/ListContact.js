import { useCallback } from "react"
import CustomFlatlist from "./CustomFlatlist"
import { store } from "../redux/dataStore"
import { updateNombreContact } from "../redux/action/globalDataAction"

const ListContact = () => {


    const requete = "SELECT c.ctt_id, c.src_id, c.ctt_photo, c.ctt_prenom, c.ctt_nom, c.ctt_prenom_usage, c.ctt_favoris, GROUP_CONCAT(DISTINCT t.tel_numero) AS telephone, GROUP_CONCAT(DISTINCT m.ml_mail) AS mail FROM contact c LEFT JOIN telephone t ON c.ctt_id = t.ctt_id LEFT JOIN mail m ON c.ctt_id = m.ctt_id GROUP BY c.ctt_id ORDER BY c.ctt_prenom ASC, c.ctt_nom ASC"

    const handleTotalChange = useCallback((total) => { // total nombre de tous les contacts
        store.dispatch(updateNombreContact(total))
    }, [])

    return (
        <CustomFlatlist
            onTotalChange={handleTotalChange}
            requete={requete}
        />
    )
}

export default ListContact