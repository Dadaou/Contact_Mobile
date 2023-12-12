
import { useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, TextInput, Text, Button, TouchableOpacity, StyleSheet } from "react-native"


const FormulaireAuthentification = () => {

    const [identifiant, setIdentifiant] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const [afficherMotDePasse, setAfficherMotDePasse] = useState(false)
    const [boutonDesactive, setBoutonDesactive] = useState(true)

    const toggleAfficherMotDePasse = () => {
        setAfficherMotDePasse(!afficherMotDePasse)
    }


    useEffect(() => {

        if (identifiant !== '' && motDePasse !== '') {
            setBoutonDesactive(false); // Activez le bouton
        } else {
            setBoutonDesactive(true); // Désactivez le bouton
        }
    }, [identifiant, motDePasse]);

    const navigation = useNavigation()

    /*const accederAccueil = () => {
        navigation.navigate('Accueil');
    }*/


    return (

        
            <View style={{marginBottom : 90}}>

                <View style={styles.inputSection}>

                    <TextInput
                        placeholder="Identifiant"
                        onChangeText={(text) => setIdentifiant(text)}
                        value={identifiant} />
                </View>

                <View style={styles.inputSection}>

                    <TextInput
                        style={styles.champMotDepasse}
                        placeholder="Mot de passe"
                        onChangeText={(text) => setMotDePasse(text)}
                        secureTextEntry={!afficherMotDePasse}
                        value={motDePasse} />

                    <TouchableOpacity style={styles.eyeIcon} onPress={toggleAfficherMotDePasse}>
                        <FontAwesome
                            name={afficherMotDePasse ? 'eye-slash' : 'eye'}
                            size={15} />
                    </TouchableOpacity>

                </View>

                <Button title="CONNEXION" disabled={boutonDesactive} onPress={() => navigation.navigate('Accueil')} />

                <TouchableOpacity>
                    <Text style={{ textAlign: 'right', color: '#1685E7', paddingTop: 15 }}>Mot de passe oublié?</Text>
                </TouchableOpacity>

            </View>
    );
};


const styles = StyleSheet.create({

    champMotDepasse: {
        flex: 1,
    },

    inputSection: {

        flexDirection: "row",
        alignItems: 'center',
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 10
    },

    eyeIcon: {
        padding: 1
    }

})

export default FormulaireAuthentification