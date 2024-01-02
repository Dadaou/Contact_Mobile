import { AntDesign } from '@expo/vector-icons'
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation  } from '@react-navigation/native'

const BoutonAjoutContact = () => {

    const navigation = useNavigation()
    
    return (
        
            <View>

                <TouchableOpacity style={styles.plusIcon} onPress={() => navigation.navigate('AjoutContact')} >

                    <AntDesign 
                            name="pluscircle"  
                            size={50}
                            color= '#005F9D' />

                </TouchableOpacity>
           
            </View>

    )

}


const styles = StyleSheet.create({

 
    plusIcon : {

        position : 'absolute',
        width : 100,
        height : 100,
        alignItems : 'center',
        justifyContent  : 'center',
        right : 30,
        bottom : 40
    }

})

export default BoutonAjoutContact