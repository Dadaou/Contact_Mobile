import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, Image, Text } from 'react-native'
import { Menu, TouchableRipple } from 'react-native-paper'

const ListView = ({ ctt_id, photo, prenom, nom, favori }) => {

    const navigation = useNavigation()

    /*const [visible, setVisible] = useState({})
    const [coordMenuContaxtuel, setCoordMenuContaxtuel] = useState({ x: 0, y: 0 })
  
    const toggleMenu = (name) => () => setVisible({ ...visible, [name]: !visible[name] })
    const getVisible = (name) => !!visible[name]
  
    const handleLongPress = (event) => {
      const { nativeEvent } = event
      setCoordMenuContaxtuel({
        x: nativeEvent.pageX,
        y: nativeEvent.pageY,
      })
      setVisible({ menuContextuel: true });
    }


    return (
        <>
            <View style={{ flex: 1 }}>
                
                <Menu
                    visible={getVisible('menuContextuel')}
                    onDismiss={toggleMenu('menuContextuel')}
                    anchor={coordMenuContaxtuel}>

                    <Menu.Item onPress={() => { }} title="Item 1" />
                    <Menu.Item onPress={() => { }} title="Item 2" />
                    <Menu.Item onPress={() => { }} title="Item 3" disabled />

                </Menu>
    
                <TouchableRipple  style = {styles.container} 
                       onLongPress={handleLongPress}
                       onPress={() => navigation.navigate('DetailContact', { ctt_id: ctt_id, favori: favori })}>
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
            </View>
        </>
    )*/

    return (
        <>
            <View style={{ flex: 1 }}>

                <TouchableRipple style={styles.container}
                    onPress={() => navigation.navigate('DetailContact', { ctt_id: ctt_id, favori: favori })}>

                    <View style={{ flex: 1, flexDirection: "row" }}>

                        <View style={{ flex: 0.2 }}>

                            {photo == null || photo == "" ? (
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
            </View>
        </>

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