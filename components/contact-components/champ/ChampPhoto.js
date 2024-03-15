import * as ImagePicker from 'expo-image-picker'
import { View, StyleSheet,  TouchableOpacity, Image } from "react-native"
import Capture from '../../Modal/Capture'
import { useState, useCallback } from 'react'

const ChampPhoto = ({paramPhoto, onChangePhoto}) => {

   const [isVisible, setIsVisible] = useState(false)
  
    const pickImage = useCallback(async () => {
      
        setIsVisible(false)
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        })
    
        if (!result.canceled) {
          onChangePhoto(result.assets[0].uri)
        }
    }, [])

    const launchCamera = useCallback(async () => {

        setIsVisible(false)
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        }
        
        let result = await ImagePicker.launchCameraAsync(options);
        if (!result.canceled) {
          onChangePhoto(result.assets[0].uri)
        }
    }, [])

    return (


        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <View>

                {paramPhoto ?  
        
                        <TouchableOpacity onPress={() => setIsVisible(true)}>
                            <Image source={{ uri: paramPhoto }} style={{ borderRadius : 100, width: 150, height: 150  }} /> 
                        </TouchableOpacity> :
                        
                        <TouchableOpacity onPress={() => setIsVisible(true)} style = {styles.containerImage}>
                          <Image source={require('../../../assets/gallery.png')} style={{width: 50, height: 50 }}/>
                        </TouchableOpacity>
     
                }

            </View>

            <Capture isVisible={isVisible} onClose={setIsVisible} launchCamera = {launchCamera} openGalerie = {pickImage}/>

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