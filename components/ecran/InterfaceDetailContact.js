import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import InformationMail from "../contact-components/affichage-information-contact/InformationMail"
import InformationTelephone from "../contact-components/affichage-information-contact/InformationTelephone"
import InformationContact from "../contact-components/affichage-information-contact/InformationContact"

/*

    <TouchableOpacity onPress={() => setAfficherAutreInfo(!afficherAutreInfo)} style={{ alignItems: 'center', justifyContent : 'center', paddingRight: 170}}>

            {!afficherAutreInfo ?
                <Text style={{ fontSize: 20, color: "#008E97" }}>Autres informations ?</Text> : null
            }

    </TouchableOpacity>
*/ 

const DetailContact = ({ route }) => {

    const { ctt_id } = route.params
    const navigation = useNavigation()

    const [afficherAutreInfo, setAfficherAutreInfo] = useState(false)
    const [favori, setFavori] = useState(false)

    const toggleFavori = () => {
        setFavori(!favori)
    }


    return (

        
            <SafeAreaView style={styles.container}>

                <StatusBar backgroundColor = "#E5E4E2" barStyle = "dark-content"/> 

                <View style = {styles.header}>

                    <View style={{ flex: 3 }} />

                    <TouchableOpacity onPress={toggleFavori} style = {{ marginHorizontal : 25}}>
                        <Ionicons
                            name={favori ? 'star' : 'star-outline'}
                            size={25} 
                            color={'#ECCA37'}/>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={() => navigation.navigate('ModificationContact', { ctt_id : ctt_id })}>

                        <Ionicons
                            name={'pencil'}
                            size={25}
                            color={'#005F9D'} />
                            
                    </TouchableOpacity>

                </View>

                <ScrollView>

                    <View  style={{paddingTop:20}}>

                        <InformationContact id={ctt_id} />

                        <View style={{ padding : 25}}>

                            <InformationTelephone id={ctt_id} />

                            <InformationMail id={ctt_id} />

                        </View>

                    </View>

                </ScrollView>

            </SafeAreaView>

    ) 

}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        flexDirection: 'column',
        backgroundColor : "#E5E4E2"

    },

    header: {

        flexDirection: "row",
        padding: 16, 
        //backgroundColor : "#005F9D",
        height : 60
    }

})


export default DetailContact