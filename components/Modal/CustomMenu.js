import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native'
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

const CustomMenu = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider >
      <View style = {{position : "absolute", zIndex : 1000}}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<TouchableOpacity onPress={() => openMenu()}>
          <Icon
              name={'ellipsis-v'}
              size={25} 
              color={'black'}/></TouchableOpacity>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default CustomMenu;