import {
    View,
    Text,
    Image,
    StyleSheet
} from "react-native";

import FormulaireAuthentification from "../login-components/formulaireAuthentification.js";

const Login = () => {

    const urlLogoManao = "https://identification.manao.eu/assets/img/manao.png"
    const urlLogoAchat = "https://licences.manao.eu/assets/img/manao_logiciels_new/achat-v2.png"
    const urlLogoContact = "https://licences.manao.eu/assets/img/manao_logiciels_new/logo-contacts.png"
    const urlLogoBulletin = "https://licences.manao.eu/assets/img/manao_logiciels_new/logo-bulletin.png"
    const urlTableur = "https://mdocs-beta.manao.eu/assets/css/icons_manao/mdoc_icon_tab.png"
    const urlTexteur = "https://licences.manao.eu/assets/img/manao_logiciels_new/logo-texteur.png"
    const urlTreso = "https://licences.manao.eu/assets/img/manao_logiciels_new/logo-treso.png"
    const urlLogoMessagerie = "https://licences.manao.eu/assets/img/manao_logiciels_new/logo-messagerie.png"
    const urlLogoAgenda = "https://licences.manao.eu/assets/img/manao_logiciels_new/agenda.png"


    const urlLogo = [urlLogoAchat, urlLogoContact, urlLogoBulletin, urlTreso, urlTableur, urlTexteur, urlLogoMessagerie, urlLogoAgenda]

    return (
        <>
            <View style={styles.container}>

                <View>
                    <Image source={{ uri: urlLogoManao }} style={styles.logoPrincipalManao} />
                    <Text style={styles.descriptionManao}>Plateforme logicielle pour l'organisation et la gestion d'entreprises</Text>
                </View>

                <View style={styles.containerLogo}>
                    {urlLogo.map((url, index) => (
                        <Image key={index} source={{ uri: url }} style={styles.logo} />
                    ))}
                </View>

                <FormulaireAuthentification />

               <Text>Manao© 2023</Text>

            </View>

        </>
    );
};

const styles = StyleSheet.create({

    container: {

        flexDirection: 'column',
        flex: 1,
        //marginTop: 140,
        justifyContent: 'center',
        alignItems: 'center',
    },

    descriptionManao: {

        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: "bold"
    },

    logoPrincipalManao: {
        width: 250,
        height: 110
    },

    bottomElement: {
        textAlign: 'center',
    },


    containerLogo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
        marginBottom: 20
    },

})

export default Login