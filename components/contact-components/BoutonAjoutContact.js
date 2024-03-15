import { AntDesign } from '@expo/vector-icons'
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation  } from '@react-navigation/native'
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
                    color='#FEFFFF'
                />
        </View>
    )

}


const styles = StyleSheet.create({

 
    fab : {

        position : 'absolute',
        alignItems : 'center',
        justifyContent  : 'center',
        right : 30,
        bottom : 40,
        backgroundColor : "#005F9D"
    },

})

export default BoutonAjoutContact