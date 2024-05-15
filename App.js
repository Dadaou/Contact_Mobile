import AppStack from './components/ecran/Stack'
import Synchronisation from './components/synchronisation/Synchronisation'
import NotificationToast from './components/modal/NotificationToast'
import { PaperProvider } from 'react-native-paper'

const App = () => {

  return (

    <PaperProvider>

      <AppStack />
      <Synchronisation />
      <NotificationToast />

    </PaperProvider>

  )

}

export default App