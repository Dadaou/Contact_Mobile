import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native"
import { Feather } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
import { blanc } from "../../../Utils/constant"

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

        <View style = {{paddingTop : 5}}>

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


    dropDownStyle: {
        width: 300,
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius : 5,
        borderColor: "#808080",
        backgroundColor : blanc,
        marginBottom : 20
    },

    dropDownTextStyle: {
        textAlign: 'left', 
        fontSize : 16
    }
    
    
})


export default ChampGroupe