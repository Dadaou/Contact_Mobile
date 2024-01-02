import uriLogo from '../../constant/UriLogo'
import { useNavigation  } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Image, Text, TouchableOpacity, StyleSheet, StatusBar} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'

/*const afficherMenuCoulissant = () => {

    const navigation = useNavigation()
    navigation.openDrawer()
}*/

const HeaderContact = () => {

    const navigation = useNavigation()

    return (

            <SafeAreaView style={styles.container}>

                <StatusBar backgroundColor = "#005F9D"/> 
                <View style={styles.sectionMenu}>

                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon
                            name={'bars'}
                            size={25} 
                            color={'#FEFFFF'}/>
                    </TouchableOpacity>

                </View>

                <View style={styles.sectionLogoContact}>
                    <Image source={{ uri:  uriLogo.urlLogoContact }} style={styles.logo}/>
                    <Text style={{color : "#FEFFFF", fontWeight : "bold"}}>Contact</Text>
                </View>

                <View>

                    <Image source={require('../../assets/user.jpg')}
                                    style={styles.photoUtilisateur} />

                </View>

            </SafeAreaView>
        

    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#005F9D',
        padding : 16,
        flexDirection: "row"
    },

    logo: {
        width: 30,
        height: 25,
    },

    sectionMenu : {
        flex: 1
    },

    sectionLogoContact : {
        flex: 7,
        flexDirection: "row"
    },


    photoUtilisateur: {

        width: 32,
        height: 32,
        borderRadius: 100
    }


})

export default HeaderContact