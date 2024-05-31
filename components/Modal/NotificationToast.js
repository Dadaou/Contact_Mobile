import { useState, useEffect } from 'react'
import { Snackbar, Portal, Text } from 'react-native-paper'
import { store } from '../redux/dataStore'
import { manageApparitionNotification } from '../redux/action/globalDataAction'


const NotificationToast = () => {

  const [isNotificationToastVisible, setNotificationToastVisible] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  useEffect(() => {

    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      setNotificationToastVisible(state.globalReducer.showNotificationToast)
      setNotificationMessage(state.globalReducer.msgNotificationToast)


      /*const timeoutId = setTimeout(() => {
        store.dispatch(manageApparitionNotification(false))
      }, 5000)

      return () => {
        clearTimeout(timeoutId)
      }*/

      //console.log(state.globalReducer.showNotificationToast)

      /*if (state.globalReducer.showNotificationToast === true) {

        const timeoutId = setTimeout(() => {
          store.dispatch(manageApparitionNotification(false))
        }, 2500)

        return () => {
          clearTimeout(timeoutId); // Nettoyage du setTimeout lors du démontage du composant
        }

      }*/

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
        //duration={2500}
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