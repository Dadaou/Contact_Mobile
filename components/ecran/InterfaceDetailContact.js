import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'


const convertirEnArray = (chaine) => {

    if (chaine !== "") {
        const chaineArray = chaine.split(',')
        return chaineArray
    } else return []

}


const DetailContact = ({ route }) => {

    const navigation = useNavigation()
    const { ctt_id, tel_id, ml_id, prenom, nom, telephone, mail } = route.params
    const [favori, setFavori] = useState(false)

    const toggleFavori = () => {
        setFavori(!favori)
    }

    return (

        
            <SafeAreaView style={styles.container}>

                <View style = {styles.header}>

                    <View style={{ flex: 3 }} />

                    <TouchableOpacity onPress={toggleFavori} style = {{ marginHorizontal : 25}}>
                        <Ionicons
                            name={favori ? 'star' : 'star-outline'}
                            size={25} 
                            color={'#ECCA37'}/>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={() => navigation.navigate('ModificationContact', {

                                                                                ctt_id : ctt_id,
                                                                                tel_id : tel_id,
                                                                                ml_id : ml_id,
                                                                                prenom: prenom,
                                                                                nom: nom,
                                                                                telephone: telephone,
                                                                                mail: mail

                                                                            })}>

                        <Ionicons
                            name={'pencil'}
                            size={25}
                            color={'#1685E7'} />
                            
                    </TouchableOpacity>

                </View>

                <ScrollView style={{  flex : 1}}>

                    <View style={{ alignItems: 'center', marginVertical: 10, marginBottom: 30 }}>

                        <Image source={require('../../assets/user.jpg')}
                            style={styles.photoUtilisateur} />

                        <Text style={styles.sectionNom}> 
                            <Text style={styles.sectionNom}> {prenom} </Text> {nom} 
                        </Text>

                    </View>

                    <View style={{ padding : 25}}>

                        <Text style={styles.sectionCoordonnee}>Téléphone</Text>

                        {convertirEnArray(telephone).length === 0 ? (

                            <View style={{ flexDirection: "row"}}>
                                
                                <TouchableOpacity style = {{marginHorizontal : 12}}>
                                    <FontAwesome name="phone" size={25} color="#000000" />
                                </TouchableOpacity>

                                <Text style={{ fontSize: 15,  marginBottom: 25 }}>Ajouter un numéro de téléphone</Text>

                            </View>

                        ) : (

                            convertirEnArray(telephone).map((telephone, index) => (

                                <View key={index} style={{ flexDirection: "row"}}>
    
                                    <TouchableOpacity style = {{marginHorizontal : 12}}>
                                        <FontAwesome name="phone" size={25} color="#000000" />
                                    </TouchableOpacity>
    
                                    <Text style={{ fontSize: 18,  marginBottom: 25 }}>{telephone}</Text>
    
                                </View>
                                           
                            ))
                        )}


                        <Text style={styles.sectionCoordonnee}>Email</Text>

                        {convertirEnArray(mail).length === 0 ? (

                            <View style={{ flexDirection: "row"}}>
                                
                                <TouchableOpacity style = {{marginHorizontal : 12}}>
                                    <FontAwesome name="envelope" size={23} color="#000000" />
                                </TouchableOpacity>

                                <Text style={{ fontSize: 15,  marginBottom: 25 }}>Ajouter une adresse e-mail</Text>

                            </View>

                        ) : (

                                convertirEnArray(mail).map((mail, index) => (

                                    <View key={index} style={{ flexDirection: "row"}}>
            
                                        <TouchableOpacity style = {{marginHorizontal : 12}}>
                                            <FontAwesome name="envelope" size={23} color="#000000" />
                                        </TouchableOpacity>
            
                                        <Text style={{ fontSize: 18,  marginBottom: 25 }}>{mail}</Text>
            
                                    </View>
                                            
                                ))
                        )}

                    </View>


                </ScrollView>

            </SafeAreaView>

    )

}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        flexDirection: 'column'

    },

    header: {

        flexDirection: "row",
        padding: 16
    },

    photoUtilisateur: {

        width: 200,
        height: 200,
        borderRadius: 100
    },

    sectionNom : {

        fontSize: 25,
        fontWeight: 'bold'
    },

    sectionCoordonnee : {

        fontSize: 20,  
        marginBottom: 12

    },

    text: {

        fontSize: 25,
        fontWeight: 'bold'
    }

})


export default DetailContact