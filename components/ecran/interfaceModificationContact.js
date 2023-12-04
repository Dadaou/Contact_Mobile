import {useState} from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from "react-native"

const ModificationContact = ({route}) => {

    const { photo, prenom, nom } = route.params

    const [nouveauPrenom, setNouveauPrenom] = useState(prenom)
    const [nouveauNom, setNouveauNom] = useState(nom)

    return (

        <>
            <View style={styles.container}>

                <View style={styles.header} >

                    <View style={{ flex: 6  }}> 
                        <Text style = {{fontSize : 20}}>Modification contact</Text>
                    </View>

                    <TouchableOpacity style={{ flex: 3,  backgroundColor: "#DBAF2F", borderColor : "#DBAF2F", paddingLeft : 6, borderRadius : 20}}>
                        <Text style = {{fontSize : 20, fontWeight : 'bold'}}>Enregistrer</Text>
                    </TouchableOpacity>

                </View>

                
		<ScrollView style={styles.content} >

            <View style = {{ alignItems: 'center'}}>

                <Image source={require('../../assets/avatar.jpg')} 
                        style={styles.photoUtilisateur} />

            </View>

            <TextInput
                        style={styles.input}
                        editable={false}
                        placeholder="Prénom"
                        onChangeText={(text) => setNouveauPrenom(text)}
                        value={nouveauPrenom} />
            <TextInput
                        style={styles.input}
                        editable={false}
                        placeholder="Nom"
                        onChangeText={(text) => setNouveauNom(text)}
                        value={nouveauNom} />

            <TextInput
                        style={styles.input}
                        placeholder="Téléphone"
                        value='0348346222'
                        keyboardType="numeric" />


            <TextInput
                        style={styles.input}
                        placeholder="Email" 
                        value='onjamanao1@gmail.com'/>

        </ScrollView>
                
            </View>
        </>

    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection : "column",
        flex: 1
    },

    header : {

        flexDirection: "row", 
        marginTop : 40, 
        backgroundColor: "#ECCA37",
        padding : 15
    },

    content : {
        marginVertical : 20
    },

    input: {

        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },

    photoUtilisateur : {
        width: 200, 
        height: 200,
        borderRadius : 100
    }

})

export default ModificationContact