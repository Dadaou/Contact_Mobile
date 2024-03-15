import ReactNativeModal from "react-native-modal";
import {
    View,
    StyleSheet,
    TouchableOpacity
  } from 'react-native'

import { Icon, Text } from 'react-native-paper';


const Capture = ({isVisible, onClose, launchCamera, openGalerie}) => {

    return (
      <View>
        <ReactNativeModal
          isVisible={isVisible} 
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
          onBackdropPress={() => onClose(false)}
        >
          <View  style={styles.container}>

                <View style = {{marginBottom : 15}}>
                    <Text variant="titleLarge" style = {{fontWeight : "bold"}}>Photo du contact</Text>
                </View>

                <View style = {{ flexDirection : "row"}}>

                    <View style={{ marginRight: 50 }}>

                        <TouchableOpacity onPress={launchCamera}>
                                <Icon
                                    source="camera"
                                    size={40}
                                />
                        </TouchableOpacity>
                  
                    </View>
                        

                    <View>

                        <TouchableOpacity onPress={openGalerie}>
                            <Icon
                                source="image"
                                size={40}
                            />
                        </TouchableOpacity>
    
                    </View>
                    
                </View> 

                <View style = {{ flexDirection : "row"}}>

                    <View style={{ marginRight: 45 }}>
                        <Text>Caméra</Text>
                    </View>
                        
                    <View>
                        <Text>Galerie</Text>
                    </View>

                </View> 
          </View>

        </ReactNativeModal>
      </View>
    )
  
}

const styles = StyleSheet.create({

    container: {
      backgroundColor: 'white',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
      margin : 50,
      padding : 20
    }
    
  })


export default Capture