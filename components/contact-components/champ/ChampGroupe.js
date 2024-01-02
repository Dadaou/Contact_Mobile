import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native"
import { Feather } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'

const ChampGroupe = ({paramGroupe, onChangeGroupe}) => {

    const listGroupe = ['Aucun']
    const [groupeSelectionne, setGroupeSelectionne] = useState(paramGroupe)

    useEffect(() => {
        setGroupeSelectionne(paramGroupe)
    }, [paramGroupe])

    
    const ecouterChangementValeur = (valeur) => {
        setGroupeSelectionne(valeur)
        onChangeGroupe(valeur)
    }


    return (

        <View style = {{flex : 1}}>

            <SelectDropdown

                data={listGroupe}
                defaultButtonText={'Choisir un groupe...'}
                defaultValue={groupeSelectionne === '' ? '' : groupeSelectionne} 
                onSelect={(val) => ecouterChangementValeur(val)}
                buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
                rowTextForSelection={(item) => {return item}}
                renderDropdownIcon={isOpened => {
                    return <Feather name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#808080'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                buttonStyle={styles.dropDownStyle}
                buttonTextStyle={styles.dropDownTextStyle}
                disabled = {true}
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
    },

    dropDownStyle: {
        width: 200,
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius : 7,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF"
    },

    dropDownTextStyle: {
        textAlign: 'left', 
        fontSize : 16
    }
    
    
})


export default ChampGroupe