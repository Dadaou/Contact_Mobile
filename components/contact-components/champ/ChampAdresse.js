import { useState} from 'react'
import { Feather } from '@expo/vector-icons'
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'


const ChampAdresse = ({onChangeAdresse}) => {

    const libelle = [
        
        {key:'1', value:'Professionel'},
        {key:'2', value:'Personnel'},
        {key:'3', value:'Entreprise'}
    ]

    const [listAdresse, setListAdresse] = useState([{ adresseLigneUn: "" , adresseLigneDeux : "", adresseLigneTrois : "", codePostal : "", boitePostal : "", pays : "", ville : "", libelle : ""}])

    const changerAdresseLigneUn = (adresseLigneUn, index) => {
      const list = [...listAdresse]
      list[index].adresseLigneUn = adresseLigneUn
      setListAdresse(list)
      onChangeAdresse(list)
    }

    const changerAdresseLigneDeux = (adresseLigneDeux, index) => {
        const list = [...listAdresse]
        list[index].adresseLigneDeux = adresseLigneDeux
        setListAdresse(list)
        onChangeAdresse(list)
    }

    const changerAdresseLigneTrois = (adresseLigneTrois, index) => {
        const list = [...listAdresse]
        list[index].adresseLigneTrois = adresseLigneTrois
        setListAdresse(list)
        onChangeAdresse(list)
    }

    const changerCodePostal = (codePostal, index) => {
        const list = [...listAdresse]
        list[index].codePostal = codePostal
        setListAdresse(list)
        onChangeAdresse(list)
    }

    const changerBoitePostal = (boitePostal, index) => {
        const list = [...listAdresse]
        list[index].boitePostal = boitePostal
        setListAdresse(list)
        onChangeAdresse(list)
    }

    const changerPays = (pays, index) => {
        const list = [...listAdresse]
        list[index].pays = pays
        setListAdresse(list)
        onChangeAdresse(list)
    }

    const changerVille = (ville, index) => {
        const list = [...listAdresse]
        list[index].ville = ville
        setListAdresse(list)
        onChangeAdresse(list)
    }

    const changerLibelle = (libelle, index) => {
        const list = [...listAdresse]
        list[index].libelle = libelle
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
      setListAdresse([...listAdresse, { adresseLigneUn: "" , adresseLigneDeux : "", adresseLigneTrois : "", codePostal : "", boitePostal : "", pays : "", ville : "", libelle : ""}])
      onChangeAdresse([...listAdresse, { adresseLigneUn: "" , adresseLigneDeux : "", adresseLigneTrois : "", codePostal : "", boitePostal : "", pays : "", ville : "", libelle : ""}])
    }
  
    return (
     
        <>

            {listAdresse.map((item, index) => (

                <View key={index}>


                    <View style = {{flexDirection : "row"}}>

                        <TextInput
                            style={styles.input}
                            placeholder="Adresse ligne 1"
                            onChangeText={(text) => changerAdresseLigneUn(text, index)}
                            value={item.adresseLigneUn} />

                        {listAdresse.length !== 1 && (
                            <TouchableOpacity onPress={() => supprimerChampAdresse(index)}>
                                <Feather name="x-circle" size={24} color="#D70040" />
                            </TouchableOpacity>
                        )}
    
                    </View>

                    <TextInput
                            style={styles.input}
                            placeholder="Adresse ligne 2"
                            onChangeText={(text) => changerAdresseLigneDeux(text, index)}
                            value={item.adresseLigneDeux} />

                    <TextInput
                            style={styles.input}
                            placeholder="Adresse ligne 3"
                            onChangeText={(text) => changerAdresseLigneTrois(text, index)}
                            value={item.adresseLigneTrois} />

                    <TextInput
                            style={styles.input}
                            placeholder="Code postal"
                            onChangeText={(text) => changerCodePostal(text, index)}
                            value={item.codePostal} />


                    <TextInput
                            style={styles.input}
                            placeholder="Boite postal"
                            onChangeText={(text) => changerBoitePostal(text, index)}
                            value={item.boitePostal} />

                    <TextInput
                            style={styles.input}
                            placeholder="Pays"
                            onChangeText={(text) => changerPays(text, index)}
                            value={item.pays} />

                    <TextInput
                            style={styles.input}
                            placeholder="Ville"
                            onChangeText={(text) => changerVille(text, index)}
                            value={item.ville} />

                    <SelectList 

                        setSelected={(val) => changerLibelle(val, index)} 
                        data={libelle} 
                        save="value"
                        search={false}
                        placeholder= "Libellé"
                        inputStyles={{fontSize : 16}}
                        boxStyles={{borderRadius:7, width : 200, marginLeft : 12, marginTop : 12, marginBottom : 4}}
                        dropdownTextStyles = {{fontSize : 16}}

                    />

                    {listAdresse.length - 1 === index && listAdresse.length < 4 && (

                        <TouchableOpacity onPress={ajouterChampAdresse} style={{marginLeft : 13}}>
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


export default ChampAdresse