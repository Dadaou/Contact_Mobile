import ListContactPersonnel from '../ListContactPersonnel'
import BoutonAjoutContact from '../BoutonAjoutContact'
import HeaderPrincipal from "../HeaderPrincipal"
import ChampRechercheContact from '../champ/ChampRechercheContact'

const ContactPersonnel = () => {

    const titre = "Contacts personnels"

    return (

        <>
            <HeaderPrincipal titre={titre} />
            <ChampRechercheContact />
            <ListContactPersonnel />
            <BoutonAjoutContact />
        </>

    )

}

export default ContactPersonnel