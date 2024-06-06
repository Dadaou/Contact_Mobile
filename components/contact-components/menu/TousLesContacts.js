import ListContact from '../ListContact'
import BoutonAjoutContact from '../BoutonAjoutContact'
import HeaderPrincipal from "../HeaderPrincipal"

const TousLesContacts = () => {

    const titre = "Tous les contacts"

    return (

        <>
            <HeaderPrincipal titre={titre} />
            <ListContact />
            <BoutonAjoutContact />
        </>

    )
}

export default TousLesContacts

