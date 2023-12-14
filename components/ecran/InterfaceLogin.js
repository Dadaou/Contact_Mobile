import urlLogo from "../../constant/Constant.js"
import {
    View,
    Text,
    Image,
    StyleSheet
} from "react-native"
import FormulaireAuthentification from "../login-components/FormulaireAuthentification.js"


const Login = () => {

    const logo = [urlLogo.urlLogoAchat, urlLogo.urlLogoContact, urlLogo.urlLogoBulletin, urlLogo.urlTreso, urlLogo.urlTableur, urlLogo.urlTexteur, urlLogo.urlLogoMessagerie, urlLogo.urlLogoAgenda]

    return (
        
            <View style={styles.container}>

                <View style={{marginBottom : 10}}>

                    <View> 
                        <Image source={{ uri: urlLogo.urlLogoManao }} style={styles.logoPrincipalManao} />
                        <Text style={styles.descriptionManao}>Plateforme logicielle pour l'organisation et la gestion d'entreprises</Text>
                    </View>

                    <View style={{  flexDirection: 'row' }}> 
                        {logo.map((url, index) => (
                            <Image key={index} source={{ uri: url }} style={styles.logo} />
                        ))}
                    </View>

                </View>

                <FormulaireAuthentification />

                <Text style = {{textAlign: 'center'}}>Manao© 2023</Text>
              
            </View>


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