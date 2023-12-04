import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const DATA = [

        { id: 1, photo : "photo", nom: "RANDRIANASOLO", prenom : "Onja"},
        { id: 2, photo : "photo", nom: "RAVONINTSOA",  prenom : "Nirina"},
        { id: 3, photo : "photo", nom: "Theresa",  prenom : "Williams"}
];

//
const Item = ({photo, prenom, nom}) => {

    const navigation = useNavigation()

    return (

        <>

                <TouchableOpacity   style={styles.container}
                                    onPress={() => navigation.navigate('DetailContact', { 
                                                                        
                                                                            photo : photo,
                                                                            prenom : prenom,
                                                                            nom : nom 
                                                                        })}>
                
                    <Text style= {{flex : 4}}>{photo}</Text>
                    <Text  style= {{flex : 5}}/*style={{  paddingHorizontal: 40 }}*/>{prenom}</Text>
                    <Text  style= {{flex : 12}}>{nom}</Text>

                    <TouchableOpacity style={styles.icon}>
                        <Ionicons
                                name= 'ellipsis-vertical'
                                size={15} />
                    </TouchableOpacity>

                </TouchableOpacity>

        </>

    )
}


const ListeContact = () => {

    return (

        <>

            <View>

                <FlatList
                        data={DATA}
                        renderItem={({item}) => <Item photo={item.photo} prenom={item.prenom} nom={item.nom}/>}
                        keyExtractor={item => item.id} />
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    
    container: {

      backgroundColor: '#EDEBEB',
      padding: 10,
      marginHorizontal: 8,
      flexDirection: 'row'

    },

    icon : {
        flex : 1
    }

  });

export default ListeContact