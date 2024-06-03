import { useCallback } from "react"
import CustomFlatlist from "./CustomFlatlist"
import { store } from "../redux/dataStore"
import { updateNombreContact } from "../redux/action/globalDataAction"

const ListContact = () => {

    const requete = "SELECT ctt_id, ctt_photo, ctt_prenom, ctt_nom, ctt_favoris FROM contact ORDER BY ctt_prenom ASC, ctt_nom ASC"
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