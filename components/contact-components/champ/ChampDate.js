import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"

const ChampDate = ({paramDate, onChangeDate}) => {

    const [estVisible, setVisible] = useState(false)

    const afficherCalendrier = () => {
      setVisible(true)
    }
  
    const cacherCalendrier = () => {
      setVisible(false)
    }
  
    const handleConfirm = (paramDate) => {
      onChangeDate(paramDate.toLocaleDateString())
      cacherCalendrier()
    }

    return (

        <View style = {styles.container}>

                <TouchableOpacity style={styles.input} onPress={afficherCalendrier}>
                    <View style = {{ padding : 10}}>
                        <Image source={require('../../../assets/Calendrier.png')} style={{ width: 35, height: 30  }} />
                    </View>
                    {paramDate == '' ? (<Text style={{fontSize : 16, paddingTop : 13, color : '#808080'}}>Anniversaire</Text>) : 
                                  (<Text style={{fontSize : 16, paddingTop : 13}}>{paramDate}</Text>  )}
                    
                </TouchableOpacity>


                <DateTimePickerModal
                        isVisible={estVisible}
                        mode={'date'}
                        onConfirm={handleConfirm}
                        onCancel={cacherCalendrier}
                />

        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection : 'row',
        marginRight : 120,
        marginTop: 15,
        marginBottom : 20
    },

    input: {

        height: 50,
        width: 180,
        borderWidth: 1,
        borderStyle : 'solid',
        borderRadius : 5,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        flexDirection : 'row'
    },

    icon : {
        padding : 12,
        marginLeft : 10
    }

})

export default ChampDate