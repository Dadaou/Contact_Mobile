import { View, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { blanc, bleu } from "../Utils/constant"
import { FAB } from 'react-native-paper'

const BoutonAjoutContact = () => {

    const navigation = useNavigation()

    return (
        <View>
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AjoutContact')}
                variant='surface'
                color={blanc}
            />
        </View>
    )

}


const styles = StyleSheet.create({


    fab: {

        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 40,
        backgroundColor: bleu
    },

})

export default BoutonAjoutContact