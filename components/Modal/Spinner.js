import ReactNativeModal from "react-native-modal";
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator
  } from 'react-native'


const SpinnerModal = ({isVisible}) => {

    return (
      <View>
        <ReactNativeModal
          isVisible={isVisible} 
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={500}
          animationOutTiming={500}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
        >
          <View  style={styles.content}>
            <ActivityIndicator size="large" color="#005F9D"/>
            <Text style={styles.contentTitle}>Chargement...</Text>
          </View>
        </ReactNativeModal>
      </View>
    );
  
}

const styles = StyleSheet.create({

    content: {
      backgroundColor: 'white',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
      margin : 70
    },
  
    contentTitle: {
      fontSize: 15
    }
    
  })


export default SpinnerModal