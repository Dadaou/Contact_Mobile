import { useState, useEffect } from 'react'
import {Snackbar, Portal, Text } from 'react-native-paper'
import { store } from '../redux/dataStore'


const NotificationToast = () => {

  const [isNotificationToastVisible, setNotificationToastVisible] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  useEffect(() => {
  
    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      setNotificationToastVisible(state.globalReducer.showNotificationToast)
      setNotificationMessage(state.globalReducer.msgNotificationToast)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (


      <Portal>

          <Snackbar
                  //wrapperStyle={{ marginBottom : 60 }} 
                  visible={isNotificationToastVisible}
                  onDismiss={() => setNotificationToastVisible(false)}
                  duration={2500}
                  action={{
                    label: 'Fermer'
                  }}
                >
                
               {notificationMessage}
              
          </Snackbar>
      
    </Portal>
  )
}

export default NotificationToast