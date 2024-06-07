import ListContactPersonnel from '../ListContactPersonnel'
import BoutonAjoutContact from '../BoutonAjoutContact'
import HeaderPrincipal from "../HeaderPrincipal"

const ContactPersonnel = () => {

    const titre = "Contacts personnels"

    return (

        <>
            <HeaderPrincipal titre={titre} />
            <ListContactPersonnel />
            <BoutonAjoutContact />
        </>

    )

}

export default ContactPersonnel