import ListContact from '../ListContact'
import BoutonAjoutContact from '../BoutonAjoutContact'
import HeaderPrincipal from "../HeaderPrincipal"
import ChampRechercheContact from '../champ/ChampRechercheContact'

const TousLesContacts = () => {

    const titre = "Tous les contacts"

    return (

        <>
            <HeaderPrincipal titre={titre} />
            <ChampRechercheContact />
            <ListContact />
            <BoutonAjoutContact />
        </>

    )
}

export default TousLesContacts

