import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  View,
  Text,
  ImageBackground,
  Image
} from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { DrawerItemList } from '@react-navigation/drawer'
import { store } from '../redux/dataStore'
import { manageLogin, manageUserToken } from '../redux/action/globalDataAction'


const CustomDrawer = props => {


  const seDeconnecter = useCallback(async () => {
    
    try {

      await AsyncStorage.removeItem('_token')
      await AsyncStorage.removeItem('_alerte')
      store.dispatch(manageUserToken(null))
      store.dispatch(manageLogin(false))

    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>

      <ImageBackground source={require('../../assets/colored-background.jpg')}>

        <View style={{ margin: 20, justifyContent: "center", alignItems: "center" }}>

          <Image
            source={require('../../assets/logo-contacts.png')}
            style={{ height: 80, width: 80 }}
          />

          <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', fontWeight: "bold" }}>
            Contact
          </Text>

        </View>

      </ImageBackground>

      <View style={{ flex: 1, backgroundColor: "#F2F3F4", paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>
      <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#ccc', backgroundColor: "#F2F3F4" }}>
        <TouchableRipple onPress={seDeconnecter} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="logout" size={24} color="#000000" />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
              }}>
              Déconnexion
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </View>
  )
}

export default CustomDrawer