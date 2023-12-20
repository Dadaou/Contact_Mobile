import { useState} from 'react'
import { Feather } from '@expo/vector-icons'
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native'


const ChampEmail = ({onChangeMail}) => {

    const [listMail, setListMail] = useState([{ mail: "" }])

    const changerMail = (mail, index) => {
      const list = [...listMail]
      list[index].mail = mail
      setListMail(list)
      onChangeMail(list)
    }
  
    const supprimerChampMail = (index) => {
      const list = [...listMail];
      list.splice(index, 1)
      setListMail(list)
      onChangeMail(list)
    }
  
    const ajouterChampMail = () => {
      setListMail([...listMail, { mail: "" }])
      onChangeMail([...listMail, { mail: "" }])
    }
  
    return (
     
        <>

            {listMail.map((item, index) => (

                <View key={index}>

                    <View style = {{flexDirection : "row"}}>

                        
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={(text) => changerMail(text, index)}
                            value={item.mail} />

                        {listMail.length !== 1 && (
                            <TouchableOpacity onPress={() => supprimerChampMail(index)}>
                                <Feather name="x-circle" size={24} color="#D70040" />
                            </TouchableOpacity>
                        )}
    
                    </View>
                    
                    {listMail.length - 1 === index && listMail.length < 4 && (

                        <TouchableOpacity onPress={ajouterChampMail} style={{marginLeft : 13}}>
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
        fontSize : 16,
        marginBottom : 3
    }
          
})


export default ChampEmail