
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
            setBoutonDesactive(false) 
        } else {
            setBoutonDesactive(true) 
        }
    }, [identifiant, motDePasse])

    const navigation = useNavigation()

    /*const accederAccueil = () => {
        navigation.navigate('Accueil');
    }*/


    return (

        
            <View style={{marginBottom : 100}}>

                <View style={styles.inputSection}>

                    <TextInput
                        style = {{fontSize : 16}}
                        placeholder="Identifiant"
                        onChangeText={(text) => setIdentifiant(text)}
                        value={identifiant} />
                </View>

                <View style={styles.inputSection}>

                    <TextInput
                        style={{flex : 1, fontSize : 16}}
                        placeholder="Mot de passe"
                        onChangeText={(text) => setMotDePasse(text)}
                        secureTextEntry={!afficherMotDePasse}
                        value={motDePasse} />

                    <TouchableOpacity style={styles.eyeIcon} onPress={toggleAfficherMotDePasse}>
                        <FontAwesome
                            name={afficherMotDePasse ? 'eye-slash' : 'eye'}
                            size={18} />
                    </TouchableOpacity>

                </View>


                <TouchableOpacity onPress={() => navigation.navigate('Accueil')} disabled={boutonDesactive} style={boutonDesactive ? styles.butonDesactive : styles.butonActive}>
                    <Text style={boutonDesactive ? styles.textDesactive : styles.textActive}>CONNEXION</Text>
                </TouchableOpacity>


                <TouchableOpacity>
                    <Text style={{ textAlign: 'right', color: '#1685E7', paddingTop: 15 }}>Mot de passe oublié?</Text>
                </TouchableOpacity>

            </View>
    );
};


const styles = StyleSheet.create({

 
    inputSection: {

        flexDirection: "row",
        alignItems: 'center',
        height: 50,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 10,
        borderRadius : 7,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF"
    },

    eyeIcon: {
        padding: 1
    },

    butonActive: {

        backgroundColor: '#0096FF',
        borderRadius: 7,
        paddingVertical: 10,
        paddingHorizontal: 12,
        height : 50
    },

    butonDesactive: {
       
        elevation: 8,
        backgroundColor: '#D3D3D3',
        opacity: 0.3, 
        borderRadius: 7,
        paddingVertical: 10,
        paddingHorizontal: 12,
        height : 50
    },

    textActive: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center"
    },

    textDesactive: {
        fontSize: 18,
        color: '#000D0D',
        fontWeight: "bold",
        alignSelf: "center",
    }

})

export default FormulaireAuthentification