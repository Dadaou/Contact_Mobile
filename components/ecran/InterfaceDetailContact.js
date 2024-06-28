import { useState, useEffect, useCallback } from "react"
import { View, StyleSheet, ScrollView, StatusBar, Text } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { Appbar } from "react-native-paper"
import Toast from "../modal/Toast"
import InformationMail from "../contact-components/affichage-information-contact/InformationMail"
import InformationTelephone from "../contact-components/affichage-information-contact/InformationTelephone"
import InformationContact from "../contact-components/affichage-information-contact/InformationContact"
import { dbLocalName } from "../utils/Constant"
import * as SQLite from 'expo-sqlite'
import { store } from "../redux/dataStore"
import { updateNombreFavori } from "../redux/action/globalDataAction"
import CustomAlert from "../modal/CustomAlert"


const DetailContact = ({ route }) => {

    const { ctt_id, src_id, corbeille, showModal, msgToast, favori } = route.params

    const navigation = useNavigation()
    const db = SQLite.openDatabase(dbLocalName)
    const reqToUpdateFavori = "UPDATE contact SET ctt_favoris = ? WHERE ctt_id = ?"
    const reqToMoveContactInCorbeille = "UPDATE contact SET ctt_corbeille = 1 WHERE ctt_id = ?"
    const reqToUpdateFlagSuppression = "UPDATE contact SET est_supprimer = 1 WHERE ctt_id = ?"
    const reqToDeleteContact = "DELETE FROM contact WHERE ctt_id = ?"

    let dateDernierSynchro = store.getState().globalReducer.dateDernierSynchro


    const [isFavori, setIsFavori] = useState(favori)
    const [isModalVisible, setModalVisible] = useState(false)
    const [isAlertVisible, setAlertVisible] = useState(false)



    const IncrementNombreFavori = () => {
        !isFavori ? store.dispatch(updateNombreFavori(store.getState().globalReducer.nombreFavori + 1)) :
            store.dispatch(updateNombreFavori(store.getState().globalReducer.nombreFavori - 1))
    }

    const toggleFavori = () => {
        setIsFavori(!isFavori)
        IncrementNombreFavori()
        db.transaction((tx) => {
            tx.executeSql(reqToUpdateFavori, [!isFavori ? 1 : 0, ctt_id])
        })
    }


    const toggleModal = () => {

        setModalVisible(true)
        setTimeout(() => {
            setModalVisible(false)
        }, 2000)

    }

    const afficherAlertePourSuppression = () => {
        setAlertVisible(!isAlertVisible)
    }

    const procederSuppression = useCallback(() => {

        if (corbeille == 1) {
            db.transaction((tx) => {
                tx.executeSql(reqToDeleteContact, [ctt_id])
            })

            navigation.navigate('Accueil', { showModal: true, msgToast: 'Contact supprimé' })
        }

        else {
            db.transaction((tx) => {
                tx.executeSql(reqToMoveContactInCorbeille, [ctt_id])
                tx.executeSql(reqToUpdateFlagSuppression, [ctt_id])
            })

            navigation.navigate('Accueil', { showModal: true, msgToast: 'Contact déplacé dans la corbeille' })
        }

    }, [])

    useEffect(() => {

        const listener = navigation.addListener('focus', () => {

            if (showModal && showModal !== undefined) {
                toggleModal()
                navigation.setParams({ showModal: false })
            }

        })

        return () => listener()

    }, [showModal, navigation])


    return (

        <>

            <StatusBar backgroundColor="#F2F3F4" barStyle="dark-content" />

            <Appbar.Header style={{ backgroundColor: "#F2F3F4" }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} size={25} />
                <Appbar.Content title="" />
                <Appbar.Action icon={isFavori ? 'star' : 'star-outline'} onPress={toggleFavori} />
                <Appbar.Action icon={'trash-can-outline'} onPress={afficherAlertePourSuppression} disabled={src_id !== 1 && true} />
                <Appbar.Action icon="pencil" onPress={() => navigation.navigate('ModificationContact', { ctt_id: ctt_id, src_id: src_id })} />
            </Appbar.Header>

            <ScrollView>

                <View >

                    <InformationContact idContact={ctt_id} />

                    <View style={{ padding: 5 }}>
                        <InformationTelephone idContact={ctt_id} />
                    </View>

                    <View style={{ padding: 5 }}>
                        <InformationMail idContact={ctt_id} />
                    </View>

                </View>

            </ScrollView>


            {parseInt(src_id) !== 1 &&
                <View style={styles.bottomView}>
                    <Text style={styles.textStyle}> Contact lié à l'univers Plateforme. La dernière synchronisation a eu lieu le {dateDernierSynchro}</Text>
                </View>
            }

            <Toast title={msgToast} isVisible={isModalVisible} />
            <CustomAlert isVisible={isAlertVisible} onVisible={setAlertVisible} msg={corbeille == 1 ? 'Supprimer définitivement ce contact ?' : 'Déplacer ce contact dans la corbeille ?'} actionBouton={procederSuppression} />


        </>
    )

}

const styles = StyleSheet.create({

    bottomView: {
        width: '100%',
        height: 50,
        backgroundColor: '#72A0C1',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },

    textStyle: {
        color: '#fff',
        fontSize: 15,
    }

})

export default DetailContact