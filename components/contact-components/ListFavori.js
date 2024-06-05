import { useCallback } from 'react'
import CustomFlatlist from './CustomFlatlist'
import { store } from '../redux/dataStore'
import { updateNombreFavori } from '../redux/action/globalDataAction'

const ListFavori = () => {

    const requete = "SELECT ctt_id, src_id, ctt_photo, ctt_prenom, ctt_nom, ctt_favoris FROM contact WHERE ctt_favoris = ? ORDER BY ctt_prenom ASC, ctt_nom ASC"
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