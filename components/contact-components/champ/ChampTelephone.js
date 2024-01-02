import { useState, useEffect, useRef } from 'react'
import CountryPicker from "rn-country-picker"
import SelectDropdown from 'react-native-select-dropdown'
//import { SelectList } from 'react-native-dropdown-select-list'
import { Feather } from '@expo/vector-icons'
import { View, TouchableOpacity,  StyleSheet, TextInput } from 'react-native'


const ChampTelephone = ({paramTelephone, onChangeTelephone}) => {


    const libelle = ['Professionel', 'Standard', 'Mobile', 'Fixe', 'Ligne directe', 'Secrétariat' ]
    const [listTelephone, setListTelephone] = useState(paramTelephone)


    useEffect(() => {
        setListTelephone(paramTelephone)
    }, [paramTelephone])


    const changerTelephone = (numeroTelephone, index) => {
      const list = [...listTelephone]
      list[index].tel_numero = numeroTelephone
      setListTelephone(list)
      onChangeTelephone(list)

    }

    const changerLibelle = (libelle, index) => {
        const list = [...listTelephone]
        list[index].tel_libelle = libelle
        setListTelephone(list)
        onChangeTelephone(list)
    }

    const changerPays = (pays, index) => {
        const list = [...listTelephone]
        list[index].tel_code_pays= pays
        setListTelephone(list)
        onChangeTelephone(list)
    }


    const supprimerChampTelephone = (index) => {
      const list = [...listTelephone]
      list.splice(index, 1)
      setListTelephone(list)
      onChangeTelephone(list)
    }
  
    const ajouterChampTelephone = () => {
      setListTelephone([...listTelephone, { tel_libelle: "", tel_numero: "", tel_code_pays : "33"  }])
      onChangeTelephone([...listTelephone, { tel_libelle: "", tel_numero: "", tel_code_pays : "33" }])
    }  


    return (
     
        <>

            {listTelephone.map((item, index) => (

                <View key={index}>

                    <View style = {{flexDirection : "row"}}>

                        <CountryPicker
                                disable={false}
                                containerStyle={styles.flag}
                                animationType={"slide"}
                                language="fra"
                                pickerTitle={"Liste des pays"}
                                searchBarPlaceHolder={"Rechercher un pays"}
                                hideCountryFlag={false}
                                hideCountryCode={false}
                                countryCode={item.tel_code_pays}
                                selectedValue={(text) => changerPays(text, index)}
                                
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Télephone"
                            keyboardType='numeric'
                            //maxLength={9}
                            onChangeText={(text) => changerTelephone(text, index)}
                            value={item.tel_numero} 
                        />


                        {listTelephone.length !== 1 && (
                            <TouchableOpacity onPress={() => supprimerChampTelephone(index)}>
                                <Feather name="x-circle" size={24} color="#D70040" />
                            </TouchableOpacity>
                        )}

    
                    </View>

                    <SelectDropdown

                        data={libelle}
                        defaultButtonText={'Libellé'}
                        defaultValue={item.tel_libelle === '' ? '' : item.tel_libelle} 
                        onSelect={(val) => changerLibelle(val, index)}
                        buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
                        rowTextForSelection={(item) => {return item}}
                        renderDropdownIcon={isOpened => {
                            return <Feather name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#808080'} size={18} />;
                        }}
                        dropdownIconPosition={'right'}
                        buttonStyle={styles.dropDownStyle}
                        buttonTextStyle={styles.dropDownTextStyle}
                    />
                    
                    {listTelephone.length - 1 === index && listTelephone.length < 4 && (

                        <TouchableOpacity onPress={ajouterChampTelephone} /*style={{padding : 15}}*/>
                            <Feather name="plus-circle" size={30} color="#1685E7" />
                        </TouchableOpacity>
                    )}

                </View>
            ))}

        </>
    )
}

const styles = StyleSheet.create({

    input: {
       
        height: 50,
        width: 180,
        borderWidth: 1,
        padding: 10,
        borderRadius : 7,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        fontSize : 16
    },

	flag: {
		height: 50,
		width: 100,
		borderColor: "#808080",
		alignItems: "center",
		marginHorizontal: 3,
		backgroundColor: "white",
		borderRadius: 7,
        backgroundColor : "#E5E4E2"
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

 });



export default ChampTelephone