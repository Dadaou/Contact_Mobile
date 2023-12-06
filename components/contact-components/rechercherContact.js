import {    View, 
    TextInput,
    Text,
    Button,
    TouchableOpacity,
    StyleSheet
} from "react-native"

const RechercherContact = () => {

    return (

        <>
            <View  style={styles.container}>

                <TextInput

                    style={styles.champDeRecherche}
                    placeholder="Rechercher des contacts" />

            </View>

        </>
    )
}


const styles = StyleSheet.create({

    container: {
        flex : 0
    },

    champDeRecherche: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
    },

})

export default RechercherContact;