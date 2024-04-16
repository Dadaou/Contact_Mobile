import ListContact from '../ListContact'
import BoutonAjoutContact from '../BoutonAjoutContact'
import HeaderPrincipal from "../HeaderPrincipal"
import ChampRechercheContact from '../champ/ChampRechercheContact'
import { PaperProvider } from 'react-native-paper'
import BottomToast from '../../modal/BottomToast'

const TousLesContacts = () => {

    const titre = "Tous les contacts"

    return (

        <PaperProvider>
            <HeaderPrincipal titre={titre} />
            <ChampRechercheContact />
            <ListContact />
            <BoutonAjoutContact />
        </PaperProvider>

    )
}

export default TousLesContacts

