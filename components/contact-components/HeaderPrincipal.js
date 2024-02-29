import uriLogo from '../../Utils/UriLogo'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Image, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomMenu from '../Modal/CustomMenu'

const HeaderPrincipal = ({ infoUtilisateur }) => {

    const navigation = useNavigation()

    return (

        <SafeAreaView style={styles.header}>

            <StatusBar backgroundColor="#005F9D" />

            <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: "row" }}>

                <View style={{ marginRight: 15 }}>

                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon
                            name={'bars'}
                            size={25}
                            color={'#FEFFFF'} />
                    </TouchableOpacity>

                </View>

                <View>
                    <Image source={{ uri: uriLogo.urlLogoContact }} style={styles.logo} />
                </View>

                <View>
                    <Text style={{ color: "#FEFFFF", fontWeight: "bold" }}>Contact</Text>
                </View>

            </View>

            <View style={{ flex: 1, alignItems: 'flex-end' }}>
            </View>

        </SafeAreaView>
    )

    /*return (

            <View style={styles.container}>

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
                    <CustomMenu />
                </View>

            </View>
        

    )*/



}

const styles = StyleSheet.create({

    logo: {
        width: 30,
        height: 25,
    },

    photoUtilisateur: {

        width: 32,
        height: 32,
        borderRadius: 100
    },


    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: 'center',
        backgroundColor: "#005F9D"
    }


})

export default HeaderPrincipal


/*

    {infoUtilisateur.clinum && infoUtilisateur.image ? 
        
    (<Image source={{ uri: `https://licences.manao.eu/uploads/${infoUtilisateur.clinum}/${infoUtilisateur.image}` }}
    style={styles.photoUtilisateur} />) :  

    (<Image source={require('../../assets/user.jpg')}
    style={styles.photoUtilisateur} />)}

*/