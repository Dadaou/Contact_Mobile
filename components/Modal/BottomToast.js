import { useState } from 'react'
import { View, Button } from 'react-native'
import { PaperProvider, Snackbar, Portal } from 'react-native-paper'

const BottomToast = ({isVisible}) => {

  const [portalSnackbarVisible, setPortalSnackbarVisible] = useState(isVisible)

  return (

 

          <Snackbar
          wrapperStyle={{ bottom: 5 }} 
                visible={portalSnackbarVisible}
                onDismiss={() => setPortalSnackbarVisible(false)}
                duration={4000}
                /*action={{
                  label: 'close'
                }}*/
              >
              Récupération de vos contacts en cours...
          </Snackbar>

  
  )
}

export default BottomToast