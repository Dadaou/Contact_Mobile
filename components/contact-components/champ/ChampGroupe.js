import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native"
import { SelectList } from 'react-native-dropdown-select-list'

const ChampGroupe = ({onChangeGroupe}) => {

    const listGroupe = [{key : "1", value : "Aucun groupe", disabled : true}]
    const [groupeSelectionne, setGroupeSelectionne] = useState('')
    
    const ecouterChangementValeur = (valeur) => {
        setGroupeSelectionne(valeur)
        onChangeGroupe(valeur)
    }


    return (

        <View style = {{flex : 1}}>

            <SelectList 

                setSelected={(valeur) => ecouterChangementValeur(valeur)} 
                data={listGroupe} 
                save="value"
                search={false}
                placeholder= "Sélectionner un groupe"
                inputStyles={{fontSize : 16}}
                boxStyles={{borderRadius:7, width : 300, marginTop: 13}}
                dropdownTextStyles = {{fontSize : 16}}
            />

        </View>

    )

}


const styles = StyleSheet.create({

    input: {

        height: 50,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 7,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        fontSize : 16
    }
    
    
})


export default ChampGroupe