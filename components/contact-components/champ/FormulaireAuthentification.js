
import { useState, useEffect, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import SpinnerModal from '../../modal/Spinner'
import axios from 'axios'
import { bleu, blanc } from '../../utils/Constant'


const FormulaireAuthentification = ({ onLogin }) => {

    const [identifiant, setIdentifiant] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const [afficherMotDePasse, setAfficherMotDePasse] = useState(false)
    const [boutonDesactive, setBoutonDesactive] = useState(true)
    const [loading, setLoading] = useState(false)
    const [affiherErreurAuth, setAffiherErreurAuth] = useState(false)


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

    const authentification = useCallback(() => {

        setLoading(true)

        axios.post('https://api-licences.manao.eu/index.php/v1/authentification', {
            login: identifiant,
            mdp: motDePasse
        })

            .then(async res => {

                if (res.data.data) {

                    try {
                        await AsyncStorage.setItem(
                            '_token',
                            res.data.data.token,
                        )

                        setLoading(false)
                        onLogin()

                    } catch (error) { console.log(error) }
                }

            })

            .catch(() => {
                setLoading(false)
                setAffiherErreurAuth(true)
            })

    }, [identifiant, motDePasse, navigation])


    return (


        <View style={{ marginBottom: 100 }}>

            <View style={styles.inputSection}>

                <TextInput
                    style={styles.input}
                    label="Identifiant"
                    mode='outlined'
                    activeOutlineColor={bleu}
                    onChangeText={(text) => setIdentifiant(text)}
                    value={identifiant} />

                <TextInput
                    style={styles.input}
                    label="Mot de passe"
                    mode='outlined'
                    activeOutlineColor={bleu}
                    secureTextEntry={!afficherMotDePasse}
                    onChangeText={(text) => setMotDePasse(text)}
                    value={motDePasse}
                    right={afficherMotDePasse ? <TextInput.Icon icon="eye-off" onPress={toggleAfficherMotDePasse} /> : <TextInput.Icon icon="eye" onPress={toggleAfficherMotDePasse} />} />

            </View>


            {affiherErreurAuth && <Text style={{ textAlign: 'center', color: 'red', marginBottom: 10 }}>Identifiant et ou mot de passe incorrect!</Text>}

            <TouchableOpacity onPress={authentification} disabled={boutonDesactive} style={boutonDesactive ? styles.butonDesactive : styles.butonActive}>
                <Text style={boutonDesactive ? styles.textDesactive : styles.textActive}>CONNEXION</Text>
            </TouchableOpacity>


            <TouchableOpacity>
                <Text style={{ textAlign: 'right', color: bleu, paddingTop: 15 }}>Mot de passe oublié?</Text>
            </TouchableOpacity>

            <SpinnerModal isVisible={loading} />

        </View>
    );
};


const styles = StyleSheet.create({


    inputSection: {
        width: 300,
    },

    input: {
        backgroundColor: blanc,
        marginBottom: 15
    },


    butonActive: {

        backgroundColor: bleu,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12,
        height: 50
    },

    butonDesactive: {

        elevation: 8,
        backgroundColor: '#D3D3D3',
        opacity: 0.3,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12,
        height: 50
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