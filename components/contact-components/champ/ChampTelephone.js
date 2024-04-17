import CountryPicker from "rn-country-picker"
import { blanc, bleu } from "../../utils/Constant"
import SelectDropdown from 'react-native-select-dropdown'
import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'

import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-paper'
import { View, TouchableOpacity, StyleSheet } from 'react-native'


const ChampTelephone = ({ paramTelephone, onChangeTelephone }) => {

    //console.log(paramTelephone)
    const libelle = ['Professionel', 'Personnel', 'Standard', 'Mobile', 'Fixe', 'Ligne directe', 'Secrétariat', 'Autre']

    const changerTelephone = (numeroTelephone, index) => {
        const list = [...paramTelephone]
        const numeroTelephoneFormate = new AsYouType().input(`+${list[index].tel_code_pays}${numeroTelephone}`)
        //const phoneNumber = isValidPhoneNumber(`+${list[index].tel_code_pays}${numeroTelephone}`)
        //console.log(phoneNumber)
        //console.log(numeroTelephoneFormate.replace(list[index].tel_code_pays, ''))
        list[index].tel_numero = numeroTelephoneFormate.substring(list[index].tel_code_pays.length + 1)//numeroTelephone
        onChangeTelephone(list)

    }

    const changerLibelle = (libelle, index) => {
        const list = [...paramTelephone]
        list[index].tel_libelle = libelle
        onChangeTelephone(list)
    }

    const changerPays = (pays, index) => {
        const list = [...paramTelephone]
        list[index].tel_code_pays = pays
        onChangeTelephone(list)
    }


    const supprimerChampTelephone = (index) => {
        const list = [...paramTelephone]
        list.splice(index, 1)
        onChangeTelephone(list)
    }

    const ajouterChampTelephone = () => {
        onChangeTelephone([...paramTelephone, { tel_libelle: "", tel_numero: "", tel_code_pays: "33" }])
    }


    return (

        <>

            {paramTelephone.map((item, index) => (

                <View key={index}>

                    <View style={{ flexDirection: "row" }}>

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
                            label="Téléphone"
                            mode='outlined'
                            activeOutlineColor={bleu}
                            keyboardType='numeric'
                            onChangeText={(text) => changerTelephone(text, index)}
                            value={item.tel_numero}
                        />

                        {paramTelephone.length !== 1 && (
                            <TouchableOpacity onPress={() => supprimerChampTelephone(index)}>
                                <Feather name="x-circle" size={24} color="#D70040" />
                            </TouchableOpacity>
                        )}


                    </View>

                    <View style={{ marginLeft: 5 }}>

                        <SelectDropdown

                            data={libelle}
                            defaultButtonText={'Libellé'}
                            defaultValue={item.tel_libelle === '' ? '' : item.tel_libelle}
                            onSelect={(val) => changerLibelle(val, index)}
                            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem }}
                            rowTextForSelection={(item) => { return item }}
                            renderDropdownIcon={isOpened => {
                                return <Feather name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#808080'} size={18} />;
                            }}
                            dropdownIconPosition={'right'}
                            buttonStyle={styles.dropDownStyle}
                            buttonTextStyle={styles.dropDownTextStyle}
                        />

                    </View>


                    {paramTelephone.length - 1 === index && paramTelephone.length < 4 && (

                        <TouchableOpacity onPress={ajouterChampTelephone} style={{ marginBottom: 10, marginLeft: 3 }}>
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
        backgroundColor: blanc,
        marginBottom: 5
    },

    flag: {
        height: 50,
        width: 105,
        borderColor: "#808080",
        alignItems: "center",
        padding: 20,
        marginHorizontal: 3,
        marginTop: 6,
        backgroundColor: "white",
        borderRadius: 5,
        backgroundColor: "#E5E4E2"
    },

    dropDownStyle: {
        width: 300,
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "#808080",
        backgroundColor: blanc,
        marginTop: 10,
        marginBottom: 10
    },

    dropDownTextStyle: {
        textAlign: 'left',
        fontSize: 16
    }

});



export default ChampTelephone

