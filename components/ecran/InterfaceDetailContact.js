import { useState, useEffect } from "react"
import { View, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';

import Toast from "../Modal/Toast"
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

    const { ctt_id, showModal } = route.params

    const navigation = useNavigation()

    const [afficherAutreInfo, setAfficherAutreInfo] = useState(false)
    const [favori, setFavori] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)

    const toggleFavori = () => {
        setFavori(!favori)
    }


    const toggleModal = () => {

        setModalVisible(true)
        setTimeout(() => {
            setModalVisible(false)
        }, 1500)

    }

    useEffect(() => {

        const listener = navigation.addListener('focus', () => {

            if (showModal && showModal !== undefined) {
                toggleModal();
                navigation.setParams({ showModal: false })
            }

        })

        return () => listener()

    }, [showModal, navigation])


    return (


        <SafeAreaView style={styles.container}>

            <StatusBar backgroundColor="#E5E4E2" barStyle="dark-content" />
            <Toast title='Contact modifié' isVisible={isModalVisible} />

            <View style={styles.header}>

                <View style={{ flex: 1, alignItems: 'flex-start' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={25} color="black" />
                    </TouchableOpacity>

                </View>


                <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>

                    <TouchableOpacity onPress={toggleFavori} style={{ marginHorizontal: 25 }}>
                        <Ionicons
                            name={favori ? 'star' : 'star-outline'}
                            size={25}
                            color={'#ECCA37'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('ModificationContact', { ctt_id: ctt_id })}>

                        <Ionicons
                            name={'pencil'}
                            size={25}
                            color={'#005F9D'} />

                    </TouchableOpacity>

                </View>


            </View>

            <ScrollView>

                <View style={{ paddingTop: 20 }}>

                    <InformationContact id={ctt_id} />

                    <View style={{ padding: 25 }}>

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
        backgroundColor: "#E5E4E2"

    },

    header: {

        flexDirection: "row",
        alignItems: 'center',
        //justifyContent : 'center',
        padding: 16,
        //backgroundColor : "#005F9D",
        //height : 60
    }

})


export default DetailContact