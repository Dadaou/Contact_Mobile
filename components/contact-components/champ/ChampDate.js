import React, { useState } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { FontAwesome } from '@expo/vector-icons'

const ChampDate = ({onChangeDate}) => {

    const [date, setDate] = useState('')
    const [estVisible, setVisible] = useState(false)

    const afficherCalendrier = () => {
      setVisible(true)
    }
  
    const cacherCalendrier = () => {
      setVisible(false)
    }
  
    const handleConfirm = (date) => {
      setDate(date.toLocaleString())
      onChangeDate(date.toLocaleString())
      cacherCalendrier()
    }
  
    return (

        <View style = {styles.container}>

                <TouchableOpacity style={styles.input} onPress={afficherCalendrier}>
                    <Text style={{fontSize : 16, padding : 10, color : '#808080'}}>Anniversaire</Text>
                    <FontAwesome style={styles.icon} name="calendar" size={24} color="#C19A6B"/>
                </TouchableOpacity>

                <DateTimePickerModal
                        isVisible={estVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={cacherCalendrier}
                />

        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginRight : 140,
        marginTop: 15,
        marginBottom : 10
    },

    input: {

        height: 50,
        width: 160,
        borderWidth: 1,
        borderStyle : 'solid',
        borderRadius : 7,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        flexDirection : 'row'
    },

    icon : {
        padding : 8,
        marginLeft : 10
    }

})

export default ChampDate