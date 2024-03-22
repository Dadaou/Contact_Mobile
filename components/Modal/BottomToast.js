import { useState } from 'react'
import { View, Button } from 'react-native'
import { PaperProvider, Snackbar, Portal } from 'react-native-paper'

const BottomToast = () => {

  const [portalSnackbarVisible, setPortalSnackbarVisible] = useState(false)
  return (
    <PaperProvider>
      <View> 
        <View>
          <Button title="Portal Snackbar" onPress={() => setPortalSnackbarVisible(true)} />
        </View>
        <View>
          <Portal>
            <Snackbar
              visible={portalSnackbarVisible}
              onDismiss={() => setPortalSnackbarVisible(false)}
              duration={2000}
              /*action={{
                label: 'close'
              }}*/
            >
              This is a Snackbar.
            </Snackbar>
          </Portal>
        </View>
      </View>
    </PaperProvider>
  )
}

export default BottomToast