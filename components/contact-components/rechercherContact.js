import { View, TextInput, StyleSheet } from "react-native"

const RechercherContact = () => {

    return (

        <>
            <View>

                <TextInput

                    style={styles.champDeRecherche}
                    placeholder="Rechercher un contact" />
            </View>

        </>
    )
}


const styles = StyleSheet.create({


    champDeRecherche: {
        
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
    },

})

export default RechercherContact;