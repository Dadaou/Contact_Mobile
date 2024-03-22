import { useNavigation } from '@react-navigation/native'
import { View, Image, StyleSheet, Text } from "react-native"
import { TouchableRipple, Menu, PaperProvider } from 'react-native-paper'
const ListView = ({ ctt_id, photo, prenom, nom,  favori }) => {

    const navigation = useNavigation()

    /*return (

        <TouchableRipple
            style = {styles.container}
            onPress={() => navigation.navigate('DetailContact', { ctt_id: ctt_id, favori: favori })}
            rippleColor="#00000051"
        >
            <Card mode="elevated" style = {{ borderRadius: 1, height : 70}} onPress={() => navigation.navigate('DetailContact', { ctt_id: ctt_id,  favori : favori })}>           
                
               
                    <Card.Title
                            subtitle={`${prenom} ${nom}`}
                            subtitleVariant='bodyLarge' 
                            left={() => photo == '' ? (
                                                    <Image
                                                        source={require('../../assets/user.jpg')}
                                                        style={styles.photoContact}
                                                    />
                                                ) : (
                                                    <Image source={{ uri: photo }} style={styles.photoContact} />
                                            )
                            }
                    
                    />
             
            </Card> 

        </TouchableRipple>

    )*/

    return (
        <TouchableRipple
            style = {styles.container}
            onPress={() => navigation.navigate('DetailContact', { ctt_id: ctt_id, favori: favori })}
            rippleColor="#00000051"
        >

           <View style = {{flex : 1, flexDirection : "row"}}>

            <View style={{ flex: 0.2 }}>

                    {photo == '' ? (
                        <Image
                            source={require('../../assets/user.jpg')}
                            style={styles.photoContact}
                        />
                    ) : (
                        <Image source={{ uri: photo }} style={styles.photoContact} />
                    )
                    }

                    </View>


                    <View style={{ flex: 1, padding: 8 }}>

                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                        <Text> {prenom} </Text> {nom}
                    </Text>

                </View>

            </View>

        </TouchableRipple>
    )
}

const styles = StyleSheet.create({

    container: {

        padding: 10,
        marginHorizontal: 8,
        flexDirection: 'row'

    },

    photoContact: {

        width: 40,
        height: 40,
        borderRadius: 100
    },

    text: {
        fontSize: 18
    }

});

export default ListView