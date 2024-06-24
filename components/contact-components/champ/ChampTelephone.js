import React, { useState, useRef, useEffect } from "react"
import { blanc, bleu } from "../../utils/Constant"
import SelectDropdown from 'react-native-select-dropdown'
import PhoneInput from "react-native-phone-input"
import { CountryPicker } from "react-native-country-codes-picker"
import { parsePhoneNumber } from "awesome-phonenumber"
import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native-paper'
import { View, TouchableOpacity, StyleSheet } from 'react-native'


const ChampTelephone = ({ paramTelephone, onChangeTelephone }) => {


    const libelle = ['Professionel', 'Personnel', 'Standard', 'Mobile', 'Fixe', 'Ligne directe', 'Secrétariat', 'Autre']
    let phoneRef = useRef([])
    const [afficherCountryPicker, setAfficherCountryPicker] = useState([])
    const [maxLengthNumeroTelephone, setMaxLengthNumeroTelephone] = useState([])

    phoneRef.current = paramTelephone.map((ref, index) => phoneRef.current[index] = React.createRef())

    const selectCountry = (pays, index) => {
        phoneRef.current[index].current.selectCountry(pays)
    }

    const onRequestClosePicker = (index) => {
        setAfficherCountryPicker(afficherCountryPicker.map((item, idx) => idx === index ? false : item))
    }

    const verifierLongueurNumeroTelephone = (numeroTelephone, index) => {

        const numeroTelephoneParser = parsePhoneNumber(numeroTelephone)

        if (numeroTelephoneParser.possibility === "is-possible") {

            setMaxLengthNumeroTelephone(prevState => {
                const maxLengthTelNum = [...prevState]
                maxLengthTelNum[index] = numeroTelephone.length
                return maxLengthTelNum
            })
        } else {
            setMaxLengthNumeroTelephone(prevState => {
                return prevState.filter((_, i) => i !== index)
            })
        }

    }


    const changerTelephone = (numeroTelephone, index) => {

        const list = [...paramTelephone]
        verifierLongueurNumeroTelephone(numeroTelephone, index)
        list[index].tel_numero = numeroTelephone
        onChangeTelephone(list)
    }

    const changerLibelle = (libelle, index) => {
        const list = [...paramTelephone]
        list[index].tel_libelle = libelle
        onChangeTelephone(list)
    }

    const supprimerChampTelephone = (index) => {

        const updatedPhoneRef = [...phoneRef.current]
        updatedPhoneRef.splice(index, 1)
        phoneRef.current = updatedPhoneRef

        const updatedShow = [...afficherCountryPicker]
        updatedShow.splice(index, 1)
        setAfficherCountryPicker(updatedShow)

        const list = [...paramTelephone]
        list.splice(index, 1)
        onChangeTelephone(list)

    }

    const ajouterChampTelephone = () => {
        onChangeTelephone([...paramTelephone, { tel_numero: "" }])
        setAfficherCountryPicker([...afficherCountryPicker, false])
    }

    useEffect(() => {

        setAfficherCountryPicker(paramTelephone.map(() => false))
        paramTelephone.map((item, index) => {
            verifierLongueurNumeroTelephone(item.tel_numero, index)
        })

    }, [paramTelephone])


    return (

        <>

            {paramTelephone.map((item, index) => (

                <View key={index}>

                    <View style={{ flexDirection: "row" }}>

                        <View style={{ flex: 1, alignItems: "center" }}>

                            <PhoneInput

                                autoFormat={true}
                                initialCountry='fr'
                                allowZeroAfterCountryCode={true}
                                onPressFlag={() => setAfficherCountryPicker(afficherCountryPicker.map((item, idx) => idx === index))}
                                ref={phoneRef.current[index]}
                                onChangePhoneNumber={(text) => changerTelephone(text, index)}
                                initialValue={item.tel_numero === "+" ? "+33" : item.tel_numero}
                                textComponent={TextInput}
                                flagStyle={{ borderWidth: 1, marginTop: 6 }}
                                textProps={{
                                    maxLength: maxLengthNumeroTelephone[index],
                                    label: "Téléphone",
                                    mode: 'outlined',
                                    activeOutlineColor: "#0066b2",
                                    style: { height: 50, backgroundColor: "white", fontSize: 17 },
                                    contentStyle: { paddingTop: 11 }
                                }}
                            />

                            <CountryPicker
                                onRequestClose={() => onRequestClosePicker(index)}
                                show={afficherCountryPicker[index]}
                                pickerButtonOnPress={(item) => {
                                    selectCountry(item.code.toLowerCase(), index)
                                    onRequestClosePicker(index)
                                }}
                                lang="fr"
                                inputPlaceholder="Rechercher un pays"
                                searchMessage="Aucun pays trouvé"
                                style={styles.countryPicker}
                            />

                        </View>

                        {paramTelephone.length !== 1 && (
                            <TouchableOpacity onPress={() => supprimerChampTelephone(index)}>
                                <Feather name="x-circle" size={24} color="#D70040" />
                            </TouchableOpacity>
                        )}


                    </View>

                    <View style={{ marginLeft: 5, marginTop: 8 }}>

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

    countryPicker: {
        modal: {
            height: 300
        },
        textInput: {
            height: 50,
            borderRadius: 10,
        },
        countryButtonStyles: {
            height: 50
        }
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