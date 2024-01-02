import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { View, StyleSheet,  TouchableOpacity, Image } from "react-native"

const ChampPhoto = ({paramPhoto, onChangePhoto}) => {
  
    const [photo, setPhoto] = useState(paramPhoto)

    useEffect(() => {
      setPhoto(paramPhoto)
    }, [paramPhoto])



    const pickImage = async () => {
      
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        })
    
    
        if (!result.canceled) {
          setPhoto(result.assets[0].uri)
          onChangePhoto(result.assets[0].uri)
        }
    }

    return (


        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <View>

                {photo?  

        
                        <TouchableOpacity onPress={pickImage}>
                            <Image source={{ uri: photo }} style={{ borderRadius : 100, width: 150, height: 150  }} /> 
                        </TouchableOpacity> :
                        
                        <TouchableOpacity onPress={pickImage} style = {styles.containerImage}>
                          <Image source={require('../../../assets/gallery.png')} style={{width: 50, height: 50 }}/>
                        </TouchableOpacity>
     
                }

            </View>

        </View>
        
    )

}

const styles = StyleSheet.create({

  containerImage: {

            flex : 1,
            flexDirection: "row",  
            alignItems: 'center',
            height: 150,
            width: 150,
            borderWidth: 1,
            padding: 50,
            borderRadius : 100,
            borderColor : "#008E97",
            backgroundColor : "#008E97"
      
  }
  
  
})



export default ChampPhoto