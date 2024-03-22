import React, { useState } from 'react'
import {
  View,
} from 'react-native'

import {
  List,
  Menu,
  TouchableRipple,
  PaperProvider
} from 'react-native-paper'

const MenuExample = () => {
  const [visible, setVisible] = useState({});
  const [contextualMenuCoord, setContextualMenuCoord] = useState({ x: 0, y: 0 });

  const toggleMenu = (name) => () => setVisible({ ...visible, [name]: !visible[name] });
  const getVisible = (name) => !!visible[name];

  const handleLongPress = (event) => {
    const { nativeEvent } = event;
    setContextualMenuCoord({
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    });
    setVisible({ menu3: true });
  };

  return (
    <PaperProvider>
      <View >
        <View>
          <Menu
            visible={getVisible('menu3')}
            onDismiss={toggleMenu('menu3')}
            anchor={contextualMenuCoord}
          >
            <Menu.Item onPress={() => {}} title="Item 1" />
            <Menu.Item onPress={() => {}} title="Item 2" />
            <Menu.Item onPress={() => {}} title="Item 3" disabled />
          </Menu>
            <TouchableRipple onPress={() => {}} onLongPress={handleLongPress}>
              <List.Item
                title="List item"
                description="Long press me to open contextual menu"
              />
            </TouchableRipple>
        </View>
      </View>
    </PaperProvider>
  );
};

MenuExample.title = 'Menu';

const styles = {
  screen: {
    flex: 1,
  },
}

export default MenuExample