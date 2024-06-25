import HeaderPrincipal from "../HeaderPrincipal"
import ListContactCorbeille from "../ListContactCorbeille"
import { PaperProvider } from 'react-native-paper'

const ContactCorbeille = () => {

    const titre = "Corbeille"

    return (

        <PaperProvider>
            <HeaderPrincipal titre={titre} />
            <ListContactCorbeille />
        </PaperProvider>

    )


}


export default ContactCorbeille