import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { useNavigation  } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

const DetailContact = ({route}) => {

    const { photo, prenom, nom } = route.params

    const navigation = useNavigation()

    return (

        <>

            <View  style={styles.container}>

                <View style={styles.header}> 

                    <View style={{ flex: 3  }} />
                    <View style={{ flex: 3 }} />

                    <TouchableOpacity onPress={() => navigation.navigate('ModificationContact', { 
                                                                        
                                                                        photo : photo,
                                                                        prenom : prenom,
                                                                        nom : nom 
                                                                    })} 
                                      style = {{ padding : 20}}>

                        <Ionicons
                                    name={'pencil'}
                                    size={25} 
                                    color={'#1685E7'}/>
                    </TouchableOpacity>

                </View>

                <View style={{ alignItems : 'center', marginVertical : 10}}>

                    <Image source={require('../../assets/avatar.jpg')} 
                            style={styles.photoUtilisateur} />

                    <Text style = {styles.text}> {prenom} </Text> 
                    <Text style = {styles.text}> {nom} </Text>

                </View>

                <View style={{ marginLeft : 40, marginVertical : 20}}>
                    <Text style = {{fontSize : 20}}>Coordonnées</Text>
                </View>

                <View style={{ flexDirection : "row", marginLeft : 20}}>

                    <TouchableOpacity style={{ marginHorizontal: 20}}>
                        <FontAwesome name="phone" size={28} color="black" />
                    </TouchableOpacity>

                    <Text style = {{fontSize : 18}}>0348346222</Text>
                   
                </View>

                   


            </View>

        </>

    )
}

const styles = StyleSheet.create({

    container : {

        flexDirection: "column",
        flex : 1,
        marginTop : 40
    },

    header : {

        flexDirection: "row"
    },

    photoUtilisateur : {

        width: 200, 
        height: 200,
        borderRadius : 100
    },


    text : {

        fontSize : 25,
        fontWeight : 'bold'
    }



})
export default DetailContact

