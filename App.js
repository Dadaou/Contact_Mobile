import AppStack from './components/ecran/Stack'
import NetworkCheck from './components/synchronisation/NetworkCheck'
import NotificationToast from './components/modal/NotificationToast'
import { PaperProvider } from 'react-native-paper'

const App = () => {

  return (

    <PaperProvider>
   
        <AppStack />
        <NetworkCheck />
        <NotificationToast />
 
    </PaperProvider>

  )

}

export default App