import React from 'react'
import { View, Text, StyleSheet } from "react-native"


const DetailContact = ({route}) => {

    const { photo, prenom, nom } = route.params;
    return (

        <>
            <View style = {{flex : 1, alignItems : 'center', justifyContent : 'center'}}>

                <Text> Photo :  {JSON.stringify(photo)}</Text>
                <Text> Prenom :  {JSON.stringify(prenom)}</Text>
                <Text> Nom :  {JSON.stringify(nom)}</Text>

            </View>
        </>

    )
}

export default DetailContact

