import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
} from 'react-native'
import { DrawerItemList } from '@react-navigation/drawer'

const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>

        <ImageBackground source={require('../../assets/colored-background.jpg')}>

            <View style = {{margin : 20, justifyContent : "center", alignItems :"center"}}>

                <Image
                    source={require('../../assets/logo-contacts.png')}
                    style={{height: 80, width: 80}}
                />

                <Text style={{color: 'white', fontSize: 18, textAlign : 'center', fontWeight : "bold"}}>
                    Contact
                </Text>

            </View>

        </ImageBackground>

        <View style={{flex: 1, backgroundColor: "#F2F3F4", paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
    </View>
  )
}

export default CustomDrawer