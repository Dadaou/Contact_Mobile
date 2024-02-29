import { useState, useEffect, useRef } from 'react'
import CountryPicker from "rn-country-picker"
import SelectDropdown from 'react-native-select-dropdown'
import { AsYouType,  isValidPhoneNumber } from 'libphonenumber-js'

import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-paper'
import { View, TouchableOpacity,  StyleSheet } from 'react-native'


const ChampTelephone = ({paramTelephone, onChangeTelephone}) => {


    const libelle = ['Professionel','Personnel', 'Standard', 'Mobile', 'Fixe', 'Ligne directe', 'Secrétariat' ]
    const [listTelephone, setListTelephone] = useState(paramTelephone)

    useEffect(() => {
        setListTelephone(paramTelephone)
    }, [paramTelephone])


    const changerTelephone = (numeroTelephone, index) => {
      const list = [...listTelephone]
      const numeroTelephoneFormate = new AsYouType().input(`+${list[index].tel_code_pays}${numeroTelephone}`)
      //const phoneNumber = isValidPhoneNumber(`+${list[index].tel_code_pays}${numeroTelephone}`)
      //console.log(phoneNumber)
      //console.log(numeroTelephoneFormate.replace(list[index].tel_code_pays, ''))
      list[index].tel_numero = numeroTelephoneFormate.substring(list[index].tel_code_pays.length + 1)//numeroTelephone
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
                            label = "Téléphone"
                            mode='outlined'
                            activeOutlineColor = "#005F9D"
                            keyboardType='numeric'
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

                        <TouchableOpacity onPress={ajouterChampTelephone} style={{marginBottom : 15}}>
                            <Feather name="plus-circle" size={30} color="#708090" />
                        </TouchableOpacity>
                    )}

                </View>
            ))}

        </>
    )
}

const styles = StyleSheet.create({

    input: {
       
        width: 195,
        backgroundColor : "#FEFFFF",
        marginBottom : 5
    },

	flag: {
		height: 50,
		width: 100,
		borderColor: "#808080",
		alignItems: "center",
        padding : 20,
		marginHorizontal: 3,
        marginTop : 6,
		backgroundColor: "white",
		borderRadius: 5,
        backgroundColor : "#E5E4E2"
	},

    dropDownStyle: {
        width: 200,
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius : 7,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        marginTop : 10,
        marginBottom : 10
    },

    dropDownTextStyle: {
        textAlign: 'left', 
        fontSize : 16
    }

 });



export default ChampTelephone

