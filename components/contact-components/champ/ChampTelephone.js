import { useState} from 'react'
import PhoneInput from 'react-native-international-phone-number'
import { SelectList } from 'react-native-dropdown-select-list'
import { Feather } from '@expo/vector-icons'
import { View, TouchableOpacity, StyleSheet } from 'react-native'


const ChampTelephone = ({onChangeTelephone}) => {


    const libelle = [
        
        {key:'1', value:'Professionel'},
        {key:'2', value:'Personnel'},
        {key:'3', value:'Standard'},
        {key:'4', value:'Mobile'},
        {key:'5', value:'Fixe'},
        {key:'6', value:'Ligne directe'},
        {key:'7', value:'Secrétariat'}
    ]


    //const [selectedCountry, setSelectedCountry] = useState(null)
    const [listTelephone, setListTelephone] = useState([{ pays: "FR", telephone: "", libelle : "" }])
    

    const changerTelephone = (numeroTelephone, index) => {
      const list = [...listTelephone]
      list[index].telephone = numeroTelephone
      setListTelephone(list)
      onChangeTelephone(list)
    }

    const changerLibelle = (libelle, index) => {
        const list = [...listTelephone]
        list[index].libelle = libelle
        setListTelephone(list)
        onChangeTelephone(list)
    }

    const changerPays = (pays, index) => {
        const list = [...listTelephone]
        list[index].pays = pays
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
      setListTelephone([...listTelephone, { pays: "FR", telephone: "", libelle : "" }])
      onChangeTelephone([...listTelephone, { pays: "FR", telephone: "", libelle : "" }])
    }  


    return (
     
        <>

            {listTelephone.map((item, index) => (

                <View key={index}>

                    <View style = {{flexDirection : "row"}}>

                        <PhoneInput

                            placeholder = "Téléphone"
                            value={item.telephone}
                            onChangePhoneNumber={(text) => changerTelephone(text, index)}
                            selectedCountry={item.pays}
                            onChangeSelectedCountry={(text) => changerPays(text, index)}
                            modalSearchInputPlaceholder="Rechercher un pays"
                            modalNotFoundCountryMessage="Pays non trouvé"
                            defaultCountry="FR"

                            phoneInputStyles={{

                                container: {

                                    width: 300,
                                    height: 50,
                                    borderWidth: 1,
                                    borderRadius : 7,
                                    borderColor: "#808080",
                                    //margin: 22
                                },


                                flagContainer: {

                                    borderTopLeftRadius: 7,
                                    borderBottomLeftRadius: 7,
                                    ustifyContent: 'center'
                                },

                            }}

                        />

                            
                        {listTelephone.length !== 1 && (
                            <TouchableOpacity onPress={() => supprimerChampTelephone(index)}>
                                <Feather name="x-circle" size={24} color="#D70040" />
                            </TouchableOpacity>
                        )}

    
                    </View>

                    <SelectList 

                        setSelected={(val) => changerLibelle(val, index)} 
                        data={libelle} 
                        save="value"
                        search={false}
                        placeholder= "Libellé"
                        inputStyles={{fontSize : 16}}
                        boxStyles={{borderRadius:7, width : 200, marginTop : 10, marginBottom : 4}}
                        dropdownTextStyles = {{fontSize : 16}}

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



export default ChampTelephone