import { useState} from 'react'
import * as ImagePicker from 'expo-image-picker'
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import { Ionicons } from '@expo/vector-icons'


const ChampPhoto = () => {
  
    const [image, setImage] = useState(null)


    const pickImage = async () => {
      
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        //console.log("eto ", result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    return (


        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


            <View>

                {image ?  

        
                        <TouchableOpacity onPress={pickImage}>
                            <Image source={{ uri: image }} style={{ borderRadius : 100, width: 150, height: 150  }} /> 
                        </TouchableOpacity> :
                        
                        <TouchableOpacity onPress={pickImage}>
                          <Image source={require('../../../assets/gallery.png')} style={{width: 150, height: 150 }}/>
                        </TouchableOpacity>
     
                }

            </View>

        </View>
        

    )

}


export default ChampPhoto