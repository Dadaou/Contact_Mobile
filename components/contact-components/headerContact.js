import urlLogo from "../../constant/constant.js"
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

const afficherMenuCoulissant = () => {

    const navigation = useNavigation()
    navigation.openDrawer()
}

const HeaderContact = () => {

    const navigation = useNavigation()

    return (

        <>
            <View  style={styles.container}>

                <View style={styles.sectionMenu}>

                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon
                            name={'bars'}
                            size={25} 
                            color={'#FEFFFF'}/>
                    </TouchableOpacity>

                </View>

                <View style={styles.sectionLogoContact}>
                    <Image source={{ uri:  urlLogo.urlLogoContact }} style={styles.logo}/>
                    <Text style={{color : "#FEFFFF", fontWeight : "bold"}}>Contact</Text>
                </View>

                <View style={styles.sectionPhotoUtilisateur}>

                    <Icon
                        name={'user'}
                        size={25} 
                        color={'#FEFFFF'}/>
                </View>

            </View>
        </>

    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#1685E7',
        padding : 20,
        flexDirection: "row",
        marginTop : 40
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


})

export default HeaderContact;