import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { StyleSheet, StatusBar } from "react-native"
import { Appbar } from 'react-native-paper'
import { blanc, bleu } from '../../Utils/constant'
import ListContact from './ListContact'

const HeaderPrincipal = ({ titre }) => {

    const navigation = useNavigation()

    return (
        <>
            <StatusBar backgroundColor={bleu} />
            <Appbar.Header style={{backgroundColor : bleu}}>
                <Appbar.Action icon="menu" size={30} onPress={() => navigation.openDrawer()} color={blanc}/>
                <Appbar.Content title={titre} color={blanc}/>
            </Appbar.Header>  
            

        </>
    )

    /*return (

        <View style={styles.header}>

            <StatusBar backgroundColor={bleu} />

            <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: "row" }}>

                <View style={{ marginRight: 15 }}>

                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon
                            name={'bars'}
                            size={25}
                            color={blanc} />
                    </TouchableOpacity>

                </View>

                <View>
                    <Text variant="titleLarge" style={{ color: blanc, fontWeight: "bold"}}>{titre}</Text>
                </View>

            </View>

       

        </View>
    )*/

    /*return (

            <View style={styles.container}>

                <StatusBar backgroundColor = bleu/> 
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

    
    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: 'center',
        backgroundColor: bleu
    },

    logo: {
        width: 30,
        height: 25,
    },

    photoUtilisateur: {

        width: 32,
        height: 32,
        borderRadius: 100
    },

})

export default HeaderPrincipal


/*

    {infoUtilisateur.clinum && infoUtilisateur.image ? 
        
    (<Image source={{ uri: `https://licences.manao.eu/uploads/${infoUtilisateur.clinum}/${infoUtilisateur.image}` }}
    style={styles.photoUtilisateur} />) :  

    (<Image source={require('../../assets/user.jpg')}
    style={styles.photoUtilisateur} />)}

*/