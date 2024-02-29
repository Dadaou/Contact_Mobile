import uriLogo from '../../Utils/UriLogo.js'
import { View, Text, Image, StyleSheet, StatusBar, ScrollView } from "react-native"
import FormulaireAuthentification from "../login-components/FormulaireAuthentification.js"


const Login = () => {

    const logo = [uriLogo.urlLogoAchat, uriLogo.urlLogoContact, uriLogo.urlLogoBulletin, uriLogo.urlTreso, uriLogo.urlTableur, uriLogo.urlTexteur, uriLogo.urlLogoMessagerie, uriLogo.urlLogoAgenda]

    return (

        <ScrollView>

            <View style={styles.container}>

                <View style={{ marginBottom: 10 }}>

                    <View>
                        <Image source={{ uri: uriLogo.urlLogoManao }} style={styles.logoPrincipalManao} />
                        <Text style={styles.descriptionManao}>Plateforme logicielle pour l'organisation et la gestion d'entreprises</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        {logo.map((url, index) => (
                            <Image key={index} source={{ uri: url }} style={styles.logo} />
                        ))}
                    </View>

                </View>

                <FormulaireAuthentification />

                <Text style={{ textAlign: 'center' }}>Manao© 2024</Text>

            </View>

        </ScrollView>


    );
};

const styles = StyleSheet.create({

    container: {

        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70
    },

    descriptionManao: {

        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: "bold"
    },

    logoPrincipalManao: {
        width: 295,
        height: 130
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