import React, { memo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, Image, Text } from 'react-native'
import { TouchableRipple, List } from 'react-native-paper'


const ListView = memo(({ ctt_id, src_id, corbeille, photo, prenom, nom, favori, telephone, mail, onLongPressCallback = () => { } }) => {

    const navigation = useNavigation()

    return (

        <>


            <TouchableRipple
                onLongPress={onLongPressCallback}
                onPress={() => navigation.navigate('DetailContact', { ctt_id: ctt_id, src_id: src_id, corbeille: corbeille, favori: favori })}>

                <View style={styles.container}>

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

                </View>

            </TouchableRipple>
        </>
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