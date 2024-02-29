import { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
import { TextInput } from 'react-native-paper'
import { View, TouchableOpacity, StyleSheet } from 'react-native'


const ChampEmail = ({paramMail, onChangeMail}) => {

    const libelle = ['Professionel', 'Personnel', 'Entreprise']
    const [listMail, setListMail] = useState(paramMail)
    const [libelleVisible, setLibelleVisible] = useState(true)

    useEffect(() => {
        setListMail(paramMail)
    }, [paramMail])

    /*useEffect(() => {

        listMail.forEach((item, index) => {

          const isChampEmailVide = item.ml_mail === ""
          !isChampEmailVide ? setLibelleVisible(true) : setLibelleVisible(false)
          //console.log(`ml_mail de l'élément ${index} est vide !`)
        })
    }, [listMail])*/


    const changerMail = (mail, index) => {
      const list = [...listMail]
      list[index].ml_mail = mail
      setListMail(list)
      onChangeMail(list)
    }

    const changerLibelle = (libelle, index) => {
        const list = [...listMail]
        list[index].ml_libelle = libelle
        setListMail(list)
        onChangeMail(list)
    }
  
    const supprimerChampMail = (index) => {
      const list = [...listMail]
      list.splice(index, 1)
      setListMail(list)
      onChangeMail(list)
    }
  
    const ajouterChampMail = () => {
      setListMail([...listMail, { ml_libelle : "", ml_mail : "" }])
      onChangeMail([...listMail, { ml_libelle : "", ml_mail : "" }])
    }
  
    return (
     
        <>

            {listMail.map((item, index) => (

                <View key={index}>

                    <View style = {{flexDirection : "row", margin: 12}}>

                        <TextInput
                            style={styles.input}
                            label = "Email"
                            mode='outlined'
                            activeOutlineColor = "#005F9D"
                            keyboardType="email-address"
                            onChangeText={(text) => changerMail(text, index)}
                            value={item.ml_mail} />

                        {listMail.length !== 1 && (
                            <TouchableOpacity onPress={() => supprimerChampMail(index)} >
                                <Feather name="x-circle" size={24} color="#D70040" />
                            </TouchableOpacity>
                        )}
    
                    </View>

                    { libelleVisible ? ( <SelectDropdown

                                            data={libelle}
                                            defaultButtonText={'Libellé'}
                                            defaultValue={item.ml_libelle === '' ? '' : item.ml_libelle} 
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

                                        ) : null

                    }

  
                    {listMail.length - 1 === index && listMail.length < 4 && (

                        <TouchableOpacity onPress={ajouterChampMail} style={{marginLeft : 13, marginBottom : 15}}>
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
        width: 300,
        backgroundColor : "#FEFFFF",
        marginBottom: 5
    },

    dropDownStyle: {
        
        width: 200,
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius : 5,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        marginBottom : 10,
        marginRight : 12
    },

    dropDownTextStyle: {
        textAlign: 'left', 
        fontSize : 16
    }
          
})


export default ChampEmail