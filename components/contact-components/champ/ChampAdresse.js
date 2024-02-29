import { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
import { TextInput } from 'react-native-paper';
import { View, TouchableOpacity, StyleSheet } from 'react-native'


const ChampAdresse = ({paramAdresse, onChangeAdresse}) => {

    const libelle = ['Professionel', 'Personnel', 'Entreprise']
    const [listAdresse, setListAdresse] = useState(paramAdresse)

    useEffect(() => {
        setListAdresse(paramAdresse)
    }, [paramAdresse])


    const changerAdresseLigneUn = (adresseLigneUn, index) => {
      const list = [...listAdresse]
      list[index].addr_ligne1 = adresseLigneUn
      setListAdresse(list)
      onChangeAdresse(list)
    }

    const changerAdresseLigneDeux = (adresseLigneDeux, index) => {
        const list = [...listAdresse]
        list[index].addr_ligne2 = adresseLigneDeux
        setListAdresse(list)
        onChangeAdresse(list)
    }

    const changerAdresseLigneTrois = (adresseLigneTrois, index) => {
        const list = [...listAdresse]
        list[index].addr_ligne3 = adresseLigneTrois
        setListAdresse(list)
        onChangeAdresse(list)
    }

    const changerCodePostal = (codePostal, index) => {
        const list = [...listAdresse]
        list[index].addr_cp = codePostal
        setListAdresse(list)
        onChangeAdresse(list)
    }

    const changerBoitePostal = (boitePostal, index) => {
        const list = [...listAdresse]
        list[index].addr_bp = boitePostal
        setListAdresse(list)
        onChangeAdresse(list)
    }

    const changerPays = (pays, index) => {
        const list = [...listAdresse]
        list[index].addr_pays = pays
        setListAdresse(list)
        onChangeAdresse(list)
    }

    const changerVille = (ville, index) => {
        const list = [...listAdresse]
        list[index].addr_ville = ville
        setListAdresse(list)
        onChangeAdresse(list)
    }

    const changerLibelle = (libelle, index) => {
        const list = [...listAdresse]
        list[index].addr_libelle = libelle
        setListAdresse(list)
        onChangeAdresse(list)
    }
  
    const supprimerChampAdresse = (index) => {
        const list = [...listAdresse]
        list.splice(index, 1)
        setListAdresse(list)
        onChangeAdresse(list)
    }
  
    const ajouterChampAdresse = () => {
      setListAdresse([...listAdresse, { addr_ligne1: "" , addr_ligne2: "", addr_ligne3: "", addr_ville: "", addr_pays: "", addr_bp: "", addr_cp: "", addr_libelle: ""}])
      onChangeAdresse([...listAdresse, { addr_ligne1: "" , addr_ligne2: "", addr_ligne3: "", addr_ville: "", addr_pays: "", addr_bp: "", addr_cp: "", addr_libelle: ""}])
    }
  
    return (
     
        <>

            {listAdresse.map((item, index) => (

                <View key={index}>


                    <View style = {{flexDirection : "row", marginTop : 20}}>

                        <TextInput
                            style={styles.input}
                            label = "Adresse ligne 1"
                            mode='outlined'
                            activeOutlineColor = "#005F9D"
                            onChangeText={(text) => changerAdresseLigneUn(text, index)}
                            value={item.addr_ligne1} />

                        {listAdresse.length !== 1 && (
                            <TouchableOpacity onPress={() => supprimerChampAdresse(index)}>
                                <Feather name="x-circle" size={24} color="#D70040" />
                            </TouchableOpacity>
                        )}
    
                    </View>

                    <TextInput
                            style={styles.input}
                            label = "Adresse ligne 2"
                            mode='outlined'
                            activeOutlineColor = "#005F9D"
                            onChangeText={(text) => changerAdresseLigneDeux(text, index)}
                            value={item.addr_ligne2} />

                    <TextInput
                            style={styles.input}
                            label = "Adresse ligne 3"
                            mode='outlined'
                            activeOutlineColor = "#005F9D"
                            onChangeText={(text) => changerAdresseLigneTrois(text, index)}
                            value={item.addr_ligne3} />

                    <TextInput
                            style={styles.input}
                            label = "Code postal"
                            mode='outlined'
                            activeOutlineColor = "#005F9D"
                            onChangeText={(text) => changerCodePostal(text, index)}
                            value={item.addr_cp} />


                    <TextInput
                            style={styles.input}
                            label = "Boite postal"
                            mode='outlined'
                            activeOutlineColor = "#005F9D"
                            onChangeText={(text) => changerBoitePostal(text, index)}
                            value={item.addr_bp} />

                    <TextInput
                            style={styles.input}
                            label = "Pays"
                            mode='outlined'
                            activeOutlineColor = "#005F9D"
                            onChangeText={(text) => changerPays(text, index)}
                            value={item.addr_pays} />

                    <TextInput
                            style={styles.input}
                            label = "Ville"
                            mode='outlined'
                            activeOutlineColor = "#005F9D"
                            onChangeText={(text) => changerVille(text, index)}
                            value={item.addr_ville} />

                    <SelectDropdown

                        data={libelle}
                        defaultButtonText={'Libellé'}
                        defaultValue={item.addr_libelle === '' ? '' : item.addr_libelle} 
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

                    {listAdresse.length - 1 === index && listAdresse.length < 4 && (

                        <TouchableOpacity onPress={ajouterChampAdresse}>
                            <Feather name="plus-circle" size={30} color="#708090" style={{marginBottom : 20}}/>
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
        marginBottom : 20

    },

    dropDownStyle: {
        width: 200,
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius : 5,
        borderColor: "#808080",
        backgroundColor : "#FEFFFF",
        marginTop : 5,
        marginBottom : 10
    },

    dropDownTextStyle: {
        textAlign: 'left', 
        fontSize : 16
    }
          
})


export default ChampAdresse