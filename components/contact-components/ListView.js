import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Menu, TouchableRipple, List } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const ListViewAvecPlusDInfo = memo(({ index, photo, prenom, nom, telephone, mail }) => {

    return (
        <>

            <List.Item

                title={() => (
                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                        <Text>{prenom}</Text> {nom}
                    </Text>
                )}

                description={() => (
                    <View>

                        {
                            telephone === "" || telephone === null ? null :

                                (
                                    <Text numberOfLines={1} ellipsizeMode="tail">
                                        tel: {telephone.replace(/,/g, ', ')}
                                    </Text>

                                )
                        }

                        {
                            mail === "" || mail === null ? null :

                                (
                                    <Text numberOfLines={1} ellipsizeMode="tail">
                                        mail: {mail.replace(/,/g, ', ')}
                                    </Text>

                                )
                        }


                    </View>
                )}

                left={() => (

                    <View style={{ marginTop: 6 }}>

                        <Image
                            style={styles.photoContact}
                            source={photo == null || photo == "" ? require('../../assets/user.jpg') : { uri: photo }}
                        />

                    </View>
                )}

            />
        </>
    )

})

const ListViewAvecMoinDInfo = memo(({ photo, prenom, nom }) => {

    return (

        <>

            <List.Item

                title={() => (
                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                        <Text>{prenom}</Text> {nom}
                    </Text>
                )}


                left={() => (
                    <Image
                        style={styles.photoContact}
                        source={photo == null || photo == "" ? require('../../assets/user.jpg') : { uri: photo }}
                    />
                )}

            />
        </>
    )
})


const ListView = memo(({ focus, index, ctt_id, src_id, photo, prenom, nom, favori, telephone, mail }) => {

    const navigation = useNavigation()

    return (

        <View style={{ flex: 1 }}>

            <TouchableRipple
                onPress={() => navigation.navigate('DetailContact', { ctt_id: ctt_id, src_id: src_id, favori: favori })}>

                <View style={styles.container}>

                    {
                        focus ? (

                            <ListViewAvecPlusDInfo index={index} photo={photo} nom={nom} prenom={prenom} telephone={telephone} mail={mail} />
                        ) : (

                            <ListViewAvecMoinDInfo photo={photo} nom={nom} prenom={prenom} />
                        )

                    }

                </View>

            </TouchableRipple>
        </View>
    )
})

const styles = StyleSheet.create({

    container: {
        marginLeft: 25,
        marginRight: 30,
        flexDirection: 'row'
    },

    photoContact: {
        width: 40,
        height: 40,
        borderRadius: 25
    },

    text: {
        fontSize: 19
    }

});

export default ListView