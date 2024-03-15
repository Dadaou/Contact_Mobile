import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native"
import FormulaireAuthentification from "../contact-components/champ/FormulaireAuthentification.js"

const Login = ({onLogin}) => {

    return (

            <SafeAreaView style={styles.container}>

                <View>

                    <View>
                        <Image source={require("../../assets/manao.png")} style={styles.logoPrincipalManao} />
                        <Text style={styles.descriptionManao}>Plateforme logicielle pour l'organisation et la gestion d'entreprises</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        <Image source={require("../../assets/achat.png")} style={styles.logo} />
                        <Image source={require("../../assets/logo-contacts.png")} style={styles.logo} />
                        <Image source={require("../../assets/logo-bulletin.png")} style={styles.logo} />
                        <Image source={require("../../assets/logo-texteur.png")} style={styles.logo} />
                        <Image source={require("../../assets/tableur.png")} style={styles.logo} />
                        <Image source={require("../../assets/logo-treso.png")} style={styles.logo} />
                        <Image source={require("../../assets/logo-messagerie.png")} style={styles.logo} />
                        <Image source={require("../../assets/agenda.png")} style={styles.logo} />

                    </View>

                </View>

                <FormulaireAuthentification onLogin={onLogin}/>

                <Text style={{ textAlign: 'center' }}>Manao© 2024</Text>

            </SafeAreaView>


    );
};

const styles = StyleSheet.create({

    container: {

        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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