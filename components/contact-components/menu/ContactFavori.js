import HeaderPrincipal from "../HeaderPrincipal"
import ListFavori from "../ListFavori"
import { PaperProvider } from 'react-native-paper'

const ContactFavori = () => {

    const titre = "Contacts favoris"

    return (

        <PaperProvider>
            <HeaderPrincipal titre={titre} />
            <ListFavori />
        </PaperProvider>

    )


}


export default ContactFavori