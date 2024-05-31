
import { useCallback } from 'react'
import CustomFlatlist from './CustomFlatlist'
import { store } from '../redux/dataStore'
import { updateNombreContactPersonnel } from '../redux/action/globalDataAction'

const ListContactPersonnel = () => {

    const sourceId = [1]
    const requete = "SELECT ctt_id, ctt_photo, ctt_prenom, ctt_nom, ctt_favoris FROM contact WHERE src_id = ? ORDER BY ctt_prenom ASC, ctt_nom ASC"

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